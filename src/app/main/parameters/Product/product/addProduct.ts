import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertProductDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertProductDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let productDefAddText = null;
        let ok = null;
        this.translate
            .get("PRODUCT.PRODUCTADDED")
            .subscribe((translation: string) => {
                productDefAddText = translation;
                newObserver.next();
            });
        this.translate.get("PRODUCT.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (productDefAddText && ok) {
                this._matSnackBar.open(productDefAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertProductDefinition;
