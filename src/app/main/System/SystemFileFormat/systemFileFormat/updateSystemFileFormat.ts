import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateSystemFileFormatAlert {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateSystemFileFormatAlertShow(): void {
        const newObserver = new ReplaySubject();
        let systemFileFormatSaveText = null;
        let ok = null;
        this.translate
            .get("SYSTEMFILEFORMAT.SYSTEMFILEFORMATSAVED")
            .subscribe((translation: string) => {
                systemFileFormatSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("SYSTEMFILEFORMAT.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (systemFileFormatSaveText && ok) {
                this._matSnackBar.open(systemFileFormatSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateSystemFileFormatAlert;
