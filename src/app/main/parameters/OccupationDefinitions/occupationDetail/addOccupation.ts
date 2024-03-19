import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertOccupation {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertOccupationShow(): void {
        const newObserver = new ReplaySubject();
        let occupationDetailAddText = null;
        let ok = null;
        this.translate
            .get("OCCUPATION.OCCUPATIONADDED")
            .subscribe((translation: string) => {
                occupationDetailAddText = translation;
                newObserver.next();
            });
        this.translate.get("OCCUPATION.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (occupationDetailAddText && ok) {
                this._matSnackBar.open(occupationDetailAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertOccupation;
