import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertSubMenu {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertSubMenuShow(): void {
        const newObserver = new ReplaySubject();
        let menuAddText = null;
        let ok = null;
        this.translate
            .get("MENU.MENUADDED")
            .subscribe((translation: string) => {
                menuAddText = translation;
                newObserver.next();
            });
        this.translate.get("MENU.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (menuAddText && ok) {
                this._matSnackBar.open(menuAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertSubMenu;
