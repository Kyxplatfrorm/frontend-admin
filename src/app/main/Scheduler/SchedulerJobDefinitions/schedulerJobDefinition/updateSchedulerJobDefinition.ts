import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSchedulerJobDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSchedulerJobDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let schedulerJobDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("SCHEDULERJOB.SCHEDULERJOBDEFINITIONSAVED")
            .subscribe((translation: string) => {
                schedulerJobDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("SCHEDULERJOB.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (schedulerJobDefinitionSaveText && ok) {
                this._matSnackBar.open(schedulerJobDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSchedulerJobDefinition;
