import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertHsmService {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertHsmServiceShow(): void {
        const newObserver = new ReplaySubject();
        let hsmServiceSaveText = null;
        let ok = null;
        this.translate
            .get("HSMSERVICE.HSMSERVICESAVED")
            .subscribe((translation: string) => {
                hsmServiceSaveText = translation;
                newObserver.next();
            });
        this.translate.get("HSMSERVICE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (hsmServiceSaveText && ok) {
                this._matSnackBar.open(hsmServiceSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertHsmService;
