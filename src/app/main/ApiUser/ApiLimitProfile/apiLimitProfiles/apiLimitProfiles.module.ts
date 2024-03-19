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
import { ApiLimitProfilesComponent } from "./apiLimitProfiles.component";
import { ApiLimitProfilesService } from "./apiLimitProfiles.service";

const routes = [
    {
        path: "ApiUser/ApiLimitProfile/apiLimitProfiles",
        component: ApiLimitProfilesComponent,
        resolve: {
            data: ApiLimitProfilesService,
        },
    },
];
@NgModule({
    declarations: [ApiLimitProfilesComponent],
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
    providers: [ApiLimitProfilesService],
})
export class ApiLimitProfilesModule {}
