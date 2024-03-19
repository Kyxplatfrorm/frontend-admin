import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertSwitchAppDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertSwitchAppDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let switchAppDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("SWITCHAPPLICATION.SWITCHAPPLICATIONDEFINITIONADDED")
            .subscribe((translation: string) => {
                switchAppDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("SWITCHAPPLICATION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (switchAppDefinitionAddText && ok) {
                this._matSnackBar.open(switchAppDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertSwitchAppDefinition;
