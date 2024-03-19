import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { FuseSharedModule } from "@fuse/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { PasswordChangeComponent } from "./passwordChange.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
    FuseConfirmDialogModule,
    FuseSidebarModule,
    FuseWidgetModule,
} from "@fuse/components";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import { PasswordChangeService } from "./passwordChange.service";

const routes = [
    {
        path: "Password/PasswordChange/passwordChange",
        component: PasswordChangeComponent,
        resolve: {
            data: PasswordChangeService,
        },
    },
];

@NgModule({
    declarations: [PasswordChangeComponent],
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
        MatChipsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        FuseConfirmDialogModule,
        NgxChartsModule,
        FuseWidgetModule,
        FuseSidebarModule,
        BrowserAnimationsModule,
    ],
    providers: [PasswordChangeService],
})
export class PasswordChangeModule {}
