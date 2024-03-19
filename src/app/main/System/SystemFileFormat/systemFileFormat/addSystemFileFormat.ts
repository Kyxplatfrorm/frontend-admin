import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddSystemFileFormatAlert {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddSystemFileFormatShow(): void {
        const newObserver = new ReplaySubject();
        let systemFileFormatAddText = null;
        let ok = null;
        this.translate
            .get("SYSTEMFILEFORMAT.SYSTEMFILEFORMATADDED")
            .subscribe((translation: string) => {
                systemFileFormatAddText = translation;
                newObserver.next();
            });
        this.translate.get("SYSTEMFILEFORMAT.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (systemFileFormatAddText && ok) {
                this._matSnackBar.open(systemFileFormatAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddSystemFileFormatAlert;
