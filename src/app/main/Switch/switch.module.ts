import { NgModule } from "@angular/core";
import { HsmDefinitionModule } from "./HsmDefinition/hsmDefinition/hsmDefinition.module";
import { HsmDefinitionsModule } from "./HsmDefinition/hsmDefinitions/hsmDefinitions.module";
import { HsmServiceDefinitionModule } from "./HsmServiceDefinition/hsmServiceDefinition/hsmServiceDefinition.module";
import { HsmServiceDefinitionsModule } from "./HsmServiceDefinition/hsmServiceDefinitions/hsmServiceDefinitions.module";
import { HsmTransactionReportModule } from "./HsmTransactionReport/hsmTransactionReport/hsmTransactionReport.module";
import { HsmTransactionReportsModule } from "./HsmTransactionReport/hsmTransactionReports/hsmTransactionReports.module";
import { SearchHsmTransactionModule } from "./HsmTransactionReport/searchHsmTransaction/searchHsmTransaction.module";
import { SwitchApplicationDefinitionModule } from "./SwitchApplicationDefinition/switchApplicationDefinition/switchApplicationDefinition.module";
import { SwitchApplicationDefinitionsModule } from "./SwitchApplicationDefinition/switchApplicationDefinitions/switchApplicationDefinitions.module";
import { SwitchConnectionModule } from "./SwitchConnection/switchConnection/switchConnection.module";
import { SwitchConnectionsModule } from "./SwitchConnection/switchConnections/switchConnections.module";
import { SwitchKeyProfileModule } from "./SwitchKeyProfile/switchKeyProfile/switchKeyProfile.module";
import { SwitchKeyProfilesModule } from "./SwitchKeyProfile/switchKeyProfiles/switchKeyProfiles.module";
import { SwitchCardNetworksModule } from "./SwitchMessageProfile/switchCardNetworks/switchCardNetworks.module";
import { SwitchMessageProfilesModule } from "./SwitchMessageProfile/switchMessageProfiles/switchMessageProfiles.module";
import { SwitchTransactionCodeMapsModule } from "./SwitchTransactionCodeMap/switchTransactionCodeMaps/switchTransactionCodeMaps.module";
import { SwitchTransactionCodeMapModule } from "./SwitchTransactionCodeMap/switchTransactionCodeMap/switchTransactionCodeMap.module";

@NgModule({
    imports: [
        HsmDefinitionsModule,
        HsmDefinitionModule,
        HsmServiceDefinitionsModule,
        HsmServiceDefinitionModule,
        SwitchKeyProfilesModule,
        SwitchKeyProfileModule,
        HsmTransactionReportsModule,
        SearchHsmTransactionModule,
        HsmTransactionReportModule,
        SwitchApplicationDefinitionsModule,
        SwitchApplicationDefinitionModule,
        SwitchConnectionsModule,
        SwitchConnectionModule,
        SwitchCardNetworksModule,
        SwitchMessageProfilesModule,
        SwitchTransactionCodeMapsModule,
        SwitchTransactionCodeMapModule,
    ],
})
export class SwitchModule {}
