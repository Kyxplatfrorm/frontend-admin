import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseConfirmDialogModule,
    FuseSidebarModule,
    FuseWidgetModule,
} from "@fuse/components";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { TranslateModule } from "@ngx-translate/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MyProfileComponent } from "./myProfile.component";
import { MyProfileService } from "./myProfile.service";
import { MyProfileFormDialogComponent } from "./myProfileForm/myProfileForm.component";
import { ReactiveFormsModule } from "@angular/forms";
import UpdateAlertMyProfile from "./updateMyProfileAlert";
import ChangePasswordAlertMyProfile from "./changePasswordAlert";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const routes = [
    {
        path: "UserProfiles/User/myProfile",
        component: MyProfileComponent,
        resolve: {
            data: MyProfileService,
        },
    },
];

@NgModule({
    declarations: [MyProfileComponent, MyProfileFormDialogComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        TranslateModule,
        MatTabsModule,
        MatToolbarModule,
        MatMenuModule,
        FuseConfirmDialogModule,
        NgxChartsModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatCheckboxModule,
        MatDatepickerModule,
        FuseSidebarModule,
        BrowserAnimationsModule,
    ],
    providers: [
        MyProfileService,
        UpdateAlertMyProfile,
        ChangePasswordAlertMyProfile,
    ],
    entryComponents: [MyProfileFormDialogComponent],
})
export class MyProfileModule {}
