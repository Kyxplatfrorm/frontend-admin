import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertResourceDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertResourceDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let resourceDefSaveText = null;
        let ok = null;
        this.translate
            .get("RESOURCE.RESOURCESAVED")
            .subscribe((translation: string) => {
                resourceDefSaveText = translation;
                newObserver.next();
            });
        this.translate.get("RESOURCE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (resourceDefSaveText && ok) {
                this._matSnackBar.open(resourceDefSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertResourceDefinition;
