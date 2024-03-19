import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertJson {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertJsonShow(): void {
        const newObserver = new ReplaySubject();
        let jsonConfigDetailSaveText = null;
        let ok = null;
        this.translate
            .get("JSONCONFIG.JSONCONFIGSAVED")
            .subscribe((translation: string) => {
                jsonConfigDetailSaveText = translation;
                newObserver.next();
            });
        this.translate.get("JSONCONFIG.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (jsonConfigDetailSaveText && ok) {
                this._matSnackBar.open(jsonConfigDetailSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertJson;
