import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertApiLimitProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertApiLimitProfileShow(): void {
        const newObserver = new ReplaySubject();
        let apiLimitProfileSaveText = null;
        let ok = null;
        this.translate
            .get("APILIMITPROFILE.APILIMITPROFILESAVED")
            .subscribe((translation: string) => {
                apiLimitProfileSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("APILIMITPROFILE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (apiLimitProfileSaveText && ok) {
                this._matSnackBar.open(apiLimitProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertApiLimitProfile;
