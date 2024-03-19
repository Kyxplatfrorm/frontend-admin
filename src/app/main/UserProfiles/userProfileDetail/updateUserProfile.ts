import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertUserProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertUserProfileShow(): void {
        const newObserver = new ReplaySubject();
        let userDetailSaveText = null;
        let ok = null;
        this.translate
            .get("UI.USERPROFILESAVED")
            .subscribe((translation: string) => {
                userDetailSaveText = translation;
                newObserver.next();
            });
        this.translate.get("UI.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (userDetailSaveText && ok) {
                this._matSnackBar.open(userDetailSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertUserProfile;
