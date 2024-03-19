import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertHsmDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertHsmDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let hsmDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("HSM.HSMDEFINITIONSAVED")
            .subscribe((translation: string) => {
                hsmDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate.get("HSM.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (hsmDefinitionSaveText && ok) {
                this._matSnackBar.open(hsmDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertHsmDefinition;
