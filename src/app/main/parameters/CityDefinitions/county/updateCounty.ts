import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertCounty {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertCountyShow(): void {
        const newObserver = new ReplaySubject();
        let countySaveText = null;
        let ok = null;
        this.translate
            .get("COUNTY.CITYSAVED")
            .subscribe((translation: string) => {
                countySaveText = translation;
                newObserver.next();
            });
        this.translate.get("COUNTY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (countySaveText && ok) {
                this._matSnackBar.open(countySaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertCounty;
