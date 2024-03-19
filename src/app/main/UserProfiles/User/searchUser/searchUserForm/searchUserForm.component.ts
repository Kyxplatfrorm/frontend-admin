import { Component, Inject, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import * as _ from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { User } from "../../users/users.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "searchUserForm-dialog",
    templateUrl: "./searchUserForm.component.html",
    styleUrls: ["./searchUserForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SearchUserFormDialogComponent {
    action: string;
    user: User;
    searchUserForm: FormGroup;
    dialogTitle: string;
    newPassword: boolean = false;
    newPassword2: boolean = false;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SearchUserFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SearchUserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService
    ) {
        this.action = _data.action;
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        var popUpHeaderTextSearchUserKey = "";
        if (this.action === "edit") {
            popUpHeaderTextSearchUserKey = "EDITPROFILE";
            this.user = _data.user;
        } else {
            popUpHeaderTextSearchUserKey = "NEWPROFILE";
            this.user = new User({});
        }
        this._unsubscribeAll = new Subject();
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSearchUserKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.searchUserForm = this.createSearchUserForm();
    }

    /**
     * createSearchUserForm
     *
     * @returns {FormGroup}
     */
    createSearchUserForm(): FormGroup {
        return this._formBuilder.group({
            UserId: [this.user.UserId],
            NewPassword: [this.user.NewPassword],
            NewPassword2: [this.user.NewPassword2],
        });
    }
    visibilityNewPassword() {
        this.newPassword = !this.newPassword;
    }
    visibilityNewPasswordRepeat() {
        this.newPassword2 = !this.newPassword2;
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.searchUserForm = this._formBuilder.group({
            NewPassword: ["", [Validators.required, Validators.minLength(6)]],
            NewPassword2: ["", [Validators.required, confirmPasswordValidator]],
        });

        this.searchUserForm
            .get("NewPassword")
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.searchUserForm
                    .get("NewPassword2")
                    .updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @param lang;
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const NewPassword = control.parent.get("NewPassword");
    const NewPassword2 = control.parent.get("NewPassword2");

    if (!NewPassword || !NewPassword2) {
        return null;
    }

    if (NewPassword2.value === "") {
        return null;
    }

    if (NewPassword.value === NewPassword2.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
