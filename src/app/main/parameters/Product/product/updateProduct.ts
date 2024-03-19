import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertUpdateDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertUpdateDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let productDefSaveText = null;
        let ok = null;
        this.translate
            .get("PRODUCT.PRODUCTSAVED")
            .subscribe((translation: string) => {
                productDefSaveText = translation;
                newObserver.next();
            });
        this.translate.get("PRODUCT.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (productDefSaveText && ok) {
                this._matSnackBar.open(productDefSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertUpdateDefinition;
