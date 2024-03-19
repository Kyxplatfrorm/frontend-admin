import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSwitchApplicationDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSwitchApplicationDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let switchAppDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("SWITCHAPPLICATION.SWITCHAPPLICATIONDEFINITIONSAVED")
            .subscribe((translation: string) => {
                switchAppDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("SWITCHAPPLICATION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (switchAppDefinitionSaveText && ok) {
                this._matSnackBar.open(switchAppDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSwitchApplicationDefinition;
