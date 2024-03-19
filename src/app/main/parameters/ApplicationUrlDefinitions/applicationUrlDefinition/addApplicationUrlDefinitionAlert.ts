import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertApplicationUrlDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertApplicationUrlDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let applicationUrlDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("APPLICATIONURL.APPLICATIONURLDEFINITIONADDED")
            .subscribe((translation: string) => {
                applicationUrlDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("APPLICATIONURL.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (applicationUrlDefinitionAddText && ok) {
                this._matSnackBar.open(applicationUrlDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertApplicationUrlDefinition;
