import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddSystemKeyDefinitionAlert {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddSystemKeyDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let systemKeyDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("SYSTEMKEY.SYSTEMKEYDEFINITIONADDED")
            .subscribe((translation: string) => {
                systemKeyDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate.get("SYSTEMKEY.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (systemKeyDefinitionAddText && ok) {
                this._matSnackBar.open(systemKeyDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddSystemKeyDefinitionAlert;
