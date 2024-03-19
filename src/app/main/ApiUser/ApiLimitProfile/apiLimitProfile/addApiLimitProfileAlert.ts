import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertApiLimitProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertApiLimitProfileShow(): void {
        const newObserver = new ReplaySubject();
        let apiLimitProfileAddText = null;
        let ok = null;
        this.translate
            .get("APILIMITPROFILE.APILIMITPROFILEADDED")
            .subscribe((translation: string) => {
                apiLimitProfileAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("APILIMITPROFILE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (apiLimitProfileAddText && ok) {
                this._matSnackBar.open(apiLimitProfileAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertApiLimitProfile;
