import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { FuseSharedModule } from "@fuse/shared.module";
import { OtpVerifyComponent } from "./otpVerify.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";

const routes = [
    {
        path: "Otp/OtpVerify/otpVerify",
        component: OtpVerifyComponent,
    },
];

@NgModule({
    declarations: [OtpVerifyComponent],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        FuseSharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        TranslateModule,
        FuseSharedModule,
    ],
})
export class OtpVerifyModule {}
