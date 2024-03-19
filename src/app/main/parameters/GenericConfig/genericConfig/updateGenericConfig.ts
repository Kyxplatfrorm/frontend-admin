import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertGenericConfig {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertGenericConfigShow(): void {
        const newObserver = new ReplaySubject();
        let genericConfigSaveText = null;
        let ok = null;
        this.translate
            .get("GENERICCONFIG.GENERICCONFIGSAVED")
            .subscribe((translation: string) => {
                genericConfigSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("GENERICCONFIG.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (genericConfigSaveText && ok) {
                this._matSnackBar.open(genericConfigSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertGenericConfig;
