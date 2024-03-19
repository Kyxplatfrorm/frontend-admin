import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthenticationService } from "@fuse/services";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseSplashScreenService } from "@fuse/services/splash-screen.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { navigation } from "app/navigation/navigation";
import { locale as navigationEnglish } from "app/navigation/i18n/en";
import { locale as navigationTurkish } from "app/navigation/i18n/tr";
import { SettingsService } from "./settings.service";
import { User } from "./ui";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    currentUser: User;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private router: Router,
        private authenticationService: AuthenticationService,
        private settingsService: SettingsService
    ) {
        if (this.authenticationService.currentUser != undefined) {
            this.authenticationService.currentUser.subscribe(
                (x) => (this.currentUser = x)
            );
        }

        this.navigation = navigation;

        this._fuseNavigationService.register("main", this.navigation);

        this._fuseNavigationService.setCurrentNavigation("main");

        this._translateService.addLangs(["en", "tr"]);

        this._translateService.setDefaultLang("tr");

        this._fuseTranslationLoaderService.loadTranslations(
            navigationEnglish,
            navigationTurkish
        );

        var lang = localStorage.getItem("currentLanguage");
        if (lang === "" || lang === null) {
            lang = "en";
        }
        this._translateService.use(lang);

        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add("is-mobile");
        }

        this._unsubscribeAll = new Subject();

        this.authenticationService.GetVerifySession();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;

                if (this.fuseConfig.layout.width === "boxed") {
                    this.document.body.classList.add("boxed");
                } else {
                    this.document.body.classList.remove("boxed");
                }

                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith("theme-")) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
