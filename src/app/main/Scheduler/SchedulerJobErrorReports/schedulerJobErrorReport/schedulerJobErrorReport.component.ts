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
import { SchedulerJobErrorReport } from "../schedulerJobErrorReports/schedulerJobErrorReports.model";
import {
    RunStatusEntity,
    TenantDefinitionEntity,
} from "app/ui/schedulerJobErrorReport";
import { SchedulerJobErrorReportsService } from "../schedulerJobErrorReports/schedulerJobErrorReports.service";
import { SearchSchedulerJobErrorReportsService } from "../searchSchedulerJobErrorReports/searchSchedulerJobErrorReports.service";
import { SchedulerJobErrorReportService } from "./schedulerJobErrorReport.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
    selector: "schedulerJobErrorReport",
    templateUrl: "./schedulerJobErrorReport.component.html",
    styleUrls: ["./schedulerJobErrorReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SchedulerJobErrorReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    schedulerJobErrorReport: SchedulerJobErrorReport;
    pageType: string;
    tenant: TenantDefinitionEntity[];
    runStatus: RunStatusEntity[];
    schedulerJobErrorReportForm: FormGroup;
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
        private schedulerJobErrorReportsService: SchedulerJobErrorReportsService,
        private searchSchedulerJobErrorReportsService: SearchSchedulerJobErrorReportsService,
        private schedulerJobErrorReportService: SchedulerJobErrorReportService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerJobErrorReport = new SchedulerJobErrorReport();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.schedulerJobErrorReportsService
            .GetSchedulerJobStatus()
            .then(() => {
                this.runStatus =
                    this.schedulerJobErrorReportsService.runStatusApiResponse.ParameterList;
            });

        this.schedulerJobErrorReportsService.GetTenants().then(() => {
            this.tenant =
                this.schedulerJobErrorReportsService.tenantApiResponse.TenantDefinitionList;
        });

        this.schedulerJobErrorReportService.onSchedulerJobErrorReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((schedulerJobErrorReport) => {
                if (schedulerJobErrorReport) {
                    this.schedulerJobErrorReport = new SchedulerJobErrorReport(
                        schedulerJobErrorReport
                    );
                    this.pageType = "edit";
                } else {
                    this.schedulerJobErrorReport =
                        new SchedulerJobErrorReport();
                    this.pageType = "new";
                }
                this.schedulerJobErrorReportForm =
                    this.createSchedulerJobErrorReportForm();
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
     *  createSchedulerJobErrorReportForm
     *
     * @returns {FormGroup}
     */
    createSchedulerJobErrorReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.schedulerJobErrorReport.Id],
            IsTenantBasedJob: [this.schedulerJobErrorReport.IsTenantBasedJob],
            InsertDate: [this.schedulerJobErrorReport.InsertDate],
            TenantId: [this.schedulerJobErrorReport.TenantId],
            ServerCode: [this.schedulerJobErrorReport.ServerCode],
            Description: [this.schedulerJobErrorReport.Description],
            SchedulerJobId: [this.schedulerJobErrorReport.SchedulerJobId],
            SchedulerJobDetailId: [
                this.schedulerJobErrorReport.SchedulerJobDetailId,
            ],
            SchedulerJobQueueId: [
                this.schedulerJobErrorReport.SchedulerJobQueueId,
            ],
            SchedulerJobDescription: [
                this.schedulerJobErrorReport.SchedulerJobDescription,
            ],
            RunStatusId: [this.schedulerJobErrorReport.RunStatusId],
            ErrorMessage: [this.schedulerJobErrorReport.ErrorMessage],
            MachineName: [this.schedulerJobErrorReport.MachineName],
            TotalElapsed: [this.schedulerJobErrorReport.TotalElapsed],
            StartDateTime: [this.schedulerJobErrorReport.StartDateTime],
            EndDateTime: [this.schedulerJobErrorReport.EndDateTime],
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
        this.schedulerJobErrorReport.StartDateTime = utcDate;
        const startDateTime = new Date(
            this.schedulerJobErrorReport.StartDateTime
        );
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
        this.schedulerJobErrorReport.EndDateTime = utcDate;
        const endDateTime = new Date(this.schedulerJobErrorReport.EndDateTime);
        const endDateTimeString = endDateTime.toISOString();
    }
}
