import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ChangePasswordAlertMyProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    ChangePasswordAlertMyProfileShow(): void {
        const newObserver = new ReplaySubject();
        let changePasswordText = null;
        let ok = null;
        this.translate
            .get("MYPROFILE.CHANGEPASSWORD2")
            .subscribe((translation: string) => {
                changePasswordText = translation;
                newObserver.next();
            });
        this.translate.get("MYPROFILE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (changePasswordText && ok) {
                this._matSnackBar.open(changePasswordText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default ChangePasswordAlertMyProfile;
