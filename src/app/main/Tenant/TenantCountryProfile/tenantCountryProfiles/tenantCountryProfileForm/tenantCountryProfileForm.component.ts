import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { TenantCountry } from "../../tenantCountry/tenantCountry.model";
import { CountryEntity } from "app/ui/country";
import { TenantCountryProfilesService } from "../tenantCountryProfiles.service";

@Component({
    selector: "tenantCountryProfileForm-dialog",
    templateUrl: "./tenantCountryProfileForm.component.html",
    styleUrls: ["./tenantCountryProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TenantCountryProfileFormDialogComponent {
    action: string;
    tenantCountry: TenantCountry;
    tenantCountryProfileForm: FormGroup;
    dialogTitle: string;
    countryList: CountryEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<TenantCountryProfileFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<TenantCountryProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private tenantCountryProfilesService: TenantCountryProfilesService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextProductKey = "";
        if (this.action === "edit") {
            popUpHeaderTextProductKey = "EDITPROFILE";
            this.tenantCountry = _data.tenantCountry;
        } else {
            popUpHeaderTextProductKey = "NEWPROFILE";
            this.tenantCountry = new TenantCountry();
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextProductKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.tenantCountryProfileForm = this.createTenantCountryForm();
    }

    ngOnInit(): void {
        this.tenantCountryProfilesService.GetCountries().then(() => {
            this.countryList =
                this.tenantCountryProfilesService.countryApiResponse.CountryList;
        });
    }

    /**
     * createTenantCountryForm
     *
     * @returns {FormGroup}
     */
    createTenantCountryForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantCountry.Id],
            TenantId: [this.tenantCountry.TenantId],
            CountryId: [this.tenantCountry.CountryId],
            IsRegistrationEnabled: [this.tenantCountry.IsRegistrationEnabled],
        });
    }
}
