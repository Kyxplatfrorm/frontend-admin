import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertRoleDefinition {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertRoleDefinitionShow(): void {
        const newObserver = new ReplaySubject();
        let roleDefinitionSaveText = null;
        let ok = null;
        this.translate
            .get("ROLE.ROLESAVED")
            .subscribe((translation: string) => {
                roleDefinitionSaveText = translation;
                newObserver.next();
            });
        this.translate.get("ROLE.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (roleDefinitionSaveText && ok) {
                this._matSnackBar.open(roleDefinitionSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertRoleDefinition;
