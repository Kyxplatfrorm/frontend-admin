import { NgModule } from "@angular/core";
import { FraudApiDefinitionsModule } from "./FraudApiDefinitions/fraudApiDefinitions/fraudApiDefinitions.module";
import { SearchFraudApiDefinitionsModule } from "./FraudApiDefinitions/searchFraudApiDefinitions/searchFraudApiDefinitions.module";
import { FraudApiDefinitionModule } from "./FraudApiDefinitions/fraudApiDefinition/fraudApiDefinition.module";
import { FraudGroupDefinitionsModule } from "./FraudGroupDefinitions/fraudGroupDefinitions/fraudGroupDefinitions.module";
import { FraudGroupDefinitionModule } from "./FraudGroupDefinitions/fraudGroupDefinition/fraudGroupDefinition.module";
import { FraudRuleDefinitionsModule } from "./FraudRuleDefinitions/fraudRuleDefinitions/fraudRuleDefinitions.module";
import { SearchFraudRuleDefinitionsModule } from "./FraudRuleDefinitions/searchFraudRuleDefinitions/searchFraudRuleDefinitions.module";
import { FraudRuleDefinitionModule } from "./FraudRuleDefinitions/fraudRuleDefinition/fraudRuleDefinition.module";
import { FraudActionReportsModule } from "./FraudActionReports/fraudActionReports/fraudActionReports.module";
import { SearchFraudActionReportsModule } from "./FraudActionReports/searchFraudActionReports/searchFraudActionReports.module";
import { FraudActionReportModule } from "./FraudActionReports/fraudActionReport/fraudActionReport.module";

@NgModule({
    imports: [
        FraudApiDefinitionsModule,
        SearchFraudApiDefinitionsModule,
        FraudApiDefinitionModule,
        FraudGroupDefinitionsModule,
        FraudGroupDefinitionModule,
        FraudRuleDefinitionsModule,
        SearchFraudRuleDefinitionsModule,
        FraudRuleDefinitionModule,
        FraudActionReportsModule,
        SearchFraudActionReportsModule,
        FraudActionReportModule,
    ],
})
export class FraudsModule {}
