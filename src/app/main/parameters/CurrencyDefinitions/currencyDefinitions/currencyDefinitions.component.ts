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
import { CurrencyDefinitionsDataSource } from "./currencyDefinitions.datasource";
import { CurrencyDefinitionsService } from "./currencyDefinitions.service";

@Component({
    selector: "currencyDefinitions",
    templateUrl: "./currencyDefinitions.component.html",
    styleUrls: ["./currencyDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class CurrencyDefinitionsComponent implements OnInit {
    currencydefinitionsDataSource: CurrencyDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "CurrencyCode",
        "CurrencyCodeNumeric",
        "CountryName",
        "CurrencyName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    currencydefpaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    currencydefsort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private currencydefinitionsservice: CurrencyDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.currencydefinitionsDataSource = new CurrencyDefinitionsDataSource(
            this.currencydefinitionsservice,
            this.currencydefpaginator,
            this.currencydefsort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.currencydefinitionsDataSource) {
                    return;
                }
                this.currencydefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshCurrencyDataSource(): void {
        this.currencydefinitionsDataSource = new CurrencyDefinitionsDataSource(
            this.currencydefinitionsservice,
            this.currencydefpaginator,
            this.currencydefsort
        );
    }

    /**
     * deleteCurrency
     */
    deleteCurrency(currency): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.currencydefinitionsservice
                    .deleteCurrency(currency)
                    .then(() => {
                        this.currencydefinitionsservice
                            .GetCurrencies()
                            .then(() => {
                                this.refreshCurrencyDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
