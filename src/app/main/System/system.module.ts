import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { FuseWidgetModule } from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { QueryModule } from "./system/query/query.module";
import { QuerysModule } from "./system/querys/querys.module";
import { SearchQueryModule } from "./system/searchQuery/searchQuery.module";
import { SystemRestrictionProfileModule } from "./SystemRestrictionProfile/systemRestrictionProfile/systemRestrictionProfile.module";
import { SystemKeyDefinitionsModule } from "./SystemKeyDefinition/systemKeyDefinitions/systemKeyDefinitions.module";
import { SearchSystemKeyDefinitionModule } from "./SystemKeyDefinition/searchSystemDefinition/searchSystemDefinition.module";
import { SystemKeyDefinitionModule } from "./SystemKeyDefinition/systemKeyDefinition/systemKeyDefinition.module";
import { SystemFileFormatsModule } from "./SystemFileFormat/systemFileFormats/systemFileFormats.module";
import { SearchSystemFileFormatModule } from "./SystemFileFormat/searchSystemFileFormat/searchSystemFileFormat.module";
import { SystemFileFormatModule } from "./SystemFileFormat/systemFileFormat/systemFileFormat.module";
import { SystemFileInformationsModule } from "./SystemFileInformation/systemFileInformations/systemFileInformations.module";
import { SearchSystemFileInformationModule } from "./SystemFileInformation/searchSystemFileInformation/searchSystemFileInformation.module";
import { SystemFileInformationModule } from "./SystemFileInformation/systemFileInformation/systemFileInformation.module";

@NgModule({
    imports: [
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        NgxChartsModule,
        FuseSharedModule,
        FuseWidgetModule,
        QuerysModule,
        SearchQueryModule,
        QueryModule,
        SystemRestrictionProfileModule,
        SystemKeyDefinitionsModule,
        SearchSystemKeyDefinitionModule,
        SystemKeyDefinitionModule,
        SystemFileFormatsModule,
        SearchSystemFileFormatModule,
        SystemFileFormatModule,
        SystemFileInformationsModule,
        SearchSystemFileInformationModule,
        SystemFileInformationModule,
    ],
})
export class SystemModule {}
