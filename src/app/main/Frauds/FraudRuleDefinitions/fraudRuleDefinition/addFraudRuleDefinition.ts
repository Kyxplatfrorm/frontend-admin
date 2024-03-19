import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertFraudRuleDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertFraudRuleDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let fraudRuleDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("FRAUDRULE.FRAUDRULEDEFINITIONADDED")
            .subscribe((translation: string) => {
                fraudRuleDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate.get("FRAUDRULE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (fraudRuleDefinitionAddText && ok) {
                this._matSnackBar.open(fraudRuleDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertFraudRuleDefinition;
