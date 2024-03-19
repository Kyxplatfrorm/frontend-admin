import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertSchedulerJobDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertSchedulerJobDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let schedulerJobDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("SCHEDULERJOB.SCHEDULERJOBDEFINITIONADDED")
            .subscribe((translation: string) => {
                schedulerJobDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("SCHEDULERJOB.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (schedulerJobDefinitionAddText && ok) {
                this._matSnackBar.open(schedulerJobDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertSchedulerJobDefinition;
