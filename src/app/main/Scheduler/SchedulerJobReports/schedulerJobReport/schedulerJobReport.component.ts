import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SchedulerJobReport } from "../schedulerJobReports/schedulerJobReports.model";
import { SearchSchedulerJobReportsService } from "../searchSchedulerJobReports/searchSchedulerJobReports.service";
import { SchedulerJobReportsService } from "../schedulerJobReports/schedulerJobReports.service";
import {
    SchedulerJobStatusEntity,
    SchedulerJobTypeEntity,
    SchedulerRecurringTypeEntity,
} from "app/ui/schedulerJobReport";
import { SchedulerJobReportService } from "./schedulerJobReport.service";

@Component({
    selector: "schedulerJobReport",
    templateUrl: "./schedulerJobReport.component.html",
    styleUrls: ["./schedulerJobReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SchedulerJobReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    schedulerJobReport: SchedulerJobReport;
    pageType: string;
    runStatus: SchedulerJobStatusEntity[];
    schedulerJobType: SchedulerJobTypeEntity[];
    schedulerRecurringType: SchedulerRecurringTypeEntity[];
    schedulerJobReportForm: FormGroup;
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
        private schedulerJobReportsService: SchedulerJobReportsService,
        private schedulerJobReportService: SchedulerJobReportService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerJobReport = new SchedulerJobReport();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.schedulerJobReportsService.GetSchedulerJobStatus().then(() => {
            this.runStatus =
                this.schedulerJobReportsService.schedulerJobStatusApiResponse.ParameterList;
        });

        this.schedulerJobReportsService.GetSchedulerJobTypes().then(() => {
            this.schedulerJobType =
                this.schedulerJobReportsService.schedulerJobTypeApiResponse.ParameterList;
        });

        this.schedulerJobReportsService
            .GetSchedulerRecurringTypes()
            .then(() => {
                this.schedulerRecurringType =
                    this.schedulerJobReportsService.schedulerRecurringTypeApiResponse.ParameterList;
            });

        this.schedulerJobReportService.onSchedulerJobReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((schedulerJobReport) => {
                if (schedulerJobReport) {
                    this.schedulerJobReport = new SchedulerJobReport(
                        schedulerJobReport
                    );
                    this.pageType = "edit";
                } else {
                    this.schedulerJobReport = new SchedulerJobReport({});
                    this.pageType = "new";
                }
                this.schedulerJobReportForm =
                    this.createSchedulerJobReportForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     *  createSchedulerJobReportForm
     *
     * @returns {FormGroup}
     */
    createSchedulerJobReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.schedulerJobReport.Id],
            Description: [this.schedulerJobReport.Description],
            IsTenantBasedJob: [this.schedulerJobReport.IsTenantBasedJob],
            InsertDate: [this.schedulerJobReport.InsertDate],
            IsInstantJob: [this.schedulerJobReport.IsInstantJob],
            ServerCode: [this.schedulerJobReport.ServerCode],
            SchedulerJobId: [this.schedulerJobReport.SchedulerJobDetailId],
            SchedulerJobDetailId: [
                this.schedulerJobReport.SchedulerJobDetailId,
            ],
            RecurringTypeId: [this.schedulerJobReport.RecurringTypeId],
            OrderId: [this.schedulerJobReport.OrderId],
            RunStatusId: [this.schedulerJobReport.RunStatusId],
            SchedulerJobTypeId: [this.schedulerJobReport.SchedulerJobTypeId],
            ApplicationPath: [this.schedulerJobReport.ApplicationPath],
            ApplicationName: [this.schedulerJobReport.ApplicationName],
            ApplicationParameter: [
                this.schedulerJobReport.ApplicationParameter,
            ],
            FullClassName: [this.schedulerJobReport.FullClassName],
            MethodName: [this.schedulerJobReport.MethodName],
            ProcedureName: [this.schedulerJobReport.ProcedureName],
            QueueDateTime: [this.schedulerJobReport.QueueDateTime],
            StartDateTime: [this.schedulerJobReport.StartDateTime],
            EndDateTime: [this.schedulerJobReport.EndDateTime],
            ExitCode: [this.schedulerJobReport.ExitCode],
            ResultMessage: [this.schedulerJobReport.ResultMessage],
            Pid: [this.schedulerJobReport.Pid],
            ExecutionTimeout: [this.schedulerJobReport.ExecutionTimeout],
            RetryCount: [this.schedulerJobReport.RetryCount],
            DueDateTime: [this.schedulerJobReport.DueDateTime],
            DueDate: [this.schedulerJobReport.DueDate],
            MachineName: [this.schedulerJobReport.MachineName],
            ApplicationId: [this.schedulerJobReport.ApplicationId],
            TotalElapsed: [this.schedulerJobReport.TotalElapsed],
        });
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
        this.schedulerJobReport.StartDateTime = utcDate;
        const startDateTime = new Date(this.schedulerJobReport.StartDateTime);
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
        this.schedulerJobReport.EndDateTime = utcDate;
        const endDateTime = new Date(this.schedulerJobReport.EndDateTime);
        const endDateTimeString = endDateTime.toISOString();
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
        this.schedulerJobReport.DueDateTime = utcDate;
        const dueDateTime = new Date(this.schedulerJobReport.DueDateTime);
        const dueDateTimetring = dueDateTime.toISOString();
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
        this.schedulerJobReport.QueueDateTime = utcDate;
        const queueDateTime = new Date(this.schedulerJobReport.QueueDateTime);
        const queueDateTimetring = queueDateTime.toISOString();
    }
}
