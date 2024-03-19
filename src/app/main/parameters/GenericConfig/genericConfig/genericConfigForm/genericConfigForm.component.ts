import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { GenericConfig } from "../genericConfig.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "genericConfigForm-dialog",
    templateUrl: "./genericConfigForm.component.html",
    styleUrls: ["./genericConfigForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class GenericConfigFormDialogComponent {
    action: string;
    genericConfig: GenericConfig;
    genericConfigForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ResourceFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<GenericConfigFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextGenericConfigKey = "";
        if (this.action === "edit") {
            popUpHeaderTextGenericConfigKey = "EDITPROFILE";
            this.genericConfig = _data.genericConfig;
        } else {
            popUpHeaderTextGenericConfigKey = "NEWPROFILE";
            this.genericConfig = new GenericConfig({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextGenericConfigKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.genericConfigForm = this.creatGenericConfigForm();
    }

    /**
     * Create resource form
     *
     * @returns {FormGroup}
     */
    creatGenericConfigForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.genericConfig.Id],
            ConfigGroupId: [this.genericConfig.ConfigGroupId],
            ConfigKey: [this.genericConfig.ConfigKey],
            ConfigValue: [this.genericConfig.ConfigValue],
        });
    }
}
