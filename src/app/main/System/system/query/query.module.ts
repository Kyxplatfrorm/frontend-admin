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
import { ReactiveFormsModule } from "@angular/forms";
import { QueryComponent } from "./query.component";
import { QueryService } from "./query.service";
import AddAlertQuery from "./addAlertQuery";
import UpdateAlertQuery from "./updateAlertQuery";

const routes = [
    {
        path: "searchQuery/:id",
        component: QueryComponent,
        resolve: {
            data: QueryService,
        },
    },
];

@NgModule({
    declarations: [QueryComponent],
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
    ],
    providers: [QueryService, AddAlertQuery, UpdateAlertQuery],
})
export class QueryModule {}