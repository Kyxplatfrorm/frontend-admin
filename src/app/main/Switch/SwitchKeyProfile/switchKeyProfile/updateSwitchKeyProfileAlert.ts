import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSwitchKeyProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSwitchKeyProfileShow(): void {
        const newObserver = new ReplaySubject();
        let switchKeyProfileSaveText = null;
        let ok = null;
        this.translate
            .get("SWITCHKEY.SWITCHKEYPROFILESAVED")
            .subscribe((translation: string) => {
                switchKeyProfileSaveText = translation;
                newObserver.next();
            });
        this.translate.get("SWITCHKEY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (switchKeyProfileSaveText && ok) {
                this._matSnackBar.open(switchKeyProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSwitchKeyProfile;
