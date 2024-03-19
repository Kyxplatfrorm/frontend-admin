import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { GenericParameterGroup } from "../../genericParameterGroups/genericParameterGroups.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
@Component({
    selector: "genericParameterForm-dialog",
    templateUrl: "./genericParameterForm.component.html",
    styleUrls: ["./genericParameterForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class GenericParameterFormDialogComponent {
    action: string;
    genericParameterGroup: GenericParameterGroup;
    genericParameterForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<GenericParameterFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<GenericParameterFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this.action = _data.action;
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        var popUpHeaderTextGenericParameterKey = "";
        if (this.action === "edit") {
            popUpHeaderTextGenericParameterKey = "EDITPROFILE";
            this.genericParameterGroup = _data.genericParameterGroup;
        } else {
            popUpHeaderTextGenericParameterKey = "NEWPROFILE";
            this.genericParameterGroup = new GenericParameterGroup({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextGenericParameterKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.genericParameterForm = this.createGenericParameterForm();
    }

    /**
     * createGenericParameterForm
     *
     * @returns {FormGroup}
     */
    createGenericParameterForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.genericParameterGroup.Id],
            ConfigGroupId: [this.genericParameterGroup.ConfigGroupId],
            ParameterKey: [this.genericParameterGroup.ParameterKey],
            ParameterValue: [this.genericParameterGroup.ParameterValue],
            ParameterValue1: [this.genericParameterGroup.ParameterValue1],
            Description: [this.genericParameterGroup.Description],
        });
    }
}
