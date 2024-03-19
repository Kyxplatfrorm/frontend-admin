import { NgModule } from "@angular/core";
import { NotificationMonitoringsModule } from "./NotificationMonitoring/notificationMonitorings/notificationMonitorings.module";
import { NotificationMonitoringModule } from "./NotificationMonitoring/notificationMonitoring/notificationMonitoring.module";
import { NotificationReportsModule } from "./NotificationReport/notificationReports/notificationReports.module";
import { SearchNotificationReportModule } from "./NotificationReport/searchNotificationReport/searchNotificationReport.module";
import { NotificationReportModule } from "./NotificationReport/notificationReport/notificationReport.module";
import { NotificationTemplateDefinitionsModule } from "./NotificationTemplateDefinitions/notificationTemplateDefinitions/notificationTemplateDefinitions.module";
import { SearchNotificationTemplateDefinitionModule } from "./NotificationTemplateDefinitions/searchNotificationTemplateDefinition/searchNotificationTemplateDefinition.module";
import { NotificationTemplateDefinitionModule } from "./NotificationTemplateDefinitions/notificationTemplateDefinition/notificationTemplateDefinition.module";

@NgModule({
    imports: [
        NotificationMonitoringsModule,
        NotificationMonitoringModule,
        NotificationReportsModule,
        SearchNotificationReportModule,
        NotificationReportModule,
        NotificationTemplateDefinitionsModule,
        SearchNotificationTemplateDefinitionModule,
        NotificationTemplateDefinitionModule,
    ],
})
export class NotificationModule {}
