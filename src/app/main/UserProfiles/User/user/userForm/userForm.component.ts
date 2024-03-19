import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { User } from "../../users/users.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
@Component({
    selector: "userForm-dialog",
    templateUrl: "./userForm.component.html",
    styleUrls: ["./userForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class UserFormDialogComponent {
    action: string;
    user: User;
    userForm: FormGroup;
    dialogTitle: string;
    dateModelStartDate: Date = new Date();
    dateModelEndDate: Date = new Date();

    /**
     * Constructor
     *
     * @param {MatDialogRef<UserFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<UserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this.action = _data.action;
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        var popUpHeaderTextUserKey = "";
        if (this.action === "edit") {
            popUpHeaderTextUserKey = "EDITPROFILE";
            this.user = _data.user;
        } else {
            popUpHeaderTextUserKey = "NEWPROFILE";
            this.user = new User({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextUserKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.userForm = this.createUserForm();
    }

    /**
     * createUserForm
     *
     * @returns {FormGroup}
     */
    createUserForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.user.Id],
            ApiUserId: [this.user.ApiUserId],
            IsActive: [this.user.IsActive],
            ApiKey: [this.user.ApiKey],
            HasExpiryDate: [this.user.HasExpiryDate],
            StartDateTime: [this.user.StartDateTime],
            EndDateTime: [this.user.EndDateTime],
        });
    }
}
