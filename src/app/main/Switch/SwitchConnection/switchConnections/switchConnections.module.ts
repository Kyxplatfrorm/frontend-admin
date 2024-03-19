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
import { SwitchConnectionsComponent } from "./switchConnections.component";
import { SwitchConnectionsService } from "./switchConnections.service";

const routes = [
    {
        path: "Switch/SwitchConnection/switchConnections",
        component: SwitchConnectionsComponent,
        resolve: {
            data: SwitchConnectionsService,
        },
    },
];
@NgModule({
    declarations: [SwitchConnectionsComponent],
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
    providers: [SwitchConnectionsService],
})
export class SwitchConnectionsModule {}
