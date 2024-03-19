import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    RunStatusEntity,
    TenantDefinitionEntity,
} from "app/ui/schedulerJobErrorReport";
import { SchedulerJobErrorReport } from "./schedulerJobErrorReports.model";
import { SchedulerJobErrorReportsService } from "./schedulerJobErrorReports.service";
import { SearchSchedulerJobErrorReportsService } from "../searchSchedulerJobErrorReports/searchSchedulerJobErrorReports.service";

@Component({
    selector: "schedulerJobErrorReports",
    templateUrl: "./schedulerJobErrorReports.component.html",
    styleUrls: ["./schedulerJobErrorReports.component.scss"],
})
export class SchedulerJobErrorReportsComponent {
    runStatus: RunStatusEntity[];
    tenant: TenantDefinitionEntity[];
    schedulerJobErrorReportsForm: FormGroup;
    schedulerJobErrorReport: SchedulerJobErrorReport;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private schedulerJobErrorReportsService: SchedulerJobErrorReportsService,
        private searchSchedulerJobErrorReportsService: SearchSchedulerJobErrorReportsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerJobErrorReport = new SchedulerJobErrorReport();
    }

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

        this.schedulerJobErrorReportsForm =
            this.createSchedulerJobErrorReportsForm();
    }

    /**
     *  createSchedulerJobErrorReportsForm
     *
     * @returns {FormGroup}
     */
    createSchedulerJobErrorReportsForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.schedulerJobErrorReport.TenantId],
            ServerCode: [this.schedulerJobErrorReport.ServerCode],
            ErrorMessage: [this.schedulerJobErrorReport.ErrorMessage],
            RunStatusId: [this.schedulerJobErrorReport.RunStatusId],
            TotalElapsed: [this.schedulerJobErrorReport.TotalElapsed],
            SearchStartDate: [this.schedulerJobErrorReport.SearchStartDate],
            SearchEndDate: [this.schedulerJobErrorReport.SearchEndDate],
        });
    }

    /**
     * SearchSchedulerJobErrorReport
     */
    SearchSchedulerJobErrorReport(): void {
        const data = this.schedulerJobErrorReportsForm.getRawValue();
        this.searchSchedulerJobErrorReportsService
            .SearchSchedulerJobErrorReport(data)
            .then(() => {
                this.searchSchedulerJobErrorReportsService.onSearchSchedulerJobErrorReportsChanged.next(
                    data
                );
                this.router.navigate([
                    "/Schedulers/SchedulerJobErrorReports/searchSchedulerJobErrorReports",
                ]);
            });
    }

    ClearButton() {
        this.schedulerJobErrorReportsForm.controls["TenantId"].reset();
        this.schedulerJobErrorReportsForm.controls["ServerCode"].reset();
        this.schedulerJobErrorReportsForm.controls["ErrorMessage"].reset();
        this.schedulerJobErrorReportsForm.controls["RunStatusId"].reset();
        this.schedulerJobErrorReportsForm.controls["TotalElapsed"].reset();
        this.schedulerJobErrorReportsForm.controls["SearchStartDate"].reset();
        this.schedulerJobErrorReportsForm.controls["SearchEndDate"].reset();
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
        this.schedulerJobErrorReport.SearchStartDate = utcDate;
        const searchStartDate = new Date(
            this.schedulerJobErrorReport.SearchStartDate
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

        this.schedulerJobErrorReport.SearchEndDate = utcDate;
        const searchEndDate = new Date(
            this.schedulerJobErrorReport.SearchEndDate
        );
        const searchEndDateString = searchEndDate.toISOString();
    }
}
