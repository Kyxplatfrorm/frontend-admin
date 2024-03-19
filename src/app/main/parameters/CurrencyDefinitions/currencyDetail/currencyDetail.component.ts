import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Currency } from "./currencyDetail.model";
import { CurrencyDetailService } from "./currencyDetail.service";
import { CurrencyDefinitionsService } from "../currencyDefinitions/currencyDefinitions.service";
import AddAlertCurrency from "./addCurrency";
import UpdateAlertCurrency from "./updateCurrency";

@Component({
    selector: "currencyDetail",
    templateUrl: "./currencyDetail.component.html",
    styleUrls: ["./currencyDetail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CurrencyDetailComponent implements OnInit, OnDestroy {
    dialogRef: any;
    currency: Currency;
    pageType: string;
    currencyDetailForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

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
        private currencydefinitionsservice: CurrencyDefinitionsService,
        private currencydetailservice: CurrencyDetailService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private addAlertCurrency: AddAlertCurrency,
        private updateAlertCurrency: UpdateAlertCurrency
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.currency = new Currency();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.currencydetailservice.onCurrencyDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((currency) => {
                if (currency) {
                    this.currency = new Currency(currency);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.currency = new Currency();
                }
                this.currencyDetailForm = this.createCurrencyDetailForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createCurrencyDetailForm
     *
     * @returns {FormGroup}
     */
    createCurrencyDetailForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.currency.Id],
            CurrencyCode: [this.currency.CurrencyCode],
            CurrencyCodeNumeric: [this.currency.CurrencyCodeNumeric],
            CurrencyCodeExternal: [this.currency.CurrencyCodeExternal],
            CurrencySymbol: [this.currency.CurrencySymbol],
            CountryName: [this.currency.CountryName],
            CurrencyName: [this.currency.CurrencyName],
            IconUrl: [this.currency.IconUrl],
            IsSettlementCurrency: [this.currency.IsSettlementCurrency],
            IsCryptoCurrency: [this.currency.IsCryptoCurrency],
        });
    }

    /**
     * UpdateCurrency
     */
    updateCurrency(): void {
        const data = this.currencyDetailForm.getRawValue();
        this.currencydetailservice.updateCurrency(data).then(() => {
            this.currencydetailservice.onCurrencyDetailChanged.next(data);
            this.router.navigate([
                "Parameters/CurrencyDefinitions/currencyDefinitions",
            ]);
            this.updateAlertCurrency.UpdateAlertCurrencyShow();
            this.currencydefinitionsservice.GetCurrencies();
        });
    }

    /**
     * CreateCurrency
     */
    createCurrency(): void {
        const data = this.currencyDetailForm.getRawValue();
        this.currencydetailservice.createCurrency(data).then(() => {
            this.currencydetailservice.onCurrencyDetailChanged.next(data);
            this.router.navigate([
                "Parameters/CurrencyDefinitions/currencyDefinitions",
            ]);
            this.addAlertCurrency.AddAlertCurrencyShow();
            this.currencydefinitionsservice.GetCurrencies();
        });
    }
}
