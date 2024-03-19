import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    SchedulerJobStatusEntity,
    SchedulerRecurringLevelEntity,
    SchedulerRecurringTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/schedulerJobDefinition";
import { SchedulerJobDefinitionsService } from "./schedulerJobDefinitions.service";
import { SchedulerJob } from "./schedulerJobDefinitions.model";
import { SearchSchedulerJobDefinitionService } from "../searchSchedulerJobDefinition/searchSchedulerJobDefinition.service";

@Component({
    selector: "schedulerJobDefinitions",
    templateUrl: "./schedulerJobDefinitions.component.html",
    styleUrls: ["./schedulerJobDefinitions.component.scss"],
})
export class SchedulerJobDefinitionsComponent {
    schedulerRecurringLevel: SchedulerRecurringLevelEntity[];
    schedulerRecurringType: SchedulerRecurringTypeEntity[];
    schedulerJobStatus: SchedulerJobStatusEntity[];
    tenant: TenantDefinitionEntity[];
    schedulerJobDefinitionsForm: FormGroup;
    schedulerJob: SchedulerJob;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSchedulerJobDefinitionService: SearchSchedulerJobDefinitionService,
        private schedulerJobDefinitionsService: SchedulerJobDefinitionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerJob = new SchedulerJob();
    }

    ngOnInit(): void {
        this.schedulerJobDefinitionsService
            .GetSchedulerRecurringLevels()
            .then(() => {
                this.schedulerRecurringLevel =
                    this.schedulerJobDefinitionsService.schedulerRecurringLevelApiResponse.ParameterList;
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

        this.schedulerJobDefinitionsForm =
            this.createSchedulerJobDefinitionsForm();
    }

    /**
     *  createSchedulerJobDefinitionsForm
     *
     * @returns {FormGroup}
     */
    createSchedulerJobDefinitionsForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.schedulerJob.TenantId],
            ServerCode: [this.schedulerJob.ServerCode],
            Description: [this.schedulerJob.Description],
            RecurringTypeId: [this.schedulerJob.RecurringTypeId],
            RecurringLevelId: [this.schedulerJob.RecurringLevelId],
            LastRunStatusId: [this.schedulerJob.LastRunStatusId],
            SearchStartDate: [this.schedulerJob.SearchStartDate],
            SearchEndDate: [this.schedulerJob.SearchEndDate],
            SearchStartTime: [this.schedulerJob.SearchStartTime],
            SearchEndTime: [this.schedulerJob.SearchEndTime],
        });
    }

    /**
     * SearchSchedulerJobDefinition
     */
    SearchSchedulerJobDefinition(): void {
        const data = this.schedulerJobDefinitionsForm.getRawValue();
        this.searchSchedulerJobDefinitionService
            .SearchSchedulerJobDefinition(data)
            .then(() => {
                this.searchSchedulerJobDefinitionService.onSchedulerJobDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Schedulers/SchedulerJobDefinitions/searchSchedulerJobDefinition",
                ]);
            });
    }

    ClearButton() {
        this.schedulerJobDefinitionsForm.controls["TenantId"].reset();
        this.schedulerJobDefinitionsForm.controls["ServerCode"].reset();
        this.schedulerJobDefinitionsForm.controls["Description"].reset();
        this.schedulerJobDefinitionsForm.controls["RecurringTypeId"].reset();
        this.schedulerJobDefinitionsForm.controls["RecurringLevelId"].reset();
        this.schedulerJobDefinitionsForm.controls["LastRunStatusId"].reset();
        this.schedulerJobDefinitionsForm.controls["SearchStartTime"].reset();
        this.schedulerJobDefinitionsForm.controls["SearchEndTime"].reset();
        this.schedulerJobDefinitionsForm.controls["SearchStartDate"].reset();
        this.schedulerJobDefinitionsForm.controls["SearchEndDate"].reset();
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
        this.schedulerJob.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.schedulerJob.SearchStartDate);
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

        this.schedulerJob.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.schedulerJob.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
