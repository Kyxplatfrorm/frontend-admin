import { ApplicationModule, NgModule } from "@angular/core";
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
import { CityModule } from "./CityDefinitions/city/city.module";
import { CountryModule } from "./CityDefinitions/country/country.module";
import { CountyModule } from "./CityDefinitions/county/county.module";
import { CountryDefinitionsModule } from "./CountryDefinitions/countryDefinitions/countryDefinitions.module";
import { StateDefinitionsModule } from "./CountryDefinitions/stateDefinitions/stateDefinitions.module";
import { CurrencyDefinitionsModule } from "./CurrencyDefinitions/currencyDefinitions/currencyDefinitions.module";
import { CurrencyDetailModule } from "./CurrencyDefinitions/currencyDetail/currencyDetail.module";
import { ErrorDefinitionsModule } from "./ErrorDefinitions/errorDefinitions/errorDefinitions.module";
import { ResourceDefinitionModule } from "./ErrorDefinitions/resourceDefinition/resourceDefinition.module";
import { GenericConfigModule } from "./GenericConfig/genericConfig/genericConfig.module";
import { GenericConfigGroupsModule } from "./GenericConfig/genericConfigGroups/genericConfigGroups.module";
import { GenericParameterModule } from "./GenericParameter/genericParameterGroup/genericParameter.module";
import { GenericParameterGroupsModule } from "./GenericParameter/genericParameterGroups/genericParameterGroups.module";
import { JsonConfigDetailModule } from "./JsonConfig/jsonConfigDetail/jsonConfigDetail.module";
import { JsonConfigModule } from "./JsonConfig/jsonConfigs/jsonConfigs.module";
import { OccupationDefinitionsModule } from "./OccupationDefinitions/occupationDefinitions/occupationDefinitions.module";
import { OccupationDetailModule } from "./OccupationDefinitions/occupationDetail/occupationDetail.module";
import { PluginDetailModule } from "./Plugin/pluginDetail/pluginDetail.module";
import { PluginModule } from "./Plugin/plugins/plugins.module";
import { ResourceGroupModule } from "./Resource/resourceGroup/resourceGroup.module";
import { ResourceGroupsModule } from "./Resource/resourceGroups/resourceGroups.module";
import { ProductsModule } from "./Product/products/products.module";
import { ProductModule } from "./Product/product/product.module";
import { EnvironmentDefinitionsModule } from "./EnvironmentDefinitions/environmentDefinitions/environmentDefinitions.module";
import { ApplicationUrlDefinitionsModule } from "./ApplicationUrlDefinitions/applicationUrlDefinitions/applicationUrlDefinitions.module";
import { SearchApplicationUrlDefinitionsModule } from "./ApplicationUrlDefinitions/searchApplicationUrlDefinitions/searchApplicationUrlDefinitions.module";
import { ApplicationUrlDefinitionModule } from "./ApplicationUrlDefinitions/applicationUrlDefinition/applicationUrlDefinition.module";

@NgModule({
    imports: [
        ResourceDefinitionModule,
        ErrorDefinitionsModule,
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
        CurrencyDefinitionsModule,
        CurrencyDetailModule,
        OccupationDefinitionsModule,
        OccupationDetailModule,
        CountryDefinitionsModule,
        CountryDefinitionsModule,
        CountryModule,
        CityModule,
        CountyModule,
        GenericConfigGroupsModule,
        GenericConfigModule,
        JsonConfigModule,
        JsonConfigDetailModule,
        PluginModule,
        PluginDetailModule,
        ResourceGroupsModule,
        ResourceGroupModule,
        StateDefinitionsModule,
        GenericParameterGroupsModule,
        GenericParameterModule,
        ProductsModule,
        ProductModule,
        EnvironmentDefinitionsModule,
        ApplicationUrlDefinitionsModule,
        SearchApplicationUrlDefinitionsModule,
        ApplicationUrlDefinitionModule,
    ],
})
export class ParametersModule {}
