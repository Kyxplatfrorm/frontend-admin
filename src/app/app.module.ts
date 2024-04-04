import { APP_INITIALIZER, inject, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { JwtInterceptor, ErrorInterceptor, AuthGuard } from "./_helpers";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";
import { fuseConfig } from "app/fuse-config";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/sample/sample.module";
import { DashboardsModule } from "app/main/dashboards/dashboards.module";
import { AuthenticationService } from "@fuse/services";
import { ParametersModule } from "./main/Parameters/parameters.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserDetailModule } from "./main/UserProfiles/userProfileDetail/userProfileDetail.module";
import { AlertSnackBar } from "./_helpers/AlertSnackbar";
import { UserProfileModule } from "app/main/UserProfiles/userProfile.module";
import { SystemModule } from "app/main/System/system.module";
import { ApplicationModule } from "app/main/Application/application.module";
import { environment } from "environments/environment";
import { SettingsService } from "./settings.service";
import { tap } from "rxjs/operators";
import { SwitchModule } from "app/main/Switch/switch.module";
import { HsmUtilityModule } from "./main/HsmUtility/hsmUtility.module";
import { UtilityModule } from "app/main/Utility/utility.module";
import { SwitchReportModule } from "app/main/SwitchReport/switchReport.module";
import { ApiUserModule } from "app/main/ApiUser/apiUser.module";
import { PasswordChangeModule } from "./main/Password/PasswordChange/passwordChange/passwordChange.module";
import { TenantModule } from "app/main/Tenant/tenant.module";
import { NotificationModule } from "app/main/Notifications/notification.module";
import { SchedulerModule } from "app/main/Scheduler/scheduler.module";
import { FraudsModule } from "app/main/Frauds/frauds.module";
import { WebHookModule } from "app/main/WebHook/webHook.module";
import { ReportModule } from "app/main/Report/report.module";
import { CustomerModule } from "app/main/Customer/customer.module";
import { CardModule } from "app/main/Card/card.module";

const appRoutes: Routes = [
    {
        path: "main/dashboards",
        loadChildren: () =>
            import("app/main/dashboards/dashboards.module").then(
                (m) => m.DashboardsModule
            ),
    },
    {
        path: "Parameters",
        loadChildren: () =>
            import("app/main/Parameters/parameters.module").then(
                (m) => m.ParametersModule
            ),
    },
    {
        path: "UserProfiles",
        loadChildren: () =>
            import("app/main/UserProfiles/userProfile.module").then(
                (m) => m.UserProfileModule
            ),
    },
    {
        path: "Tenant",
        loadChildren: () =>
            import("app/main/Tenant/tenant.module").then((m) => m.TenantModule),
    },
    {
        path: "Application",
        loadChildren: () =>
            import("app/main/Application/application.module").then(
                (m) => m.ApplicationModule
            ),
    },

    {
        path: "Report",
        loadChildren: () =>
            import("app/main/Report/report.module").then((m) => m.ReportModule),
    },

    {
        path: "Customer",
        loadChildren: () =>
            import("app/main/Customer/customer.module").then(
                (m) => m.CustomerModule
            ),
    },

    {
        path: "Card",
        loadChildren: () =>
            import("app/main/Card/card.module").then((m) => m.CardModule),
    },

    {
        path: "Utility",
        loadChildren: () =>
            import("app/main/Utility/utility.module").then(
                (m) => m.UtilityModule
            ),
    },
    {
        path: "System",
        loadChildren: () =>
            import("app/main/System/system.module").then((m) => m.SystemModule),
    },
    {
        path: "Switch",
        loadChildren: () =>
            import("app/main/Switch/switch.module").then((m) => m.SwitchModule),
    },

    {
        path: "HsmUtility",
        loadChildren: () =>
            import("app/main/HsmUtility/hsmUtility.module").then(
                (m) => m.HsmUtilityModule
            ),
    },
    {
        path: "SwitchReport",
        loadChildren: () =>
            import("app/main/SwitchReport/switchReport.module").then(
                (m) => m.SwitchReportModule
            ),
    },

    {
        path: "ApiUser",
        loadChildren: () =>
            import("app/main/ApiUser/apiUser.module").then(
                (m) => m.ApiUserModule
            ),
    },

    {
        path: "Notification",
        loadChildren: () =>
            import("app/main/Notifications/notification.module").then(
                (m) => m.NotificationModule
            ),
    },

    {
        path: "Scheduler",
        loadChildren: () =>
            import("app/main/Scheduler/scheduler.module").then(
                (m) => m.SchedulerModule
            ),
    },

    {
        path: "Frauds",
        loadChildren: () =>
            import("app/main/Frauds/frauds.module").then((m) => m.FraudsModule),
    },

    {
        path: "WebHook",
        loadChildren: () =>
            import("app/main/WebHook/webHook.module").then(
                (m) => m.WebHookModule
            ),
    },

    {
        path: "**",
        redirectTo: "auth/login",
        pathMatch: "full",
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: "legacy" }),
        TranslateModule.forRoot(),
        MatMomentDateModule,
        MatButtonModule,
        MatIconModule,
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        LayoutModule,
        SampleModule,
        DashboardsModule,
        ParametersModule,
        UserProfileModule,
        UserDetailModule,
        UtilityModule,
        SystemModule,
        ApplicationModule,
        SwitchModule,
        HsmUtilityModule,
        SwitchReportModule,
        ApiUserModule,
        PasswordChangeModule,
        TenantModule,
        NotificationModule,
        SchedulerModule,
        FraudsModule,
        WebHookModule,
        ReportModule,
        CustomerModule,
        CardModule,
    ],
    providers: [
        AuthenticationService,
        AlertSnackBar,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: APP_INITIALIZER,
            useFactory: (
                http: HttpClient,
                settingsService: SettingsService
            ) => {
                return () =>
                    new Promise<void>((resolve) => {
                        http.get("/assets/config.json")
                            .pipe(
                                tap((data: any) => {
                                    settingsService.ApiUrl = data.ApiUrl;
                                    environment.apiUrl = data.ApiUrl;
                                })
                            )
                            .subscribe(() => {
                                resolve();
                            });
                    });
            },
            multi: true,
            deps: [HttpClient, SettingsService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
