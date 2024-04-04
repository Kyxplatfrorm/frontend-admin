import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { NotificationReport } from "./notificationReports.model";
import {
    LanguageCodeEntity,
    NotificationTemplateEntity,
    NotificationTypeEntity,
    SentStatusEntity,
    TenantDefinitionEntity,
} from "app/ui/notificationReport";
import { NotificationReportsService } from "./notificationReports.service";
import { SearchNotificationReportService } from "../searchNotificationReport/searchNotificationReport.service";

@Component({
    selector: "notificationReports",
    templateUrl: "./notificationReports.component.html",
    styleUrls: ["./notificationReports.component.scss"],
})
export class NotificationReportsComponent {
    notificationReport: NotificationReport;
    notificationReportsForm: FormGroup;
    notificationType: NotificationTypeEntity[];
    languageCode: LanguageCodeEntity[];
    sentStatus: SentStatusEntity[];
    notificationTemplate: NotificationTemplateEntity[];
    tenant: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchNotificationReportService: SearchNotificationReportService,
        private notificationReportsService: NotificationReportsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.notificationReport = new NotificationReport();
        this.notificationReport.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.notificationReportsService.GetTenants().then(() => {
            this.tenant =
                this.notificationReportsService.tenantApiResponse.TenantDefinitionList;
        });
        this.notificationReportsService.GetLanguageCodes().then(() => {
            this.languageCode =
                this.notificationReportsService.languageCodeApiResponse.ParameterList;
        });
        this.notificationReportsService.GetNotificationTemplates().then(() => {
            this.notificationTemplate =
                this.notificationReportsService.notificationTemplateApiResponse.ParameterList;
        });
        this.notificationReportsService.GetNotificationTypes().then(() => {
            this.notificationType =
                this.notificationReportsService.notificationTypeApiResponse.ParameterList;
        });
        this.notificationReportsService.GetNotificationSentStatus().then(() => {
            this.sentStatus =
                this.notificationReportsService.sentStatusApiResponse.ParameterList;
        });

        this.notificationReportsForm = this.createNotificationReportsForm();
    }

    /**
     *  createNotificationReportsForm
     *
     * @returns {FormGroup}
     */
    createNotificationReportsForm(): FormGroup {
        return this._formBuilder.group({
            CustomerId: [this.notificationReport.CustomerId],
            TenantId: [this.notificationReport.TenantId],
            CompanyId: [this.notificationReport.CompanyId],
            SessionId: [this.notificationReport.SessionId],
            NotificationTypeId: [this.notificationReport.NotificationTypeId],
            TemplateId: [this.notificationReport.TemplateId],
            LanguageCodeId: [this.notificationReport.LanguageCodeId],
            ReceiverAddress: [this.notificationReport.ReceiverAddress],
            Subject: [this.notificationReport.Subject],
            Content: [this.notificationReport.Content],
            SentStatusId: [this.notificationReport.SentStatusId],
            MaxRetryCount: [this.notificationReport.MaxRetryCount],
            AttemptCount: [this.notificationReport.AttemptCount],
            SearchStartDate: [this.notificationReport.SearchStartDate],
            SearchEndDate: [this.notificationReport.SearchEndDate],
            SearchStartTime: [this.notificationReport.SearchStartTime],
            SearchEndTime: [this.notificationReport.SearchEndTime],
        });
    }
    /**
     * SearchNotificationReport
     */
    SearchNotificationReport(): void {
        const data = this.notificationReportsForm.getRawValue();
        this.searchNotificationReportService
            .SearchNotificationReport(data)
            .then(() => {
                this.searchNotificationReportService.onSearchNotificationReportChanged.next(
                    data
                );
                this.router.navigate([
                    "/Notifications/NotificationReport/searchNotificationReport",
                ]);
            });
    }

    ClearButton() {
        this.notificationReportsForm.controls["CustomerId"].reset();
        this.notificationReportsForm.controls["TenantId"].reset();
        this.notificationReportsForm.controls["CompanyId"].reset();
        this.notificationReportsForm.controls["SessionId"].reset();
        this.notificationReportsForm.controls["NotificationTypeId"].reset();
        this.notificationReportsForm.controls["TemplateId"].reset();
        this.notificationReportsForm.controls["LanguageCodeId"].reset();
        this.notificationReportsForm.controls["ReceiverAddress"].reset();
        this.notificationReportsForm.controls["Subject"].reset();
        this.notificationReportsForm.controls["Content"].reset();
        this.notificationReportsForm.controls["SearchStartDate"].reset();
        this.notificationReportsForm.controls["SearchEndDate"].reset();
        this.notificationReportsForm.controls["SearchStartTime"].reset();
        this.notificationReportsForm.controls["SearchEndTime"].reset();
        this.notificationReportsForm.controls["SentStatusId"].reset();
        this.notificationReportsForm.controls["MaxRetryCount"].reset();
        this.notificationReportsForm.controls["AttemptCount"].reset();
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
        this.notificationReport.SearchStartDate = utcDate;
        const searchStartDate = new Date(
            this.notificationReport.SearchStartDate
        );
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

        this.notificationReport.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.notificationReport.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
