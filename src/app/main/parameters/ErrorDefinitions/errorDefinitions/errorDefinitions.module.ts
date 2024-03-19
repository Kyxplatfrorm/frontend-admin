import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ErrorDefinitionsComponent } from "./errorDefinitions.component";
import { FuseWidgetModule } from "@fuse/components";
import { ErrorDefinitionsService } from "./errorDefinitions.service";
import { TranslateModule } from "@ngx-translate/core";
import { MatMenu, MatMenuModule } from "@angular/material/menu";

const routes = [
    {
        path: "Parameters/ErrorDefinitions/errorDefinitions",
        component: ErrorDefinitionsComponent,
        resolve: {
            data: ErrorDefinitionsService,
        },
    },
];
@NgModule({
    declarations: [ErrorDefinitionsComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatMenuModule,
        TranslateModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NgxDatatableModule,
        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers: [ErrorDefinitionsService],
})
export class ErrorDefinitionsModule {}
