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
import { SchedulerJob } from "../schedulerJobDefinitions/schedulerJobDefinitions.model";
import {
    RecurringWeekDaysEntity,
    SchedulerJobStatusEntity,
    SchedulerRecurringLevelEntity,
    SchedulerRecurringTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/schedulerJobDefinition";
import { SearchSchedulerJobDefinitionService } from "../searchSchedulerJobDefinition/searchSchedulerJobDefinition.service";
import { SchedulerJobDefinitionService } from "./schedulerJobDefinition.service";
import { SchedulerJobDefinitionsService } from "../schedulerJobDefinitions/schedulerJobDefinitions.service";
import AddAlertSchedulerJobDefinition from "./addSchedulerJobDefinition";
import UpdateAlertSchedulerJobDefinition from "./updateSchedulerJobDefinition";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import SchedulerJobDetailDataSource from "./schedulerJobDefinition.datasource";
import { SchedulerJobFormDialogComponent } from "./schedulerJobForm/schedulerJobForm.component";

@Component({
    selector: "schedulerJobDefinition",
    templateUrl: "./schedulerJobDefinition.component.html",
    styleUrls: ["./schedulerJobDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SchedulerJobDefinitionComponent implements OnInit, OnDestroy {
    schedulerJobDetailDataSource: SchedulerJobDetailDataSource;
    dialogRef: any;
    schedulerJob: SchedulerJob;
    pageType: string;
    schedulerRecurringLevel: SchedulerRecurringLevelEntity[];
    schedulerRecurringType: SchedulerRecurringTypeEntity[];
    tenant: TenantDefinitionEntity[];
    schedulerJobStatus: SchedulerJobStatusEntity[];
    recurringWeekDays: RecurringWeekDaysEntity[];
    schedulerJobDefinitionForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    schedulerJobDefinitionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    schedulerJobDefinitionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    displayedColumns = [
        "Id",
        "Description",
        "IsActive",
        "SchedulerJobName",
        "SchedulerJobTypeName",
        "ApplicationPath",
        "ApplicationName",
        "ApplicationParameter",
        "FullClassName",
        "MethodName",
        "ProcedureName",
        "LastRunStatus",
        "Buttons",
    ];

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
        private schedulerJobDefinitionService: SchedulerJobDefinitionService,
        private schedulerJobDefinitionsService: SchedulerJobDefinitionsService,
        private searchSchedulerJobDefinitionService: SearchSchedulerJobDefinitionService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addAlertSchedulerJobDefinition: AddAlertSchedulerJobDefinition,
        private updateAlertSchedulerJobDefinition: UpdateAlertSchedulerJobDefinition,
        private router: Router,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerJob = new SchedulerJob();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.schedulerJobDefinitionsService
            .GetSchedulerRecurringLevels()
            .then(() => {
                this.schedulerRecurringLevel =
                    this.schedulerJobDefinitionsService.schedulerRecurringLevelApiResponse.ParameterList;
            });

        this.schedulerJobDefinitionsService.GetRecurringWeekDays().then(() => {
            this.recurringWeekDays =
                this.schedulerJobDefinitionsService.recurringWeekDaysApiResponse.ParameterList;
        });

        this.schedulerJobDefinitionsService.GetTenants().then(() => {
            this.tenant =
                this.schedulerJobDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });

        this.schedulerJobDefinitionsService
            .GetSchedulerRecurringTypes()
            .then(() => {
                this.schedulerRecurringType =
                    this.schedulerJobDefinitionsService.schedulerRecurringTypeApiResponse.ParameterList;
            });

        this.schedulerJobDefinitionsService.GetSchedulerJobStatus().then(() => {
            this.schedulerJobStatus =
                this.schedulerJobDefinitionsService.schedulerJobStatusApiResponse.ParameterList;
        });
        this.schedulerJobDetailDataSource = new SchedulerJobDetailDataSource(
            this.schedulerJobDefinitionService,
            this.schedulerJobDefinitionPaginator,
            this.schedulerJobDefinitionSort
        );
        if (this.filter?.nativeElement) {
            fromEvent(this.filter.nativeElement, "keyup")
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    debounceTime(150),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                    if (!this.schedulerJobDetailDataSource) {
                        return;
                    }
                    this.schedulerJobDetailDataSource.filter =
                        this.filter.nativeElement.value;
                });
        }
        this.schedulerJobDefinitionService.onSchedulerJobDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((schedulerJob) => {
                if (schedulerJob) {
                    this.schedulerJob = new SchedulerJob(schedulerJob);
                    this.pageType = "edit";
                    this.schedulerJobDefinitionService.schedulerJobDetailList =
                        schedulerJob.SchedulerJobDetail;
                } else {
                    this.pageType = "new";
                    this.schedulerJobDefinitionService.schedulerJobDetailList =
                        schedulerJob.SchedulerJobDetail;
                }
                this.schedulerJobDefinitionForm = this.createSchedulerJobForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshSchedulerJobDetailDataSource(): void {
        this.schedulerJobDetailDataSource = new SchedulerJobDetailDataSource(
            this.schedulerJobDefinitionService,
            this.schedulerJobDefinitionPaginator,
            this.schedulerJobDefinitionSort
        );
    }

    /**
     *  createSchedulerJobForm
     *
     * @returns {FormGroup}
     */
    createSchedulerJobForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.schedulerJob.Id],
            IsTenantBasedJob: [this.schedulerJob.IsTenantBasedJob],
            IsActive: [this.schedulerJob.IsActive],
            TenantId: [this.schedulerJob.TenantId],
            ServerCode: [this.schedulerJob.ServerCode],
            RecurringWeekDayList: [this.schedulerJob.RecurringWeekDayList],
            Description: [this.schedulerJob.Description],
            StartTime: [this.schedulerJob.StartTime],
            EndTime: [this.schedulerJob.EndTime],
            StartDateTime: [this.schedulerJob.StartDateTime],
            EndDateTime: [this.schedulerJob.EndDateTime],
            RecurringTypeId: [this.schedulerJob.RecurringTypeId],
            RecurringLevelId: [this.schedulerJob.RecurringLevelId],
            LastRunStatusId: [this.schedulerJob.LastRunStatusId],
            RecurringEvery: [this.schedulerJob.RecurringEvery],
            // RecurringWeekDays: [this.schedulerJob.RecurringWeekDays],
            RecurringDailyTimes: [this.schedulerJob.RecurringDailyTimes],
            RunIfFails: [this.schedulerJob.RunIfFails],
            EstimatedExecutionTime: [this.schedulerJob.EstimatedExecutionTime],
            HasMultiStep: [this.schedulerJob.HasMultiStep],
        });
    }

    /**
     * CreateSchedulerJobDefinition
     */
    CreateSchedulerJobDefinition(): void {
        const data = this.schedulerJobDefinitionForm.getRawValue();
        this.schedulerJobDefinitionService
            .CreateSchedulerJobDefinition(data)
            .then(() => {
                this.schedulerJobDefinitionService.onSchedulerJobDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Schedulers/SchedulerJobDefinitions/searchSchedulerJobDefinition",
                ]);
                this.searchSchedulerJobDefinitionService
                    .SearchSchedulerJobDefinition(this.schedulerJob)
                    .then(() => {
                        this.addAlertSchedulerJobDefinition.AddAlertSchedulerJobDefinitionShow();
                    });
            });
    }

    /**
     * UpdateSchedulerJobDefinition
     */
    UpdateSchedulerJobDefinition(): void {
        const data = this.schedulerJobDefinitionForm.getRawValue();
        this.schedulerJobDefinitionService
            .UpdateSchedulerJobDefinition(data)
            .then(() => {
                this.schedulerJobDefinitionService.onSchedulerJobDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Schedulers/SchedulerJobDefinitions/searchSchedulerJobDefinition",
                ]);
                this.searchSchedulerJobDefinitionService.SearchSchedulerJobDefinition(
                    this.schedulerJob
                );
                this.updateAlertSchedulerJobDefinition.UpdateAlertSchedulerJobDefinitionShow();
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
        this.schedulerJob.StartDateTime = utcDate;
        const startDateTime = new Date(this.schedulerJob.StartDateTime);
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
        this.schedulerJob.EndDateTime = utcDate;
        const endDateTime = new Date(this.schedulerJob.EndDateTime);
        const endDateTimeString = endDateTime.toISOString();
    }

    /**
     * SchedulerJobForm
     */
    SchedulerJobForm(): void {
        this.dialogRef = this._matDialog.open(SchedulerJobFormDialogComponent, {
            panelClass: "schedulerJobForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var schedulerJobRequest = response.getRawValue();
            this.schedulerJobDefinitionService
                .CreateSchedulerJobDefinitionDetail(schedulerJobRequest)
                .then(() => {
                    this.schedulerJobDefinitionService
                        .GetSchedulerJobDefinition()
                        .then(() => {
                            this.refreshSchedulerJobDetailDataSource();
                        });
                });
        });
    }

    /**
     * EditSchedulerJob
     *
     * @param schedulerJob
     */
    EditSchedulerJob(schedulerJob): void {
        this.dialogRef = this._matDialog.open(SchedulerJobFormDialogComponent, {
            panelClass: "schedulerJobForm-dialog",
            data: {
                schedulerJob: schedulerJob,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var schedulerJobRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.schedulerJobDefinitionService
                        .UpdateSchedulerJobDefinitionDetail(schedulerJobRequest)
                        .then(() => {
                            this.schedulerJobDefinitionService
                                .GetSchedulerJobDefinition()
                                .then(() => {
                                    this.refreshSchedulerJobDetailDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSchedulerJobDefinitionDetail
                 */
                case "delete":
                    this.DeleteSchedulerJobDefinitionDetail(schedulerJob);
                    break;
            }
        });
    }

    /**
     * DeleteSchedulerJobDefinitionDetail
     */
    DeleteSchedulerJobDefinitionDetail(schedulerJob): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.schedulerJobDefinitionService
                    .DeleteSchedulerJobDefinitionDetail(schedulerJob)
                    .then(() => {
                        this.schedulerJobDefinitionService
                            .GetSchedulerJobDefinition()
                            .then(() => {
                                this.refreshSchedulerJobDetailDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }

    onClearTenant(): void {
        this.schedulerJobDefinitionForm.patchValue({
            TenantId: 0,
        });
        this.schedulerJob.TenantId = 0;
    }
}
