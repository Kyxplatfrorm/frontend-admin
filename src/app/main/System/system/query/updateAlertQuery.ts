import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertQuery {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertQueryShow(): void {
        const newObserver = new ReplaySubject();
        let querySaveText = null;
        let ok = null;
        this.translate
            .get("QUERY.QUERYSAVED")
            .subscribe((translation: string) => {
                querySaveText = translation;
                newObserver.next();
            });
        this.translate.get("QUERY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (querySaveText && ok) {
                this._matSnackBar.open(querySaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertQuery;
