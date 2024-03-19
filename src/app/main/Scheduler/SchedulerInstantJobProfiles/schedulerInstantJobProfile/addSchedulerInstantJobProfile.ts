import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertSchedulerInstantJob {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertSchedulerInstantJobShow(): void {
        const newObserver = new ReplaySubject();
        let schedulerInstantJobAddText = null;
        let ok = null;
        this.translate
            .get("SCHEDULERINSTANTJOB.SCHEDULERINSTANTJOBADDED")
            .subscribe((translation: string) => {
                schedulerInstantJobAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("SCHEDULERINSTANTJOB.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (schedulerInstantJobAddText && ok) {
                this._matSnackBar.open(schedulerInstantJobAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertSchedulerInstantJob;
