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
import MenuProductDataSource from "./menuProduct.datasource";
import { Product } from "../menuProducts/menuProducts.model";
import { MenuProductService } from "./menuProduct.service";

@Component({
    selector: "menuProduct",
    templateUrl: "./menuProduct.component.html",
    styleUrls: ["./menuProduct.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class MenuProductComponent {
    menuProductDataSource: MenuProductDataSource | null;
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
        private menuProductService: MenuProductService,
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
        this.menuProductDataSource = new MenuProductDataSource(
            this.menuProductService,
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
                if (!this.menuProductDataSource) {
                    return;
                }
                this.menuProductDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.menuProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((product) => {
                if (product) {
                    this.product = new Product(product);
                    this.pageType = "edit";
                    this.menuProductService.productModuleList =
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
