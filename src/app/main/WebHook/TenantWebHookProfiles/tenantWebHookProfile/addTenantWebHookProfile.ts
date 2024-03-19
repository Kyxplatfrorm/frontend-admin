import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddTenantWebHookProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddTenantWebHookProfileShow(): void {
        const newObserver = new ReplaySubject();
        let tenantWebHookProfileAddText = null;
        let ok = null;
        this.translate
            .get("TENANTWEBHOOK.TENANTWEBHOOKPROFILEADDED")
            .subscribe((translation: string) => {
                tenantWebHookProfileAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("TENANTWEBHOOK.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (tenantWebHookProfileAddText && ok) {
                this._matSnackBar.open(tenantWebHookProfileAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddTenantWebHookProfile;
