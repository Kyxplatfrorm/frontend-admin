import { NgModule } from "@angular/core";
import { SearchSwitchParseErrorLogsModule } from "./SwitchParseErrorReport/searchParseErrorLogs/searchParseErrorLogs.module";
import { SwitchParseErrorLogModule } from "./SwitchParseErrorReport/switchParseErrorLog/switchParseErrorLog.module";
import { SwitchParseErrorLogsModule } from "./SwitchParseErrorReport/switchParseErrorLogs/switchParseErrorLogs.module";
import { SwitchTimeoutLogsModule } from "./SwitchTimeoutReport/switchTimeoutLogs/switchTimeoutLogs.module";
import { SearchSwitchTimeoutLogModule } from "./SwitchTimeoutReport/searchTimeoutLog/searchTimeoutLog.module";
import { SwitchTimeoutLogModule } from "./SwitchTimeoutReport/switchTimeoutLog/switchTimeoutLog.module";
import { SwitchMessageLogsModule } from "./SwitchMessageReport/switchMessageLogs/switchMessageLogs.module";
import { SearchSwitchMessageLogModule } from "./SwitchMessageReport/searchMessageLog/searchMessageLog.module";
import { SwitchMessageLogModule } from "./SwitchMessageReport/switchMessageLog/switchMessageLog.module";

@NgModule({
    imports: [
        SwitchParseErrorLogsModule,
        SearchSwitchParseErrorLogsModule,
        SwitchParseErrorLogModule,
        SwitchTimeoutLogsModule,
        SearchSwitchTimeoutLogModule,
        SwitchTimeoutLogModule,
        SwitchMessageLogsModule,
        SearchSwitchMessageLogModule,
        SwitchMessageLogModule,
    ],
})
export class SwitchReportModule {}
