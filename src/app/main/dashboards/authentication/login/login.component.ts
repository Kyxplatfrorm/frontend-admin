import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "@fuse/services";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { fuseAnimations } from "@fuse/animations";
import { TranslateService } from "@ngx-translate/core";
import { locale as english } from "app/main/dashboards/authentication/login/i18n/en";
import { locale as turkish } from "app/main/dashboards/authentication/login/i18n/tr";
import * as _ from "lodash";
import * as alertifyjs from "alertifyjs";

@Component({
    selector: "auth/login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    [x: string]: any;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    languages: any;
    selectedLanguage: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {TranslateService} _translateService
     * @param lang;
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     *
     */

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _translateService: TranslateService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
        this.languages = [
            {
                id: "en",
                title: "English",
                flag: "us",
            },
            {
                id: "tr",
                title: "Turkish",
                flag: "tr",
            },
        ];
    }
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
        this.returnUrl =
            this.route.snapshot.queryParams["returnUrl"] || "main/dashboards";
        this.selectedLanguage = _.find(this.languages, {
            id: this._translateService.currentLang,
        });
    }

    ngAfterViewInit(): void {
        var langId = localStorage.getItem("currentLanguage");
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService
            .login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe((data) => {
                if (
                    this.authenticationService.currentUserValue
                        .ForceTwoFormFactor == true
                ) {
                    this.router.navigate(["Otp/OtpVerify/otpVerify"]);
                } else if (
                    this.authenticationService.currentUserValue
                        .ForceToChangePassword == true
                )
                    this.router.navigate([
                        "Password/PasswordChange/passwordChange",
                    ]);
                else {
                    this.router.navigate(["main/dashboards"]);
                    alertifyjs.success(data.ErrorDescription);
                }
            });
    }

    setLanguage(lang): void {
        this.selectedLanguage = lang;
        this._translateService.use(lang.id);
        localStorage.setItem("currentLanguage", lang.id);
    }
}
