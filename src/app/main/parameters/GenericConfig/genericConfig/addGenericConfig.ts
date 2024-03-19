import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertGenericConfig {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertGenericConfigShow(): void {
        const newObserver = new ReplaySubject();
        let genericConfigAddText = null;
        let ok = null;
        this.translate
            .get("GENERICCONFIG.GENERICCONFIGADDED")
            .subscribe((translation: string) => {
                genericConfigAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("GENERICCONFIG.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (genericConfigAddText && ok) {
                this._matSnackBar.open(genericConfigAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertGenericConfig;
