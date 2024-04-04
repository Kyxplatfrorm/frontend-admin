import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { NotificationReport } from "../notificationReports/notificationReports.model";
import {
    LanguageCodeEntity,
    NotificationTemplateEntity,
    NotificationTypeEntity,
    SentStatusEntity,
    TenantDefinitionEntity,
} from "app/ui/notificationReport";
import { NotificationReportService } from "./notificationReport.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { NotificationReportsService } from "../notificationReports/notificationReports.service";
import { SearchNotificationReportService } from "../searchNotificationReport/searchNotificationReport.service";

@Component({
    selector: "notificationReport",
    templateUrl: "./notificationReport.component.html",
    styleUrls: ["./notificationReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class NotificationReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    notificationReport: NotificationReport;
    pageType: string;
    notificationType: NotificationTypeEntity[];
    languageCode: LanguageCodeEntity[];
    sentStatus: SentStatusEntity[];
    notificationTemplate: NotificationTemplateEntity[];
    tenant: TenantDefinitionEntity[];
    notificationReportForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private notificationReportService: NotificationReportService,
        private notificationReportsService: NotificationReportsService,
        private searchNotificationReportService: SearchNotificationReportService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.notificationReport = new NotificationReport();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
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

        this.notificationReportService.onNotificationReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notificationReport) => {
                if (notificationReport) {
                    this.notificationReport = new NotificationReport(
                        notificationReport
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.notificationReport = new NotificationReport();
                }
                this.notificationReportForm =
                    this.createNotificationReportForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createNotificationReportForm
     *
     * @returns {FormGroup}
     */
    createNotificationReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.notificationReport.Id],
            TenantId: [this.notificationReport.TenantId],
            CustomerName: [this.notificationReport.CustomerName],
            CompanyId: [this.notificationReport.CompanyId],
            SessionId: [this.notificationReport.SessionId],
            NotificationTypeId: [this.notificationReport.NotificationTypeId],
            TemplateId: [this.notificationReport.TemplateId],
            LanguageCodeId: [this.notificationReport.LanguageCodeId],
            ReceiverAddress: [this.notificationReport.ReceiverAddress],
            Subject: [this.notificationReport.Subject],
            Content: [this.notificationReport.Content],
            SentStatusId: [this.notificationReport.SentStatusId],
            IsEncrypted: [this.notificationReport.IsEncrypted],
            MaxRetryCount: [this.notificationReport.MaxRetryCount],
            AttemptCount: [this.notificationReport.AttemptCount],
            Priority: [this.notificationReport.Priority],
            HasExpiryDateTime: [this.notificationReport.HasExpiryDateTime],
            ExpiryDateTime: [this.notificationReport.ExpiryDateTime],
        });
    }

    /**
     * CreateNotificationReport
     */
    CreateNotificationReport(): void {
        const data = this.notificationReportForm.getRawValue();
        this.notificationReportService
            .CreateNotificationReport(data)
            .then(() => {
                this.notificationReportService.onNotificationReportChanged.next(
                    data
                );
                this.router.navigate([
                    "/Notifications/NotificationReport/searchNotificationReport",
                ]);
            });
    }

    onExpiryDateTimeChange(event: MatDatepickerInputEvent<Date>) {
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
        this.notificationReport.ExpiryDateTime = utcDate;
        const expiryDateTime = new Date(this.notificationReport.ExpiryDateTime);
        const expiryDateTimeString = expiryDateTime.toISOString();
    }
}
