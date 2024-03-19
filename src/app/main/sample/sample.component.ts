import { Component } from "@angular/core";
import { AuthenticationService } from "@fuse/services";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "sample",
    templateUrl: "./sample.component.html",
    styleUrls: ["./sample.component.scss"],
})
export class SampleComponent {
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private authenticationService: AuthenticationService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    ngOnInit(): void {
        this.authenticationService.GetVerifySession();
    }
}
