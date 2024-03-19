import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "userAlertPasswordReset",
    templateUrl: "./userAlertPasswordReset.component.html",
    styleUrls: ["./userAlertPasswordReset.component.scss"],
})
export class UserAlertPasswordResetDialogComponent {
    public Alertpasswordresetmessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<UserAlertPasswordResetDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<UserAlertPasswordResetDialogComponent>,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        var passwordResetmessageText = "";
        passwordResetmessageText = "PASSWORDRESETMESAGETEXT";
        this._fuseTranslationLoaderService
            .getConfirmMessageText(passwordResetmessageText)
            .subscribe((x) => (this.Alertpasswordresetmessage = x));
    }
}
