import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertApplicationUrlDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertApplicationUrlDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let applicationUrlDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("APPLICATIONURL.APPLICATIONURLDEFINITIONSAVED")
            .subscribe((translation: string) => {
                applicationUrlDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("APPLICATIONURL.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (applicationUrlDefinitionSaveText && ok) {
                this._matSnackBar.open(applicationUrlDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertApplicationUrlDefinition;
