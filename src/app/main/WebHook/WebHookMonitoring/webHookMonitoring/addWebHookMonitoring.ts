import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertWebHookMonitoring {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertWebHookMonitoringShow(): void {
        const newObserver = new ReplaySubject();
        let webHookMonitoringAddText = null;
        let ok = null;
        this.translate
            .get("WEBHOOKMONITORING.WEBHOOKMONITORINGADDED")
            .subscribe((translation: string) => {
                webHookMonitoringAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("WEBHOOKMONITORING.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (webHookMonitoringAddText && ok) {
                this._matSnackBar.open(webHookMonitoringAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertWebHookMonitoring;
