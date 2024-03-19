import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertSwitchTransactionCodeMap {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertSwitchTransactionCodeMapShow(): void {
        const newObserver = new ReplaySubject();
        let switchTransactionCodeMapAddText = null;
        let ok = null;
        this.translate
            .get("SWITCHTRANSACTIONCODEMAP.SWITCHTRANSACTIONCODEMAPADDED")
            .subscribe((translation: string) => {
                switchTransactionCodeMapAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("SWITCHTRANSACTIONCODEMAP.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (switchTransactionCodeMapAddText && ok) {
                this._matSnackBar.open(switchTransactionCodeMapAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertSwitchTransactionCodeMap;
