import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSwitchMessage {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSwitchMessageShow(): void {
        const newObserver = new ReplaySubject();
        let switchMessageSaveText = null;
        let ok = null;
        this.translate
            .get("SWITCHMESSAGE.SWITCHMESSAGEPROFILESAVED")
            .subscribe((translation: string) => {
                switchMessageSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("SWITCHMESSAGE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (switchMessageSaveText && ok) {
                this._matSnackBar.open(switchMessageSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSwitchMessage;
