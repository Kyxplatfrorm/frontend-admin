import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertState {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertStateShow(): void {
        const newObserver = new ReplaySubject();
        let stateDefinitionsSaveText = null;
        let ok = null;
        this.translate
            .get("STATE.COUNTRYSAVED")
            .subscribe((translation: string) => {
                stateDefinitionsSaveText = translation;
                newObserver.next();
            });
        this.translate.get("STATE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (stateDefinitionsSaveText && ok) {
                this._matSnackBar.open(stateDefinitionsSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertState;
