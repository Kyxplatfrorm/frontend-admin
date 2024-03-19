import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertApiPermissionProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertApiPermissionProfileShow(): void {
        const newObserver = new ReplaySubject();
        let apiPermissionProfileAddText = null;
        let ok = null;
        this.translate
            .get("APIPERMISSION.APIPERMISSIONPROFILEADDED")
            .subscribe((translation: string) => {
                apiPermissionProfileAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("APIPERMISSION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (apiPermissionProfileAddText && ok) {
                this._matSnackBar.open(apiPermissionProfileAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertApiPermissionProfile;
