import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSystemRestrictionProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSystemRestrictionProfileShow(): void {
        const newObserver = new ReplaySubject();
        let systemRestrictionProfileSaveText = null;
        let ok = null;
        this.translate
            .get("SYSTEMRESTRICTION.SYSTEMRESTRICTIONPROFILESAVED")
            .subscribe((translation: string) => {
                systemRestrictionProfileSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("SYSTEMRESTRICTION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (systemRestrictionProfileSaveText && ok) {
                this._matSnackBar.open(systemRestrictionProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSystemRestrictionProfile;
