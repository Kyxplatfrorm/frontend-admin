import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import ProductsDataSource from "./products.datasource";
import { ProductsService } from "./products.service";

@Component({
    selector: "products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit {
    productsDataSource: ProductsDataSource | null;
    displayedColumns = [
        "Id",
        "Code",
        "Description",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    productsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    productsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private productsService: ProductsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.productsDataSource = new ProductsDataSource(
            this.productsService,
            this.productsPaginator,
            this.productsSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.productsDataSource) {
                    return;
                }
                this.productsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshProductsDataSource(): void {
        this.productsDataSource = new ProductsDataSource(
            this.productsService,
            this.productsPaginator,
            this.productsSort
        );
    }

    /**
     * DeleteProdcuts
     */
    DeleteProdcuts(product): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.productsService
                    .DeleteProduct(product)

                    .then(() => {
                        this.productsService.GetProducts().then(() => {
                            this.refreshProductsDataSource();
                        });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
