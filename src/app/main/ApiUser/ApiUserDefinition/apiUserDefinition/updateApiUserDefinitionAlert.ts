import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertApiUserDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertApiUserDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let apiUserSaveText = null;
        let ok = null;
        this.translate
            .get("USER.APIUSERDEFINITIONSAVED")
            .subscribe((translation: string) => {
                apiUserSaveText = translation;
                newObserver.next();
            });
        this.translate.get("USER.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (apiUserSaveText && ok) {
                this._matSnackBar.open(apiUserSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertApiUserDefinition;
