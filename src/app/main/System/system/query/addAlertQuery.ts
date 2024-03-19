import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertQuery {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertQueryShow(): void {
        const newObserver = new ReplaySubject();
        let queryAddText = null;
        let ok = null;
        this.translate
            .get("QUERY.QUERYADDED")
            .subscribe((translation: string) => {
                queryAddText = translation;
                newObserver.next();
            });
        this.translate.get("QUERY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (queryAddText && ok) {
                this._matSnackBar.open(queryAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertQuery;
