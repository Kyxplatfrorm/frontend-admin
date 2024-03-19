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
import { TenantCountryProfilesComponent } from "./tenantCountryProfiles.component";
import { TenantCountryProfilesService } from "./tenantCountryProfiles.service";
import { TenantCountryProfileFormDialogComponent } from "./tenantCountryProfileForm/tenantCountryProfileForm.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";

const routes = [
    {
        path: "tenantCountry/:id",
        component: TenantCountryProfilesComponent,
        resolve: {
            data: TenantCountryProfilesService,
        },
    },
];

@NgModule({
    declarations: [
        TenantCountryProfilesComponent,
        TenantCountryProfileFormDialogComponent,
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
    providers: [TenantCountryProfilesService],
    entryComponents: [TenantCountryProfileFormDialogComponent],
})
export class TenantCountryProfilesModule {}
