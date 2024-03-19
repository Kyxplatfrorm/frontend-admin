import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "userAlertPasswordCount",
    templateUrl: "./userAlertPasswordCount.component.html",
    styleUrls: ["./userAlertPasswordCount.component.scss"],
})
export class UserPasswordCountDialogComponent {
    public Alertpasswordcountmessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<UserPasswordCountDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<UserPasswordCountDialogComponent>,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        var passwordCountMessageText = "";
        passwordCountMessageText = "PASSWORDCOUNTMESAGETEXT";
        this._fuseTranslationLoaderService
            .getConfirmMessageText(passwordCountMessageText)
            .subscribe((x) => (this.Alertpasswordcountmessage = x));
    }
}
