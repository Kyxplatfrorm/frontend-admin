import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertHsmService {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertHsmServiceShow(): void {
        const newObserver = new ReplaySubject();
        let hsmServiceAddText = null;
        let ok = null;
        this.translate
            .get("HSMSERVICE.HSMSERVICEADDED")
            .subscribe((translation: string) => {
                hsmServiceAddText = translation;
                newObserver.next();
            });
        this.translate.get("HSMSERVICE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (hsmServiceAddText && ok) {
                this._matSnackBar.open(hsmServiceAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertHsmService;
