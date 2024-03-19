import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertOccupation {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertOccupationShow(): void {
        const newObserver = new ReplaySubject();
        let occupationDetailSaveText = null;
        let ok = null;
        this.translate
            .get("OCCUPATION.OCCUPATIONSAVED")
            .subscribe((translation: string) => {
                occupationDetailSaveText = translation;
                newObserver.next();
            });
        this.translate.get("OCCUPATION.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (occupationDetailSaveText && ok) {
                this._matSnackBar.open(occupationDetailSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertOccupation;
