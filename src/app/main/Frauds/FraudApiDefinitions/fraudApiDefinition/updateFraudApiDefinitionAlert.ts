import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertFraudApiDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertFraudApiDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let fraudApiDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("FRAUDAPI.FRAUDAPIDEFINITIONSAVED")
            .subscribe((translation: string) => {
                fraudApiDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate.get("FRAUDAPI.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (fraudApiDefinitionSaveText && ok) {
                this._matSnackBar.open(fraudApiDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertFraudApiDefinition;
