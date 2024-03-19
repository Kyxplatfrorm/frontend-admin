import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertUser {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertUserShow(): void {
        const newObserver = new ReplaySubject();
        let userAddText = null;
        let ok = null;
        this.translate
            .get("USER.USERADDED")
            .subscribe((translation: string) => {
                userAddText = translation;
                newObserver.next();
            });
        this.translate.get("USER.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (userAddText && ok) {
                this._matSnackBar.open(userAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertUser;
