import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertCounty {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertCountyShow(): void {
        const newObserver = new ReplaySubject();
        let countyAddText = null;
        let ok = null;
        this.translate
            .get("COUNTY.CITYADDED")
            .subscribe((translation: string) => {
                countyAddText = translation;
                newObserver.next();
            });
        this.translate.get("COUNTY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (countyAddText && ok) {
                this._matSnackBar.open(countyAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertCounty;
