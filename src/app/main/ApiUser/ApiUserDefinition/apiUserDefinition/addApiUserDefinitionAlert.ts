import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertApiUserDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertApiUserDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let apiUserAddText = null;
        let ok = null;
        this.translate
            .get("USER.APIUSERDEFINITIONADDED")
            .subscribe((translation: string) => {
                apiUserAddText = translation;
                newObserver.next();
            });
        this.translate.get("USER.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (apiUserAddText && ok) {
                this._matSnackBar.open(apiUserAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertApiUserDefinition;
