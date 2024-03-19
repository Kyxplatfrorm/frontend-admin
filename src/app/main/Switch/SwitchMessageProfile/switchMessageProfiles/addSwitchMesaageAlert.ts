import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertSwitchMessage {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertSwitchMessageShow(): void {
        const newObserver = new ReplaySubject();
        let switchMessageAddText = null;
        let ok = null;
        this.translate
            .get("SWITCHMESSAGE.SWITCHMESSAGEPROFILEADDED")
            .subscribe((translation: string) => {
                switchMessageAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("SWITCHMESSAGE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (switchMessageAddText && ok) {
                this._matSnackBar.open(switchMessageAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertSwitchMessage;
