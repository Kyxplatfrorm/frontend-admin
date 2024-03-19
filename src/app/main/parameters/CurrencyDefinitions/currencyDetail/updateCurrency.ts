import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertCurrency {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertCurrencyShow(): void {
        const newObserver = new ReplaySubject();
        let currencyDetailSaveText = null;
        let ok = null;
        this.translate
            .get("CURRENCY.CURRENCYSAVED")
            .subscribe((translation: string) => {
                currencyDetailSaveText = translation;
                newObserver.next();
            });
        this.translate.get("CURRENCY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (currencyDetailSaveText && ok) {
                this._matSnackBar.open(currencyDetailSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertCurrency;
