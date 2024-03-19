import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertJson {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertJsonShow(): void {
        const newObserver = new ReplaySubject();
        let jsonConfigDetailAddText = null;
        let ok = null;
        this.translate
            .get("JSONCONFIG.JSONCONFIGADDED")
            .subscribe((translation: string) => {
                jsonConfigDetailAddText = translation;
                newObserver.next();
            });
        this.translate.get("JSONCONFIG.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (jsonConfigDetailAddText && ok) {
                this._matSnackBar.open(jsonConfigDetailAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertJson;
