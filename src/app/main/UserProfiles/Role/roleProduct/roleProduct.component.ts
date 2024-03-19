import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import RoleProductDataSource from "./roleProduct.datasource";
import { Product } from "../roleProducts/roleProducts.model";
import { RoleProductService } from "./roleProduct.service";

@Component({
    selector: "roleProduct",
    templateUrl: "./roleProduct.component.html",
    styleUrls: ["./roleProduct.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RoleProductComponent {
    roleProductDataSource: RoleProductDataSource | null;
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
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    productPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    productSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    productId: number;

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
        private roleProductService: RoleProductService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
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
        this.roleProductDataSource = new RoleProductDataSource(
            this.roleProductService,
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
                if (!this.roleProductDataSource) {
                    return;
                }
                this.roleProductDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.roleProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((product) => {
                if (product) {
                    this.product = new Product(product);
                    this.pageType = "edit";
                    this.roleProductService.productModuleList =
                        product.ProductModuleList;
                }
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
