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
import { CardTransactionsModule } from "./CardTransactions/cardTransactions/cardTransactions.module";
import { SearchCardTransactionModule } from "./CardTransactions/searchCardTransaction/searchCardTransaction.module";
import { CardTransactionModule } from "./CardTransactions/cardTransaction/cardTransaction.module";
import { CardEmvModule } from "./CardTransactions/cardEmv/cardEmv.module";
import { SwitchTimeoutLogsModule } from "../SwitchReport/SwitchTimeoutReport/switchTimeoutLogs/switchTimeoutLogs.module";
import { SearchSwitchTimeoutLogModule } from "../SwitchReport/SwitchTimeoutReport/searchTimeoutLog/searchTimeoutLog.module";
import { SwitchTimeoutLogModule } from "../SwitchReport/SwitchTimeoutReport/switchTimeoutLog/switchTimeoutLog.module";
import { SwitchTransactionModule } from "./SwitchTransactions/switchTransaction/switchTransaction.module";
import { CardMemoReportsModule } from "./CardMemoReport/cardMemoReports/cardMemoReports.module";
import { SearchCardMemoReportModule } from "./CardMemoReport/searchCardMemoReport/searchCardMemoReport.module";
import { CardMeoReportModule } from "./CardMemoReport/cardMemoReport/cardMemoReport.module";
import { CardEmbossReportsModule } from "./CardEmbossReport/cardEmbossReports/cardEmbossReports.module";
import { SearchCardEmbossReportModule } from "./CardEmbossReport/searchCardEmbossReport/searchCardEmbossReport.module";
import { CardEmbossReportModule } from "./CardEmbossReport/cardEmbossReport/cardEmbossReport.module";

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
        SwitchTransactionModule,
        SwitchTimeoutLogsModule,
        SearchSwitchTimeoutLogModule,
        SwitchTimeoutLogModule,
        CardTransactionsModule,
        SearchCardTransactionModule,
        CardTransactionModule,
        CardEmvModule,
        CardEmbossReportsModule,
        SearchCardEmbossReportModule,
        CardEmbossReportModule,
        CardMemoReportsModule,
        SearchCardMemoReportModule,
        CardMeoReportModule,
    ],
})
export class ReportModule {}
