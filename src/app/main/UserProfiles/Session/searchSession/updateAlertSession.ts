import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSession {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSessionShow(): void {
        const newObserver = new ReplaySubject();
        let sessionSaveText = null;
        let ok = null;
        this.translate
            .get("SESSION.SESSIONSAVED")
            .subscribe((translation: string) => {
                sessionSaveText = translation;
                newObserver.next();
            });
        this.translate.get("SESSION.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (sessionSaveText && ok) {
                this._matSnackBar.open(sessionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSession;
