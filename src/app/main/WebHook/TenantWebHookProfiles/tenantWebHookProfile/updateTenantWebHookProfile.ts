import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateTenantWebHookProfileAlert {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateTenantWebHookProfileAlertShow(): void {
        const newObserver = new ReplaySubject();
        let tenantWebHookProfileSaveText = null;
        let ok = null;
        this.translate
            .get("TENANTWEBHOOK.TENANTWEBHOOKPROFILESAVED")
            .subscribe((translation: string) => {
                tenantWebHookProfileSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("TENANTWEBHOOK.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (tenantWebHookProfileSaveText && ok) {
                this._matSnackBar.open(tenantWebHookProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateTenantWebHookProfileAlert;
