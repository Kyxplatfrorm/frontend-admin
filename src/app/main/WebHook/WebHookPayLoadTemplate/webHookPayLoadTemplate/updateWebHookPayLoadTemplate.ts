import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertWebHookPayLoadTemplate {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertWebHookPayLoadTemplateShow(): void {
        const newObserver = new ReplaySubject();
        let webHookPayLoadTemplateSaveText = null;
        let ok = null;
        this.translate
            .get("WEBHOOKPAYLOADTEMPLATE.WEBHOOKPAYLOADTEMPLATESAVED")
            .subscribe((translation: string) => {
                webHookPayLoadTemplateSaveText = translation;
                newObserver.next();
            });
        this.translate
            .get("WEBHOOKPAYLOADTEMPLATE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (webHookPayLoadTemplateSaveText && ok) {
                this._matSnackBar.open(webHookPayLoadTemplateSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertWebHookPayLoadTemplate;
