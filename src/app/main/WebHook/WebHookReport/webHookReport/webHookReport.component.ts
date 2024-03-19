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
import { WebHookReport } from "../webHookReports/webHookReports.model";
import {
    WebHookRunStatusEntity,
    TenantDefinitionEntity,
    WebHookTypeEntity,
} from "app/ui/webHookReport";
import { WebHookReportService } from "./webHookReport.service";
import { WebHookReportsService } from "../webHookReports/webHookReports.service";
import { SearchWebHookReportService } from "../searchWebHookReport/searchWebHookReport.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
    selector: "webHookReport",
    templateUrl: "./webHookReport.component.html",
    styleUrls: ["./webHookReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class WebHookReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    webHookReport: WebHookReport;
    pageType: string;
    webHookType: WebHookTypeEntity[];
    webHookRunStatus: WebHookRunStatusEntity[];
    tenant: TenantDefinitionEntity[];
    webHookReportForm: FormGroup;
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
        private webHookReportService: WebHookReportService,
        private webHookReportsService: WebHookReportsService,
        private searchWebHookReportService: SearchWebHookReportService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.webHookReport = new WebHookReport();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.webHookReportsService.GetWebHookRunStatues().then(() => {
            this.webHookRunStatus =
                this.webHookReportsService.webHookRunStatusApiResponse.ParameterList;
        });

        this.webHookReportsService.GetTenants().then(() => {
            this.tenant =
                this.webHookReportsService.tenantApiResponse.TenantDefinitionList;
        });

        this.webHookReportsService.GetWebHookTypes().then(() => {
            this.webHookType =
                this.webHookReportsService.webHookTypeApiResponse.ParameterList;
        });

        this.webHookReportService.onWebHookReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((webHookReport) => {
                if (webHookReport) {
                    this.webHookReport = new WebHookReport(webHookReport);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.webHookReport = new WebHookReport();
                }
                this.webHookReportForm = this.createWebHookReportForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createWebHookReportForm
     *
     * @returns {FormGroup}
     */
    createWebHookReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.webHookReport.Id],
            WebHookProfileId: [this.webHookReport.WebHookProfileId],
            CompanyId: [this.webHookReport.CompanyId],
            TenantId: [this.webHookReport.TenantId],
            WebHookTypeId: [this.webHookReport.WebHookTypeId],
            RunStatusId: [this.webHookReport.RunStatusId],
            HttpStatusCode: [this.webHookReport.HttpStatusCode],
            RetryCount: [this.webHookReport.RetryCount],
            ApplicationId: [this.webHookReport.ApplicationId],
            MachineName: [this.webHookReport.MachineName],
            HttpPostUrl: [this.webHookReport.HttpPostUrl],
            ResultMessage: [this.webHookReport.ResultMessage],
            RecordType: [this.webHookReport.RecordType],
            ReferenceNumberType: [this.webHookReport.ReferenceNumberType],
            ReferenceNumber: [this.webHookReport.ReferenceNumber],
            WebHookPayLoad: [this.webHookReport.WebHookPayLoad],
            DueDateTime: [this.webHookReport.DueDateTime],
            QueueDateTime: [this.webHookReport.QueueDateTime],
            StartDateTime: [this.webHookReport.StartDateTime],
            EndDateTime: [this.webHookReport.EndDateTime],
        });
    }

    onDueDateTimeChange(event: MatDatepickerInputEvent<Date>) {
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
        this.webHookReport.DueDateTime = utcDate;
        const dueDateTime = new Date(this.webHookReport.DueDateTime);
        const dueDateTimeString = dueDateTime.toISOString();
    }

    onQueueDateTimeChange(event: MatDatepickerInputEvent<Date>) {
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
        this.webHookReport.QueueDateTime = utcDate;
        const queueDateTime = new Date(this.webHookReport.QueueDateTime);
        const queueDateTimeString = queueDateTime.toISOString();
    }

    onStartDateTimeChange(event: MatDatepickerInputEvent<Date>) {
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
        this.webHookReport.StartDateTime = utcDate;
        const startDateTime = new Date(this.webHookReport.StartDateTime);
        const startDateTimeString = startDateTime.toISOString();
    }

    onEndDateTimeChange(event: MatDatepickerInputEvent<Date>) {
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
        this.webHookReport.EndDateTime = utcDate;
        const endDateTime = new Date(this.webHookReport.EndDateTime);
        const endDateTimeString = endDateTime.toISOString();
    }
}
