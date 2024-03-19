import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertWebHookMonitoring {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertWebHookMonitoringShow(): void {
        const newObserver = new ReplaySubject();
        let webHookMonitoringSaveText = null;
        let ok = null;
        this.translate
            .get("WEBHOOKMONITORING.WEBHOOKMONITORINGSAVED")
            .subscribe((translation: string) => {
                webHookMonitoringSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("WEBHOOKMONITORING.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (webHookMonitoringSaveText && ok) {
                this._matSnackBar.open(webHookMonitoringSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertWebHookMonitoring;
