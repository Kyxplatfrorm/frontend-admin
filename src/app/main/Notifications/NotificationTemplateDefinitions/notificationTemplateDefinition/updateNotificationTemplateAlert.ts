import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertNotificationTemplate {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertNotificationTemplateShow(): void {
        const newObserver = new ReplaySubject();
        let notificationTemplateSaveText = null;
        let ok = null;
        this.translate
            .get("NOTIFICATIONTEMPLATE.NOTIFICATIONTEMPLATESAVED")
            .subscribe((translation: string) => {
                notificationTemplateSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("NOTIFICATIONTEMPLATE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (notificationTemplateSaveText && ok) {
                this._matSnackBar.open(notificationTemplateSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertNotificationTemplate;
