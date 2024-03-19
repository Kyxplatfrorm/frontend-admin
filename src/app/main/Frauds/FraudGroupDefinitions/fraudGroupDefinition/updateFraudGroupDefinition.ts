import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertFraudGroupDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertFraudGroupDefinitionsShow(): void {
        const newObserver = new ReplaySubject();
        let fraudGroupDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("FRAUDGROUP.FRAUDGROUPDEFINITIONSAVED")
            .subscribe((translation: string) => {
                fraudGroupDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate.get("FRAUDGROUP.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (fraudGroupDefinitionSaveText && ok) {
                this._matSnackBar.open(fraudGroupDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertFraudGroupDefinition;
