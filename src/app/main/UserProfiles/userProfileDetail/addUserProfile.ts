import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertUserProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertUserProfileShow(): void {
        const newObserver = new ReplaySubject();
        let userDetailAddText = null;
        let ok = null;
        this.translate
            .get("UI.USERPROFILEADDED")
            .subscribe((translation: string) => {
                userDetailAddText = translation;
                newObserver.next();
            });
        this.translate.get("UI.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (userDetailAddText && ok) {
                this._matSnackBar.open(userDetailAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertUserProfile;
