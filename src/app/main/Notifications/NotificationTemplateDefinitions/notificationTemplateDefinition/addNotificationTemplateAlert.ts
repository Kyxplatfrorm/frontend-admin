import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertNotificationTemplate {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertNotificationTemplateShow(): void {
        const newObserver = new ReplaySubject();
        let notificationTemplateAddText = null;
        let ok = null;
        this.translate
            .get("NOTIFICATIONTEMPLATE.NOTIFICATIONTEMPLATEADDED")
            .subscribe((translation: string) => {
                notificationTemplateAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("NOTIFICATIONTEMPLATE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (notificationTemplateAddText && ok) {
                this._matSnackBar.open(notificationTemplateAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertNotificationTemplate;
