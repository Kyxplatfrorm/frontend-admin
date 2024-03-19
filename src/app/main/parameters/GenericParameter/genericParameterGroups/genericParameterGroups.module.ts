import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FuseWidgetModule } from "@fuse/components";
import { TranslateModule } from "@ngx-translate/core";
import { MatMenuModule } from "@angular/material/menu";
import { GenericParameterGroupsComponent } from "./genericParameterGroups.component";
import { GenericParameterGroupsService } from "./genericParameterGroups.service";

const routes = [
    {
        path: "Parameters/GenericParameter/genericParameterGroups",
        component: GenericParameterGroupsComponent,
        resolve: {
            data: GenericParameterGroupsService,
        },
    },
];
@NgModule({
    declarations: [GenericParameterGroupsComponent],
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
    providers: [GenericParameterGroupsService],
})
export class GenericParameterGroupsModule {}
