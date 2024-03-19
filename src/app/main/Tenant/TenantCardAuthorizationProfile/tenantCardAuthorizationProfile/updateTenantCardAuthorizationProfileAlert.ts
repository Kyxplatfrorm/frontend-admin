import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertTenantCardAuthorizationProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertTenantCardAuthorizationProfileShow(): void {
        const newObserver = new ReplaySubject();
        let tenantCardAuthorizationProfileSaveText = null;
        let ok = null;
        this.translate
            .get("TENANTCARDAUTHORIZATION.TENANTCARDAUTHORIZATIONPROFILESAVED")
            .subscribe((translation: string) => {
                tenantCardAuthorizationProfileSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("TENANTCARDAUTHORIZATION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (tenantCardAuthorizationProfileSaveText && ok) {
                this._matSnackBar.open(
                    tenantCardAuthorizationProfileSaveText,
                    ok,
                    {
                        verticalPosition: "top",
                        duration: 2000,
                    }
                );
            }
        });
    }
}

export default UpdateAlertTenantCardAuthorizationProfile;
