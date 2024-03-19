import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertHsmDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertHsmDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let hsmDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("HSM.HSMDEFINITIONADDED")
            .subscribe((translation: string) => {
                hsmDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate.get("HSM.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (hsmDefinitionAddText && ok) {
                this._matSnackBar.open(hsmDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertHsmDefinition;
