import { NgModule } from "@angular/core";
import { LoginModule } from "app/main/dashboards/authentication/login/login.module";
import { RegisterModule } from "app/main/dashboards/authentication/register/register.module";
import { OtpVerifyModule } from "../Otp/OtpVerify/otpVerify/otpVerify.module";

@NgModule({
    imports: [
        // AuthenticationE
        LoginModule,
        RegisterModule,
        OtpVerifyModule,
    ],
})
export class DashboardsModule {}
