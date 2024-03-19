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
import { SwitchApplicationDefinitionService } from "./switchApplicationDefinition.service";
import { SwitchApplicationDefinitionComponent } from "./switchApplicationDefinition.component";
import AddAlertSwitchAppDefinition from "./addSwitchAppDefinitionAlert";
import UpdateAlertSwitchApplicationDefinition from "./updateSwitchAppDefinitionAlert";
import { HsmConnectionFormDialogComponent } from "./hsmConnectionForm/hsmConnectionForm.component";
import { SessionListFormDialogComponent } from "./sessionListForm/sessionListForm.component";
import { RoutingFormDialogComponent } from "./routingForm/routingForm.component";
import { SessionConfigFormDialogComponent } from "./sessionConfigForm/sessionConfigForm.component";
import { SessionConnectionFormDialogComponent } from "./sessionConnectionForm/sessionConnectionForm.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

const routes = [
    {
        path: "switchApplicationDefinitions/:id",
        component: SwitchApplicationDefinitionComponent,
        resolve: {
            data: SwitchApplicationDefinitionService,
        },
    },
];

@NgModule({
    declarations: [
        SwitchApplicationDefinitionComponent,
        HsmConnectionFormDialogComponent,
        SessionListFormDialogComponent,
        RoutingFormDialogComponent,
        SessionConfigFormDialogComponent,
        SessionConnectionFormDialogComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
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
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        SwitchApplicationDefinitionService,
        AddAlertSwitchAppDefinition,
        UpdateAlertSwitchApplicationDefinition,
    ],
    entryComponents: [
        HsmConnectionFormDialogComponent,
        SessionListFormDialogComponent,
        RoutingFormDialogComponent,
        SessionConfigFormDialogComponent,
        SessionConnectionFormDialogComponent,
    ],
})
export class SwitchApplicationDefinitionModule {}
