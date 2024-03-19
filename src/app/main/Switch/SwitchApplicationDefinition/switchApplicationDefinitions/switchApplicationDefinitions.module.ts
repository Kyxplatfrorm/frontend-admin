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
import { SwitchApplicationDefinitionsService } from "./switchApplicationDefinitions.service";
import { SwitchApplicationDefinitionsComponent } from "./switchApplicationDefinitions.component";

const routes = [
    {
        path: "Switch/SwitchApplicationDefinition/switchApplicationDefinitions",
        component: SwitchApplicationDefinitionsComponent,
        resolve: {
            data: SwitchApplicationDefinitionsService,
        },
    },
];

@NgModule({
    declarations: [SwitchApplicationDefinitionsComponent],
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
    providers: [SwitchApplicationDefinitionsService],
})
export class SwitchApplicationDefinitionsModule {}
