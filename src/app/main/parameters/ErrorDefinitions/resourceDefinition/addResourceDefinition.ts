import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertResourceDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertResourceDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let resourceDefAddText = null;
        let ok = null;
        this.translate
            .get("RESOURCE.RESOURCEADDED")
            .subscribe((translation: string) => {
                resourceDefAddText = translation;
                newObserver.next();
            });
        this.translate.get("RESOURCE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (resourceDefAddText && ok) {
                this._matSnackBar.open(resourceDefAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertResourceDefinition;
