import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AddAlertPlugin {
    constructor(
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    AddAlertPluginShow(): void {
        const newObserver = new ReplaySubject();
        let pluginDetailAddText = null;
        let ok = null;
        this.translate
            .get("PLUGIN.PLUGINADDED")
            .subscribe((translation: string) => {
                pluginDetailAddText = translation;
                newObserver.next();
            });
        this.translate.get("PLUGIN.OK").subscribe((translation: string) => {
            ok = translation;
            newObserver.next();
        });
        newObserver.subscribe(() => {
            if (pluginDetailAddText && ok) {
                this._matSnackBar.open(pluginDetailAddText, ok, {
                    verticalPosition: "top",
                    duration: 2000,
                });
            }
        });
    }
}

export default AddAlertPlugin;
