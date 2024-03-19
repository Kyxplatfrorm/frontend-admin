import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertSubMenu {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertSubMenuShow(): void {
        const newObserver = new ReplaySubject();
        let menuSaveText = null;
        let ok = null;
        this.translate
            .get("MENU.MENUSAVED")
            .subscribe((translation: string) => {
                menuSaveText = translation;
                newObserver.next();
            });
        this.translate.get("MENU.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (menuSaveText && ok) {
                this._matSnackBar.open(menuSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertSubMenu;
