import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertResourceGroup {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertResourceGroupShow(): void {
        const newObserver = new ReplaySubject();
        let resourceGroupSaveText = null;
        let ok = null;
        this.translate
            .get("RESOURCEGROUP.RESOURCEGROUPSAVED")
            .subscribe((translation: string) => {
                resourceGroupSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("RESOURCEGROUP.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (resourceGroupSaveText && ok) {
                this._matSnackBar.open(resourceGroupSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertResourceGroup;
