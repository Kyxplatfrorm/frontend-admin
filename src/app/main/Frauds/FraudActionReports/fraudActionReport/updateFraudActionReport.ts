import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertFraudActionReport {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertFraudActionReportShow(): void {
        const newObserver = new ReplaySubject();
        let fraudActionReportSaveText = null;
        let ok = null;
        this.translate
            .get("FRAUDACTION.FRAUDACTIONREPORTSAVED")
            .subscribe((translation: string) => {
                fraudActionReportSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("FRAUDACTION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (fraudActionReportSaveText && ok) {
                this._matSnackBar.open(fraudActionReportSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertFraudActionReport;
