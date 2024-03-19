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
import { TenantCurrencyModule } from "./TenantCurrencyProfile/tenantCurrency/tenantCurrency.module";
import { TenantCurrencyProfilesModule } from "./TenantCurrencyProfile/tenantCurrencyProfiles/tenantCurrencyProfiles.module";
import { TenantDefinitionsModule } from "./TenantDefinitions/tenantDefinitions/tenantDefinitions.module";
import { TenantDetailModule } from "./TenantDefinitions/tenantDetail/tenantDetail.module";
import { TenantCardSchemaModule } from "./TenantCardSchemaProfile/tenantCardSchema/tenantCardSchema.module";
import { TenantCardSchemaProfilesModule } from "./TenantCardSchemaProfile/tenantCardSchemaProfiles/tenantCardSchemaProfiles.module";
import { TenantCountryModule } from "./TenantCountryProfile/tenantCountry/tenantCountry.module";
import { TenantCountryProfilesModule } from "./TenantCountryProfile/tenantCountryProfiles/tenantCountryProfiles.module";
import { TenantRestrictionProfilesModule } from "./TenantRestrictionProfile/tenantRestrictionProfiles/tenantRestrictionProfiles.module";
import { TenantRestrictionProfileModule } from "./TenantRestrictionProfile/tenantRestrictionProfile/tenantRestrictionProfile.module";
import { TenantLimitProfilesModule } from "./TenantLimitProfile/tenantLimitProfiles/tenantLimitProfiles.module";
import { TenantLimitProfileModule } from "./TenantLimitProfile/tenantLimitProfile/tenantLimitProfile.module";
import { TenantCardAuthorizationProfilesModule } from "./TenantCardAuthorizationProfile/tenantCardAuthorizationProfiles/tenantCardAuthorizationProfiles.module";
import { TenantCardAuthorizationProfileModule } from "./TenantCardAuthorizationProfile/tenantCardAuthorizationProfile/tenantCardAuthorizationProfile.module";

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
        TenantCurrencyModule,
        TenantCurrencyProfilesModule,
        TenantDefinitionsModule,
        TenantDetailModule,
        TenantCardSchemaModule,
        TenantCardSchemaProfilesModule,
        TenantCountryModule,
        TenantCountryProfilesModule,
        TenantRestrictionProfilesModule,
        TenantRestrictionProfileModule,
        TenantLimitProfilesModule,
        TenantLimitProfileModule,
        TenantCardAuthorizationProfilesModule,
        TenantCardAuthorizationProfileModule,
    ],
})
export class TenantModule {}
