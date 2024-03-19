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
import { SwitchTransactionCodeMapsService } from "./switchTransactionCodeMaps.service";
import { SwitchTransactionCodeMapsComponent } from "./switchTransactionCodeMaps.component";

const routes = [
    {
        path: "Switch/SwitchTransactionCodeMap/switchTransactionCodeMaps",
        component: SwitchTransactionCodeMapsComponent,
        resolve: {
            data: SwitchTransactionCodeMapsService,
        },
    },
];

@NgModule({
    declarations: [SwitchTransactionCodeMapsComponent],
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
    providers: [SwitchTransactionCodeMapsService],
})
export class SwitchTransactionCodeMapsModule {}
