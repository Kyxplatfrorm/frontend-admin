import { NgModule } from "@angular/core";
import { AppDefinitionModule } from "./ApplicationDefinition/applicationDefinition/applicationDefinition.module";
import { ApplicationDefinitionsModule } from "./ApplicationDefinition/applicationDefinitions/applicationDefinitions.module";
import { ApplicationLogHistoryModule } from "./ApplicationLog/applicationHistory/applicationHistory.module";
import { ApplicationLogModule } from "./ApplicationLog/applicationLog/applicationLog.module";
import { ApplicationProfileDetailModule } from "./ApplicationProfiles/applicationProfileDetail/applicationProfileDetail.module";
import { AppProfilesModule } from "./ApplicationProfiles/applicationProfiles/applicationProfiles.module";
import { RestApiLogModule } from "./RestApiLog/restApiLog/restApiLog.module";
import { RestApiLogsModule } from "./RestApiLog/restApiLogs/restApiLogs.module";
import { SearchRestApiLogModule } from "./RestApiLog/searchRestApiLog/searchRestApiLog.module";

@NgModule({
    imports: [
        AppDefinitionModule,
        ApplicationDefinitionsModule,
        ApplicationLogHistoryModule,
        ApplicationLogModule,
        ApplicationProfileDetailModule,
        AppProfilesModule,
        SearchRestApiLogModule,
        RestApiLogsModule,
        RestApiLogModule,
    ],
})
export class ApplicationModule {}
