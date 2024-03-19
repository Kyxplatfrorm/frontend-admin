import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertTenant {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertTenantShow(): void {
        const newObserver = new ReplaySubject();
        let tenantDetailSaveText = null;
        let ok = null;
        this.translate
            .get("TENANT.TENANTSAVED")
            .subscribe((translation: string) => {
                tenantDetailSaveText = translation;
                newObserver.next();
            });
        this.translate.get("TENANT.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (tenantDetailSaveText && ok) {
                this._matSnackBar.open(tenantDetailSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertTenant;
