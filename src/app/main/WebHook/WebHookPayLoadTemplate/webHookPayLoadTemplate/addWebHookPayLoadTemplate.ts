import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertWebHookPayLoadTemplate {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertWebHookPayLoadTemplateShow(): void {
        const newObserver = new ReplaySubject();
        let webHookPayLoadTemplateAddText = null;
        let ok = null;
        this.translate
            .get("WEBHOOKPAYLOADTEMPLATE.WEBHOOKPAYLOADTEMPLATEADDED")
            .subscribe((translation: string) => {
                webHookPayLoadTemplateAddText = translation;
                newObserver.next();
            });
        this.translate
            .get("WEBHOOKPAYLOADTEMPLATE.OK")
            .subscribe((translation: string) => {
                ok = translation;
                newObserver.next();
            });
        newObserver.subscribe(() => {
            if (webHookPayLoadTemplateAddText && ok) {
                this._matSnackBar.open(webHookPayLoadTemplateAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertWebHookPayLoadTemplate;
