import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { ResourceGroup } from "../../resourceGroups/resourceGroups.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "resourceGroupForm-dialog",
    templateUrl: "./resourceGroupForm.component.html",
    styleUrls: ["./resourceGroupForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ResourceGroupFormDialogComponent {
    action: string;
    resourceGroup: ResourceGroup;
    resourceGroupForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ResourceGroupFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ResourceGroupFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextResourceGroup = "";
        if (this.action === "edit") {
            popUpHeaderTextResourceGroup = "EDITPROFILE";
            this.resourceGroup = _data.resourceGroup;
        } else {
            popUpHeaderTextResourceGroup = "NEWPROFILE";
            this.resourceGroup = new ResourceGroup({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextResourceGroup)
            .subscribe((x) => (this.dialogTitle = x));
        this.resourceGroupForm = this.createResourceGroupForm();
    }

    /**
     * createResourceGroupForm
     *
     * @returns {FormGroup}
     */
    createResourceGroupForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.resourceGroup.Id],
            ConfigGroupId: [this.resourceGroup.ConfigGroupId],
            ResourceCode: [this.resourceGroup.ResourceCode],
            LanguageCode: [this.resourceGroup.LanguageCode],
            Description: [this.resourceGroup.Description],
        });
    }
}
