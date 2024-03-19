import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertTenantRestrictionProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertTenantRestrictionProfileShow(): void {
        const newObserver = new ReplaySubject();
        let restrictionProfileSaveText = null;
        let ok = null;
        this.translate
            .get("RESTRICTION.TENANTRESTRICTIONPROFILESAVED")
            .subscribe((translation: string) => {
                restrictionProfileSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("RESTRICTION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (restrictionProfileSaveText && ok) {
                this._matSnackBar.open(restrictionProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertTenantRestrictionProfile;
