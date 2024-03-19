import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertState {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertStateShow(): void {
        const newObserver = new ReplaySubject();
        let stateDefinitionsAddText = null;
        let ok = null;
        this.translate
            .get("STATE.COUNTRYADDED")
            .subscribe((translation: string) => {
                stateDefinitionsAddText = translation;
                newObserver.next();
            });
        this.translate.get("STATE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (stateDefinitionsAddText && ok) {
                this._matSnackBar.open(stateDefinitionsAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertState;
