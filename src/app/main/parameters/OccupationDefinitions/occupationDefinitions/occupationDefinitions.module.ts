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
import { OccupationDefinitionsComponent } from "./occupationDefinitions.component";
import { OccupationDefinitionsService } from "./occupationDefinitions.service";

const routes = [
    {
        path: "Parameters/OccupationDefinitions/occupationDefinitions",
        component: OccupationDefinitionsComponent,
        resolve: {
            data: OccupationDefinitionsService,
        },
    },
];

@NgModule({
    declarations: [OccupationDefinitionsComponent],
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
    ],
    providers: [OccupationDefinitionsService],
})
export class OccupationDefinitionsModule {}
