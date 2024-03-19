import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertAppProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertAppProfileShow(): void {
        const newObserver = new ReplaySubject();
        let applicationDetailAddText = null;
        let ok = null;
        this.translate
            .get("APPLICATION.APPLICATIONPROFILEADDED")
            .subscribe((translation: string) => {
                applicationDetailAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("APPLICATION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (applicationDetailAddText && ok) {
                this._matSnackBar.open(applicationDetailAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertAppProfile;
