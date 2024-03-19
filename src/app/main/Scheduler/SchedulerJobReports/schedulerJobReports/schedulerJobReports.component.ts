import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SchedulerJobReport } from "./schedulerJobReports.model";
import {
    SchedulerJobStatusEntity,
    SchedulerJobTypeEntity,
    SchedulerRecurringTypeEntity,
} from "app/ui/schedulerJobReport";
import { SchedulerJobReportsService } from "./schedulerJobReports.service";
import { SearchSchedulerJobReportsService } from "../searchSchedulerJobReports/searchSchedulerJobReports.service";

@Component({
    selector: "schedulerJobReports",
    templateUrl: "./schedulerJobReports.component.html",
    styleUrls: ["./schedulerJobReports.component.scss"],
})
export class SchedulerJobReportsComponent {
    schedulerJobReport: SchedulerJobReport;
    schedulerJobReportsForm: FormGroup;
    runStatus: SchedulerJobStatusEntity[];
    schedulerJobType: SchedulerJobTypeEntity[];
    schedulerRecurringType: SchedulerRecurringTypeEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private schedulerJobReportsService: SchedulerJobReportsService,
        private searchSchedulerJobReportsService: SearchSchedulerJobReportsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerJobReport = new SchedulerJobReport();
    }

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

        this.schedulerJobReportsForm = this.createSchedulerJobReportsForm();
        const today = new Date();
        this.schedulerJobReport.SearchStartDate = today;
    }

    /**
     *  createSchedulerJobReportsForm
     *
     * @returns {FormGroup}
     */
    createSchedulerJobReportsForm(): FormGroup {
        return this._formBuilder.group({
            ApplicationId: [this.schedulerJobReport.ApplicationId],
            TotalElapsed: [this.schedulerJobReport.TotalElapsed],
            RecurringTypeId: [this.schedulerJobReport.RecurringTypeId],
            RunStatusId: [this.schedulerJobReport.RunStatusId],
            SchedulerJobTypeId: [this.schedulerJobReport.SchedulerJobTypeId],
            OrderId: [this.schedulerJobReport.OrderId],
            SearchStartDate: [this.schedulerJobReport.SearchStartDate],
            SearchEndDate: [this.schedulerJobReport.SearchEndDate],
            SchedulerJobId: [this.schedulerJobReport.SchedulerJobId],
        });
    }

    /**
     * SearchSchedulerJobReports
     */
    SearchSchedulerJobReports(): void {
        const data = this.schedulerJobReportsForm.getRawValue();
        this.searchSchedulerJobReportsService
            .SearchSchedulerJobReports(data)
            .then(() => {
                this.searchSchedulerJobReportsService.onSearchSchedulerJobReportsChanged.next(
                    data
                );
                this.router.navigate([
                    "/Schedulers/SchedulerJobReports/searchSchedulerJobReports",
                ]);
            });
    }

    ClearButton() {
        this.schedulerJobReportsForm.controls["ApplicationId"].reset();
        this.schedulerJobReportsForm.controls["TotalElapsed"].reset();
        this.schedulerJobReportsForm.controls["RecurringTypeId"].reset();
        this.schedulerJobReportsForm.controls["RunStatusId"].reset();
        this.schedulerJobReportsForm.controls["SchedulerJobTypeId"].reset();
        this.schedulerJobReportsForm.controls["OrderId"].reset();
        this.schedulerJobReportsForm.controls["SearchStartDate"].reset();
        this.schedulerJobReportsForm.controls["SearchEndDate"].reset();
        this.schedulerJobReportsForm.controls["SchedulerJobId"].reset();
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
        this.schedulerJobReport.SearchStartDate = utcDate;
        const searchStartDate = new Date(
            this.schedulerJobReport.SearchStartDate
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

        this.schedulerJobReport.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.schedulerJobReport.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
