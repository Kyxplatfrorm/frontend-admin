import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertNotificationMonitoring {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertNotificationMonitoringShow(): void {
        const newObserver = new ReplaySubject();
        let notificationMonitoringSaveText = null;
        let ok = null;
        this.translate
            .get("NOTIFICATIONMONITORING.NOTIFICATIONMONITORINGSAVED")
            .subscribe((translation: string) => {
                notificationMonitoringSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("NOTIFICATIONMONITORING.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (notificationMonitoringSaveText && ok) {
                this._matSnackBar.open(notificationMonitoringSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertNotificationMonitoring;
