import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateSystemKeyDefinitionAlert {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateSystemKeyDefinitionAlertShow(): void {
        const newObserver = new ReplaySubject();
        let systemKeyDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("SYSTEMKEY.SYSTEMKEYDEFINITIONSAVED")
            .subscribe((translation: string) => {
                systemKeyDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate.get("SYSTEMKEY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (systemKeyDefinitionSaveText && ok) {
                this._matSnackBar.open(systemKeyDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateSystemKeyDefinitionAlert;
