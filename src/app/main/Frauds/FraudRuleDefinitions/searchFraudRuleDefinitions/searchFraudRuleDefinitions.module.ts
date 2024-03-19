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
import { SearchFraudRuleDefinitionsComponent } from "./searchFraudRuleDefinitions.component";
import { SearchFraudRuleDefinitionsService } from "./searchFraudRuleDefinitions.service";

const routes = [
    {
        path: "Frauds/FraudRuleDefinitions/searchFraudRuleDefinitions",
        component: SearchFraudRuleDefinitionsComponent,
        resolve: {
            data: SearchFraudRuleDefinitionsService,
        },
    },
];

@NgModule({
    declarations: [SearchFraudRuleDefinitionsComponent],
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
    providers: [SearchFraudRuleDefinitionsService],
})
export class SearchFraudRuleDefinitionsModule {}
