import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertEnvironmentDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertEnvironmentDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let environmentDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("ENVIRONMENT.ENVIRONMENTDEFINITIONSAVED")
            .subscribe((translation: string) => {
                environmentDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("ENVIRONMENT.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (environmentDefinitionSaveText && ok) {
                this._matSnackBar.open(environmentDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertEnvironmentDefinition;
