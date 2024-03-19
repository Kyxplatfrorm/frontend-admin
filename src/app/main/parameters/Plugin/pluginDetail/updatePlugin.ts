import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UpdateAlertPlugin {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    UpdateAlertPluginShow(): void {
        const newObserver = new ReplaySubject();
        let pluginDetailSaveText = null;
        let ok = null;
        this.translate
            .get("PLUGIN.PLUGINSAVED")
            .subscribe((translation: string) => {
                pluginDetailSaveText = translation;
                newObserver.next();
            });
        this.translate.get("PLUGIN.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (pluginDetailSaveText && ok) {
                this._matSnackBar.open(pluginDetailSaveText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default UpdateAlertPlugin;
