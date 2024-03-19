import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { TenantCurrency } from "../tenantCurrencyProfiles.model";
import { TenantCurrencyProfilesService } from "../tenantCurrencyProfiles.service";

@Component({
    selector: "tenantCurrencyProfileForm-dialog",
    templateUrl: "./tenantCurrencyProfileForm.component.html",
    styleUrls: ["./tenantCurrencyProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TenantCurrencyProfileFormDialogComponent {
    action: string;
    tenantCurrency: TenantCurrency;
    tenantCurrencyProfileForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<TenantCurrencyProfileFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<TenantCurrencyProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private tenantCurrencyProfilesService: TenantCurrencyProfilesService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextProductKey = "";
        if (this.action === "edit") {
            popUpHeaderTextProductKey = "EDITPROFILE";
            this.tenantCurrency = _data.tenantCurrency;
        } else {
            popUpHeaderTextProductKey = "NEWPROFILE";
            this.tenantCurrency = new TenantCurrency();
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextProductKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.tenantCurrencyProfileForm = this.createTenantCurrencyForm();
    }

    ngOnInit(): void {}

    /**
     * createTenantCurrencyForm
     *
     * @returns {FormGroup}
     */
    createTenantCurrencyForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantCurrency.Id],
            TenantId: [this.tenantCurrency.TenantId],
            CurrencyCode: [this.tenantCurrency.CurrencyCode],
            CurrencyCodeNumeric: [this.tenantCurrency.CurrencyCodeNumeric],
            CurrencyName: [this.tenantCurrency.CurrencyName],
            IsActive: [this.tenantCurrency.IsActive],
            IsSettlementCurrency: [this.tenantCurrency.IsSettlementCurrency],
            IsCryptoCurrency: [this.tenantCurrency.IsCryptoCurrency],
        });
    }
}
