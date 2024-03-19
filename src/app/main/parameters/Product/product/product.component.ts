import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import ProductDataSource from "./product.datasource";
import { Product } from "../products/products.model";
import { ProductsService } from "../products/products.service";
import { ProductService } from "./product.service";
import AddAlertProductDefinition from "./addProduct";
import UpdateAlertUpdateDefinition from "./updateProduct";
import { ProductFormDialogComponent } from "./productForm/productForm.component";

@Component({
    selector: "product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProductComponent {
    productDataSource: ProductDataSource | null;
    dialogRef: any;
    product: Product;
    pageType: string;
    productForm: FormGroup;
    displayedColumns = [
        "Id",
        "ProductName",
        "ApplicationType",
        "UserType",
        "Description",
        "InsertDateTime",
        "Buttons",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    productPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    productSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private productsService: ProductsService,
        private productService: ProductService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addAlertProductDefinition: AddAlertProductDefinition,
        private updateAlertProductDefinition: UpdateAlertUpdateDefinition,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.product = new Product();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.productDataSource = new ProductDataSource(
            this.productService,
            this.productPaginator,
            this.productSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.productDataSource) {
                    return;
                }
                this.productDataSource.filter = this.filter.nativeElement.value;
            });

        this.productService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((product) => {
                if (product) {
                    this.product = new Product(product);
                    this.pageType = "edit";
                    this.productService.productModuleList =
                        product.ProductModuleList;
                } else {
                    this.pageType = "new";
                    this.product = new Product();
                    this.productService.productModuleList =
                        product.ProductModuleList;
                }
                this.productForm = this.createProductForm();
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    refreshProductDataSource(): void {
        this.productDataSource = new ProductDataSource(
            this.productService,
            this.productPaginator,
            this.productSort
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createProductForm
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.product.Id],
            Code: [this.product.Code],
            Description: [this.product.Description],
        });
    }

    /**
     * CreateProduct
     */
    CreateProduct(): void {
        const data = this.productForm.getRawValue();
        this.productService.CreateProduct(data).then(() => {
            this.productService.onProductChanged.next(data);
            this.router.navigate(["Parameters/Product/products"]);
            this.addAlertProductDefinition.AddAlertProductDefinitionShow();
        });
    }

    /**
     * UpdateProduct
     */
    UpdateProduct(): void {
        const data = this.productForm.getRawValue();
        this.productService.UpdateProduct(data).then(() => {
            this.productService.onProductChanged.next(data);
            this.router.navigate(["Parameters/Product/products"]);
            this.updateAlertProductDefinition.UpdateAlertUpdateDefinitionShow();
        });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(ProductFormDialogComponent, {
            panelClass: "productForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var productRequest = response.getRawValue();
            productRequest.ProductId = this.product.Id;
            this.productService.CreateProductModule(productRequest).then(() => {
                this.productService.GetProduct().then(() => {
                    this.refreshProductDataSource();
                });
            });
        });
    }

    /**
     * EditProduct
     *
     * @param product
     */
    EditProduct(product): void {
        this.dialogRef = this._matDialog.open(ProductFormDialogComponent, {
            panelClass: "productForm-dialog",
            data: {
                product: product,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var productRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.productService
                        .UpdateProductModule(productRequest)
                        .then(() => {
                            this.productService.GetProduct().then(() => {
                                this.refreshProductDataSource();
                            });
                        });
                    break;
                /**
                 * deleteProduct
                 */
                case "delete":
                    this.DeleteProduct(product);
                    break;
            }
        });
    }

    /**
     * deleteProduct
     */
    DeleteProduct(product): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.productService.DeleteProductModule(product).then(() => {
                    this.productService.GetProduct().then(() => {
                        this.refreshProductDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
