import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertNotificationMonitoring {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertNotificationMonitoringShow(): void {
        const newObserver = new ReplaySubject();
        let notificationMonitoringAddText = null;
        let ok = null;
        this.translate
            .get("NOTIFICATIONMONITORING.NOTIFICATIONMONITORINGADDED")
            .subscribe((translation: string) => {
                notificationMonitoringAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("NOTIFICATIONMONITORING.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (notificationMonitoringAddText && ok) {
                this._matSnackBar.open(notificationMonitoringAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertNotificationMonitoring;
