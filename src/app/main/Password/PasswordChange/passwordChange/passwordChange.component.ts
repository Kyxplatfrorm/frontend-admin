import { Component, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { PasswordChange } from "./passwordChange.model";
import { fuseAnimations } from "@fuse/animations";
import { FuseConfigService } from "@fuse/services/config.service";
import { Router } from "@angular/router";
import { PasswordChangeService } from "./passwordChange.service";
@Component({
    selector: "passwordChange",
    templateUrl: "./passwordChange.component.html",
    styleUrls: ["./passwordChange.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class PasswordChangeComponent {
    passwordChange: PasswordChange;
    passwordChangeForm: FormGroup;
    oldPassword: boolean = false;
    newPassword: boolean = false;
    newPassword2: boolean = false;
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseConfigService: FuseConfigService,
        private router: Router,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private passwordChangeService: PasswordChangeService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.passwordChangeForm = this.createPasswordChangeForm();
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.passwordChangeForm = this._formBuilder.group({
            NewPassword: ["", [Validators.required, Validators.minLength(6)]],
            NewPassword2: ["", [Validators.required, confirmPasswordValidator]],
        });

        this.passwordChangeForm
            .get("NewPassword")
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.passwordChangeForm
                    .get("NewPassword2")
                    .updateValueAndValidity();
            });
    }

    /**
     * ForceChangePassword
     */
    ForceChangePassword(): void {
        const data = this.passwordChangeForm.getRawValue();
        this.passwordChangeService.ForceChangePassword(data).then(() => {
            this.passwordChangeService.onPasswordChangeChanged.next(data);
            this.router.navigate(["main/dashboards"]);
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
     * createPasswordChangeForm
     *
     * @returns {FormGroup}
     */
    createPasswordChangeForm(): FormGroup {
        return this._formBuilder.group({
            NewPassword: [this.passwordChange?.NewPassword],
            NewPassword2: [this.passwordChange?.NewPassword2],
        });
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
