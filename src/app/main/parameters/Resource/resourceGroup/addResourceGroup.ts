import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertResourceGroup {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertResourceGroupShow(): void {
        const newObserver = new ReplaySubject();
        let resourecGroupAddText = null;
        let ok = null;
        this.translate
            .get("RESOURCEGROUP.RESOURCEGROUPADDED")
            .subscribe((translation: string) => {
                resourecGroupAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("RESOURCEGROUP.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (resourecGroupAddText && ok) {
                this._matSnackBar.open(resourecGroupAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertResourceGroup;
