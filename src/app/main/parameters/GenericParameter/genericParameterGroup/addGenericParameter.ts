import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertGenericParameter {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertGenericParameterShow(): void {
        const newObserver = new ReplaySubject();
        let genericParameterAddText = null;
        let ok = null;
        this.translate
            .get("GENERICPARAMETER.GENERICPARAMETERADDED")
            .subscribe((translation: string) => {
                genericParameterAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("GENERICPARAMETER.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (genericParameterAddText && ok) {
                this._matSnackBar.open(genericParameterAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertGenericParameter;
