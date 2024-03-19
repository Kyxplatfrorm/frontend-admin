import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertUser {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertUserShow(): void {
        const newObserver = new ReplaySubject();
        let userSaveText = null;
        let ok = null;
        this.translate
            .get("USER.USERSAVED")
            .subscribe((translation: string) => {
                userSaveText = translation;
                newObserver.next();
            });
        this.translate.get("USER.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (userSaveText && ok) {
                this._matSnackBar.open(userSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertUser;
