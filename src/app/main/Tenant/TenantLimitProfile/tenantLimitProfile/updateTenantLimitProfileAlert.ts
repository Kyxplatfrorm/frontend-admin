import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertTenantLimitProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertTenantLimitProfileShow(): void {
        const newObserver = new ReplaySubject();
        let tenantLimitProfileSaveText = null;
        let ok = null;
        this.translate
            .get("LIMIT.TENANTLIMITPROFILESAVED")
            .subscribe((translation: string) => {
                tenantLimitProfileSaveText = translation;
                newObserver.next();
            });
        this.translate.get("LIMIT.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (tenantLimitProfileSaveText && ok) {
                this._matSnackBar.open(tenantLimitProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertTenantLimitProfile;
