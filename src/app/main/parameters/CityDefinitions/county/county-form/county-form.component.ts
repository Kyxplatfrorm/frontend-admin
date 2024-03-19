import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { County } from "../county.model";

@Component({
    selector: "county-form-dialog",
    templateUrl: "./county-form.component.html",
    styleUrls: ["./county-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CountyFormDialogComponent {
    action: string;
    county: County;
    countyPopupForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CountyFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        public matDialogRef: MatDialogRef<CountyFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextCountyKey = "";
        if (this.action === "edit") {
            popUpHeaderTextCountyKey = "EDITPROFILE";
            this.county = _data.county;
        } else {
            popUpHeaderTextCountyKey = "NEWPROFILE";
            this.county = new County({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextCountyKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.countyPopupForm = this.createCountyPopupForm();
    }

    /**
     * createCountyPopupForm
     *
     * @returns {FormGroup}
     */
    createCountyPopupForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.county.Id],
            CountyName: [this.county.CountyName],
        });
    }
}
