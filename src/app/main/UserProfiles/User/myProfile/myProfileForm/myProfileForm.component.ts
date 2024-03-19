import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MyProfile } from "../myProfile.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
@Component({
    selector: "myProfileForm-dialog",
    templateUrl: "./myProfileForm.component.html",
    styleUrls: ["./myProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class MyProfileFormDialogComponent {
    action: string;
    myProfile: MyProfile;
    myProfileForm: FormGroup;
    dialogTitle: string;
    dateModelStartDate: Date = new Date();
    dateModelEndDate: Date = new Date();
    oldPassword: boolean = false;
    newPassword: boolean = false;
    newPassword2: boolean = false;
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {MatDialogRef<UserFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<MyProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this.action = _data.action;
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        var popUpHeaderTextMyProfileKey = "";
        if (this.action === "edit") {
            popUpHeaderTextMyProfileKey = "EDITPROFILE";
            this.myProfile = _data.myProfile;
        } else {
            popUpHeaderTextMyProfileKey = "NEWPROFILE";
            this.myProfile = new MyProfile({});
        }
        this._unsubscribeAll = new Subject();
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextMyProfileKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.myProfileForm = this.createMyProfileForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.myProfileForm = this._formBuilder.group({
            NewPassword: ["", [Validators.required, Validators.minLength(6)]],
            NewPassword2: ["", [Validators.required, confirmPasswordValidator]],
            OldPassword: ["", Validators.required],
        });

        this.myProfileForm
            .get("NewPassword")
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.myProfileForm.get("NewPassword2").updateValueAndValidity();
            });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     * createMyProfileForm
     *
     * @returns {FormGroup}
     */
    createMyProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.myProfile.Id],
            OldPassword: [this.myProfile.OldPassword],
            NewPassword: [this.myProfile.NewPassword],
            NewPassword2: [this.myProfile.NewPassword2],
        });
    }
    visibilityOldPassword() {
        this.oldPassword = !this.oldPassword;
    }
    visibilityNewPassword() {
        this.newPassword = !this.newPassword;
    }
    visibilityNewPassword2() {
        this.newPassword2 = !this.newPassword2;
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
