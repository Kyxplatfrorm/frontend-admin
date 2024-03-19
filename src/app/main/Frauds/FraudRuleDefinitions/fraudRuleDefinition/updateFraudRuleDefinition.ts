import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertFraudRuleDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertFraudRuleDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let fraudRuleDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("FRAUDRULE.FRAUDRULEDEFINITIONSAVED")
            .subscribe((translation: string) => {
                fraudRuleDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate.get("FRAUDRULE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (fraudRuleDefinitionSaveText && ok) {
                this._matSnackBar.open(fraudRuleDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertFraudRuleDefinition;
