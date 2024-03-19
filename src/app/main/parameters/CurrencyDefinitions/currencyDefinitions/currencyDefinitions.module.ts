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
import { CurrencyDefinitionsComponent } from "./currencyDefinitions.component";
import { CurrencyDefinitionsService } from "./currencyDefinitions.service";

const routes = [
    {
        path: "Parameters/CurrencyDefinitions/currencyDefinitions",
        component: CurrencyDefinitionsComponent,
        resolve: {
            data: CurrencyDefinitionsService,
        },
    },
];

@NgModule({
    declarations: [CurrencyDefinitionsComponent],
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
    providers: [CurrencyDefinitionsService],
})
export class CurrencyDefinitionsModule {}
