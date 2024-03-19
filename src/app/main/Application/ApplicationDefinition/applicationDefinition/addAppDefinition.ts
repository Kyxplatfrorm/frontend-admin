import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertApplicationDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertApplicationDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let applicationDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("APPLICATION.APPLICATIONDEFINITIONADDED")
            .subscribe((translation: string) => {
                applicationDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("APPLICATION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (applicationDefinitionAddText && ok) {
                this._matSnackBar.open(applicationDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertApplicationDefinition;
