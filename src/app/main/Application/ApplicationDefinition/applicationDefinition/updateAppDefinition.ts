import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertApplicationDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertApplicationDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let applicationDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("APPLICATION.APPLICATIONDEFINITIONSAVED")
            .subscribe((translation: string) => {
                applicationDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("APPLICATION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (applicationDefinitionSaveText && ok) {
                this._matSnackBar.open(applicationDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertApplicationDefinition;
