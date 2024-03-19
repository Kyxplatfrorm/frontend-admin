import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertFraudGroupDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertFraudGroupDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let fraudGroupDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("FRAUDGROUP.FRAUDGROUPDEFINITIONADDED")
            .subscribe((translation: string) => {
                fraudGroupDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate.get("FRAUDGROUP.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (fraudGroupDefinitionAddText && ok) {
                this._matSnackBar.open(fraudGroupDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertFraudGroupDefinition;
