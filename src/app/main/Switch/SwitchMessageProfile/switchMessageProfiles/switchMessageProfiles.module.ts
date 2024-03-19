import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
    FuseConfirmDialogModule,
    FuseSidebarModule,
    FuseWidgetModule,
} from "@fuse/components";
import { TranslateModule } from "@ngx-translate/core";
import { MatMenuModule } from "@angular/material/menu";
import { SwitchMessageProfilesComponent } from "./switchMessageProfiles.component";
import { SwitchMessageProfilesService } from "./switchMessageProfiles.service";
import { SwitchMessageFormDialogComponent } from "./switchMessageProfileForm/switchMessageProfileForm.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatRippleModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import AddAlertSwitchMessage from "./addSwitchMesaageAlert";
import UpdateAlertSwitchMessage from "./updateSwitchMessageAlert";

const routes = [
    {
        path: "switchCardNetworks/:id",
        component: SwitchMessageProfilesComponent,
        resolve: {
            data: SwitchMessageProfilesService,
        },
    },
];

@NgModule({
    declarations: [
        SwitchMessageProfilesComponent,
        SwitchMessageFormDialogComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        TranslateModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NgxDatatableModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatMenuModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        FuseConfirmDialogModule,
        NgxChartsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        FuseSidebarModule,
    ],
    providers: [
        SwitchMessageProfilesService,
        AddAlertSwitchMessage,
        UpdateAlertSwitchMessage,
    ],
    entryComponents: [SwitchMessageFormDialogComponent],
})
export class SwitchMessageProfilesModule {}
