import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSchedulerInstantJob {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSchedulerInstantJobShow(): void {
        const newObserver = new ReplaySubject();
        let schedulerInstantJobSaveText = null;
        let ok = null;
        this.translate
            .get("SCHEDULERINSTANTJOB.SCHEDULERINSTANTJOBPROFILESAVED")
            .subscribe((translation: string) => {
                schedulerInstantJobSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("SCHEDULERINSTANTJOB.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (schedulerInstantJobSaveText && ok) {
                this._matSnackBar.open(schedulerInstantJobSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSchedulerInstantJob;
