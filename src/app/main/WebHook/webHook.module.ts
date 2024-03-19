import { NgModule } from "@angular/core";
import { TenantWebHookProfilesModule } from "./TenantWebHookProfiles/tenantWebHookProfiles/tenantWebHookProfiles.module";
import { SearchTenantWebHookProfileModule } from "./TenantWebHookProfiles/searchTenantWebHookProfile/searchTenantWebHookProfile.module";
import { TenantWebHookProfileModule } from "./TenantWebHookProfiles/tenantWebHookProfile/tenantWebHookProfile.module";
import { WebHookMonitoringsModule } from "./WebHookMonitoring/webHookMonitorings/webHookMonitorings.module";
import { WebHookMonitoringModule } from "./WebHookMonitoring/webHookMonitoring/webHookMonitoring.module";
import { WebHookReportsModule } from "./WebHookReport/webHookReports/webHookReports.module";
import { SearchWebHookReportModule } from "./WebHookReport/searchWebHookReport/searchWebHookReport.module";
import { WebHookReportModule } from "./WebHookReport/webHookReport/webHookReport.module";
import { WebHookPayLoadTemplatesModule } from "./WebHookPayLoadTemplate/webHookPayLoadTemplates/webHookPayLoadTemplates.module";
import { WebHookPayLoadTemplateModule } from "./WebHookPayLoadTemplate/webHookPayLoadTemplate/webHookPayLoadTemplate.module";

@NgModule({
    imports: [
        TenantWebHookProfilesModule,
        SearchTenantWebHookProfileModule,
        TenantWebHookProfileModule,
        WebHookMonitoringsModule,
        WebHookMonitoringModule,
        WebHookReportsModule,
        SearchWebHookReportModule,
        WebHookReportModule,
        WebHookPayLoadTemplatesModule,
        WebHookPayLoadTemplateModule,
    ],
})
export class WebHookModule {}
