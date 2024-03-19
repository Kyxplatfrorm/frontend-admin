import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/internal/Observable";

export interface Locale {
    lang: string;
    data: Object;
}

@Injectable({
    providedIn: "root",
})
export class FuseTranslationLoaderService {
    /**
     * Constructor
     *
     * @param {TranslateService} _translateService
     */
    constructor(private _translateService: TranslateService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Load translations
     *
     * @param {Locale} args
     */
    loadTranslations(...args: Locale[]): void {
        const locales = [...args];

        locales.forEach((locale) => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            this._translateService.setTranslation(
                locale.lang,
                locale.data,
                true
            );
        });
    }

    getTranslation(lang: string): Observable<any> {
        return this._translateService.get(lang);
    }
    getConfirmMessageText(lang: string): Observable<any> {
        return this._translateService.get(lang);
    }
}
