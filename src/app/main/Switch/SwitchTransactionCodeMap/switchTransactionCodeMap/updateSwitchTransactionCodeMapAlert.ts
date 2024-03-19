import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSwitchTransactionCodeMap {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSwitchTransactionCodeMapShow(): void {
        const newObserver = new ReplaySubject();
        let switchTransactionCodeMapSaveText = null;
        let ok = null;
        this.translate
            .get("SWITCHTRANSACTIONCODEMAP.SWITCHTRANSACTIONCODEMAPSAVED")
            .subscribe((translation: string) => {
                switchTransactionCodeMapSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("SWITCHTRANSACTIONCODEMAP.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (switchTransactionCodeMapSaveText && ok) {
                this._matSnackBar.open(switchTransactionCodeMapSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSwitchTransactionCodeMap;
