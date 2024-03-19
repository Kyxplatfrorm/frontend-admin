import { Component, ViewEncapsulation } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { AuthenticationService } from "@fuse/services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { OtpVerifyLoginService } from "./otpVerify.service";
import { OtpVerifyLogin } from "./otpVerify.model";

@Component({
    selector: "otpVerify",
    templateUrl: "./otpVerify.component.html",
    styleUrls: ["./otpVerify.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class OtpVerifyComponent {
    currentUserLogin: any;
    otpVerifyForm: FormGroup;
    forceToChangePassword: boolean;
    otpVerifyLogin: OtpVerifyLogin;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private authenticationService: AuthenticationService,
        private _formBuilder: FormBuilder,
        private otpVerifyLoginService: OtpVerifyLoginService,
        private router: Router
    ) {
        // Configure the layout
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
    }

    ngOnInit(): void {
        this.otpVerifyForm = this._formBuilder.group({
            Otp: ["", Validators.required],
        });
        this.currentUserLogin = this.authenticationService.currentUserValue;
        const codes = document.querySelectorAll<HTMLInputElement>(".code");
        codes[0].focus();
        codes.forEach((code, idx) => {
            code.addEventListener("keydown", (e) => {
                if (e.key >= "0" && e.key <= "9") {
                    codes[idx].value = "";
                    setTimeout(() => codes[idx + 1]?.focus(), 10);
                } else if (e.key === "Backspace") {
                    setTimeout(() => codes[idx - 1]?.focus(), 10);
                }
            });
        });
    }

    OtpVerify() {
        const otpInputs = document.querySelectorAll<HTMLInputElement>(".code");
        let otpValue = "";

        otpInputs.forEach((input) => {
            const digit = input.value.trim();
            otpValue += digit;
        });

        const otpVerifyData: OtpVerifyLogin = {
            Otp: otpValue,
            OtpId: this.authenticationService.currentUserValue.OtpId,
        };

        this.otpVerifyLoginService
            .VerifyLoginOtp(otpVerifyData)
            .then((response) => {
                if (
                    this.authenticationService.currentUserValue
                        .ForceToChangePassword == true
                ) {
                    this.router.navigate([
                        "Password/PasswordChange/passwordChange",
                    ]);
                } else {
                    this.router.navigate(["main/dashboards"]);
                }
            });
    }
}
