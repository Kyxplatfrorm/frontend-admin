import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertTenant {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertTenantShow(): void {
        const newObserver = new ReplaySubject();
        let tenantDetailAddText = null;
        let ok = null;
        this.translate
            .get("TENANT.TENANTADDED")
            .subscribe((translation: string) => {
                tenantDetailAddText = translation;
                newObserver.next();
            });
        this.translate.get("TENANT.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (tenantDetailAddText && ok) {
                this._matSnackBar.open(tenantDetailAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertTenant;
