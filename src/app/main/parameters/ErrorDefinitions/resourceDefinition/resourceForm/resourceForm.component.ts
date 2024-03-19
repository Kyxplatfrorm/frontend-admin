import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Resource } from "../resourceDefinition.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "resourceForm-dialog",
    templateUrl: "./resourceForm.component.html",
    styleUrls: ["./resourceForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ResourceFormDialogComponent {
    action: string;
    resource: Resource;
    resourceForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ResourceFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ResourceFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextResourceKey = "";
        if (this.action === "edit") {
            popUpHeaderTextResourceKey = "EDITPROFILE";
            this.resource = _data.resource;
        } else {
            popUpHeaderTextResourceKey = "NEWPROFILE";
            this.resource = new Resource();
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextResourceKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.resourceForm = this.createResourceForm();
    }

    /**
     * Create resource form
     *
     * @returns {FormGroup}
     */
    createResourceForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.resource.Id],
            LanguageCode: [this.resource.LanguageCode],
            Description: [this.resource.Description],
            ErrorId: [this.resource.ErrorId],
        });
    }
}
