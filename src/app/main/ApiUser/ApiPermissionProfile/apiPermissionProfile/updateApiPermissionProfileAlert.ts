import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertApiPermissionProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertApiPermissionProfileShow(): void {
        const newObserver = new ReplaySubject();
        let apiPermissionProfileSaveText = null;
        let ok = null;
        this.translate
            .get("APIPERMISSION.APIPERMISSIONPROFILESAVED")
            .subscribe((translation: string) => {
                apiPermissionProfileSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("APIPERMISSION.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (apiPermissionProfileSaveText && ok) {
                this._matSnackBar.open(apiPermissionProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertApiPermissionProfile;
