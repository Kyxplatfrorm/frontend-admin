import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertSwitchKeyProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertSwitchKeyProfileShow(): void {
        const newObserver = new ReplaySubject();
        let switchKeyProfileAddText = null;
        let ok = null;
        this.translate
            .get("SWITCHKEY.SWITCHKEYPROFILEADDED")
            .subscribe((translation: string) => {
                switchKeyProfileAddText = translation;
                newObserver.next();
            });
        this.translate.get("SWITCHKEY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (switchKeyProfileAddText && ok) {
                this._matSnackBar.open(switchKeyProfileAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertSwitchKeyProfile;
