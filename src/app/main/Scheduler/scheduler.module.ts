import { NgModule } from "@angular/core";
import { SchedulerJobDefinitionsModule } from "./SchedulerJobDefinitions/schedulerJobDefinitions/schedulerJobDefinitions.module";
import { SearchSchedulerJobDefinitionModule } from "./SchedulerJobDefinitions/searchSchedulerJobDefinition/searchSchedulerJobDefinition.module";
import { SchedulerJobDefinitionModule } from "./SchedulerJobDefinitions/schedulerJobDefinition/schedulerJobDefinition.module";
import { SchedulerJobErrorReportsModule } from "./SchedulerJobErrorReports/schedulerJobErrorReports/schedulerJobErrorReports.module";
import { SearchSchedulerJobErrorReportsModule } from "./SchedulerJobErrorReports/searchSchedulerJobErrorReports/searchSchedulerJobErrorReports.module";
import { SchedulerJobErrorReportModule } from "./SchedulerJobErrorReports/schedulerJobErrorReport/schedulerJobErrorReport.module";
import { SchedulerJobReportsModule } from "./SchedulerJobReports/schedulerJobReports/schedulerJobReports.module";
import { SearchSchedulerJobReportsModule } from "./SchedulerJobReports/searchSchedulerJobReports/searchSchedulerJobReports.module";
import { SchedulerJobReportModule } from "./SchedulerJobReports/schedulerJobReport/schedulerJobReport.module";
import { SchedulerInstantJobProfilesModule } from "./SchedulerInstantJobProfiles/schedulerInstantJobProfiles/schedulerInstantJobProfiles.module";
import { SchedulerInstantJobProfileModule } from "./SchedulerInstantJobProfiles/schedulerInstantJobProfile/schedulerInstantJobProfile.module";
import { SearchSchedulerInstantJobProfilesModule } from "./SchedulerInstantJobProfiles/searchSchedulerInstantJobProfiles/searchSchedulerInstantJobProfiles.module";

@NgModule({
    imports: [
        SchedulerJobDefinitionsModule,
        SearchSchedulerJobDefinitionModule,
        SchedulerJobDefinitionModule,
        SchedulerJobErrorReportsModule,
        SearchSchedulerJobErrorReportsModule,
        SchedulerJobErrorReportModule,
        SchedulerJobReportsModule,
        SearchSchedulerJobReportsModule,
        SchedulerJobReportModule,
        SchedulerInstantJobProfilesModule,
        SearchSchedulerInstantJobProfilesModule,
        SchedulerInstantJobProfileModule,
    ],
})
export class SchedulerModule {}
