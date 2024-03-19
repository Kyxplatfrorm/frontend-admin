import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertGenericParameter {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertGenericParameterShow(): void {
        const newObserver = new ReplaySubject();
        let genericParameterSaveText = null;
        let ok = null;
        this.translate
            .get("GENERICPARAMETER.GENERICPARAMETERSAVED")
            .subscribe((translation: string) => {
                genericParameterSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("GENERICPARAMETER.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (genericParameterSaveText && ok) {
                this._matSnackBar.open(genericParameterSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertGenericParameter;
