import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertAppProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertAppProfileShow(): void {
        const newObserver = new ReplaySubject();
        let applicationDetailSaveText = null;
        let ok = null;
        this.translate
            .get("APPLICATION.APPLICATIONPROFILESAVED")
            .subscribe((translation: string) => {
                applicationDetailSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("APPLICATION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (applicationDetailSaveText && ok) {
                this._matSnackBar.open(applicationDetailSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertAppProfile;
