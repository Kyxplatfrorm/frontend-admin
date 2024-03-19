import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertRoleDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertRoleDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let roleDefinitionAddText = null;
        let ok = null;
        this.translate
            .get("ROLE.ROLEADDED")
            .subscribe((translation: string) => {
                roleDefinitionAddText = translation;
                newObserver.next();
            });
        this.translate.get("ROLE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (roleDefinitionAddText && ok) {
                this._matSnackBar.open(roleDefinitionAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertRoleDefinition;
