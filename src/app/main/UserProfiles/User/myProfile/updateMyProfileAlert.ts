import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertMyProfile {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertMyProfileShow(): void {
        const newObserver = new ReplaySubject();
        let myProfileSaveText = null;
        let ok = null;
        this.translate
            .get("MYPROFILE.MYPROFILESAVED")
            .subscribe((translation: string) => {
                myProfileSaveText = translation;
                newObserver.next();
            });
        this.translate.get("MYPROFILE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (myProfileSaveText && ok) {
                this._matSnackBar.open(myProfileSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertMyProfile;
