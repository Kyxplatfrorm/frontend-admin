import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { WebHookReport } from "./webHookReports.model";
import { SearchWebHookReportService } from "../searchWebHookReport/searchWebHookReport.service";
import {
    WebHookRunStatusEntity,
    TenantDefinitionEntity,
    WebHookTypeEntity,
} from "app/ui/webHookReport";
import { WebHookReportsService } from "./webHookReports.service";

@Component({
    selector: "webHookReports",
    templateUrl: "./webHookReports.component.html",
    styleUrls: ["./webHookReports.component.scss"],
})
export class WebHookReportsComponent {
    webHookReport: WebHookReport;
    webHookReportsForm: FormGroup;
    webHookRunStatus: WebHookRunStatusEntity[];
    webHookType: WebHookTypeEntity[];
    tenant: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchWebHookReportService: SearchWebHookReportService,
        private webHookReportsService: WebHookReportsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.webHookReport = new WebHookReport();
        this.webHookReport.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.webHookReportsService.GetWebHookRunStatues().then(() => {
            this.webHookRunStatus =
                this.webHookReportsService.webHookRunStatusApiResponse.ParameterList;
        });
        this.webHookReportsService.GetWebHookTypes().then(() => {
            this.webHookType =
                this.webHookReportsService.webHookTypeApiResponse.ParameterList;
        });
        this.webHookReportsService.GetTenants().then(() => {
            this.tenant =
                this.webHookReportsService.tenantApiResponse.TenantDefinitionList;
        });  this.webHookReportsService.GetTenants().then(() => {
            this.tenant =
                this.webHookReportsService.tenantApiResponse.TenantDefinitionList;
        });

        this.webHookReportsForm = this.createWebHookReportsForm();
    }

    /**
     *  createWebHookReportsForm
     *
     * @returns {FormGroup}
     */
    createWebHookReportsForm(): FormGroup {
        return this._formBuilder.group({
            WebHookProfileId: [this.webHookReport.WebHookProfileId],
            CompanyId: [this.webHookReport.CompanyId],
            TenantId: [this.webHookReport.TenantId],
            WebHookTypeId: [this.webHookReport.WebHookTypeId],
            RunStatusId: [this.webHookReport.RunStatusId],
            HttpStatusCode: [this.webHookReport.HttpStatusCode],
            RetryCount: [this.webHookReport.RetryCount],
            ApplicationId: [this.webHookReport.ApplicationId],
            TotalElapsed: [this.webHookReport.TotalElapsed],
            ReferenceNumber: [this.webHookReport.ReferenceNumber],
            HttpPostUrl: [this.webHookReport.HttpPostUrl],
            SearchStartDate: [this.webHookReport.SearchStartDate],
            SearchEndDate: [this.webHookReport.SearchEndDate],
        });
    }

    /**
     * SearchWebHookReport
     */
    SearchWebHookReport(): void {
        const data = this.webHookReportsForm.getRawValue();
        this.searchWebHookReportService.SearchWebHookReport(data).then(() => {
            this.searchWebHookReportService.onSearchWebHookReportChanged.next(
                data
            );
            this.router.navigate([
                "/WebHook/WebHookReport/searchWebHookReport",
            ]);
        });
    }

    ClearButton() {
        this.webHookReportsForm.controls["WebHookProfileId"].reset();
        this.webHookReportsForm.controls["CompanyId"].reset();
        this.webHookReportsForm.controls["TenantId"].reset();
        this.webHookReportsForm.controls["WebHookTypeId"].reset();
        this.webHookReportsForm.controls["RunStatusId"].reset();
        this.webHookReportsForm.controls["HttpStatusCode"].reset();
        this.webHookReportsForm.controls["RetryCount"].reset();
        this.webHookReportsForm.controls["ApplicationId"].reset();
        this.webHookReportsForm.controls["TotalElapsed"].reset();
        this.webHookReportsForm.controls["ReferenceNumber"].reset();
        this.webHookReportsForm.controls["HttpPostUrl"].reset();
        this.webHookReportsForm.controls["SearchStartDate"].reset();
        this.webHookReportsForm.controls["SearchEndDate"].reset();
    }

    onSearchStartDateChange(event: MatDatepickerInputEvent<Date>) {
        const selectedDate = new Date(event.value);
        const utcDate = new Date(
            Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes(),
                selectedDate.getSeconds()
            )
        );
        this.webHookReport.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.webHookReport.SearchStartDate);
        const searchStartDateString = searchStartDate.toISOString();
    }
    onSearchEndDateChange(event: MatDatepickerInputEvent<Date>) {
        const selectedDate = new Date(event.value);
        const utcDate = new Date(
            Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes(),
                selectedDate.getSeconds()
            )
        );

        this.webHookReport.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.webHookReport.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
