import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    SchedulerJobTypesEntity,
    TenantDefinitionEntity,
} from "app/ui/schedulerInstantJobProfile";
import { SchedulerInstant } from "./schedulerInstantJobProfiles.model";
import { SearchSchedulerInstantJobProfilesService } from "../searchSchedulerInstantJobProfiles/searchSchedulerInstantJobProfiles.service";
import { SchedulerInstantJobProfilesService } from "./schedulerInstantJobProfiles.service";

@Component({
    selector: "schedulerInstantJobProfiles",
    templateUrl: "./schedulerInstantJobProfiles.component.html",
    styleUrls: ["./schedulerInstantJobProfiles.component.scss"],
})
export class SchedulerInstantJobProfilesComponent {
    schedulerInstant: SchedulerInstant;
    schedulerInstantJobProfilesForm: FormGroup;
    tenant: TenantDefinitionEntity[];
    schedulerJobTypes: SchedulerJobTypesEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSchedulerInstantJobProfilesService: SearchSchedulerInstantJobProfilesService,
        private schedulerInstantJobProfilesService: SchedulerInstantJobProfilesService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerInstant = new SchedulerInstant();
    }

    ngOnInit(): void {
        this.schedulerInstantJobProfilesService
            .GetSchedulerJobTypes()
            .then(() => {
                this.schedulerJobTypes =
                    this.schedulerInstantJobProfilesService.schedulerJobTypesApiResponse.ParameterList;
            });

        this.schedulerInstantJobProfilesService.GetTenants().then(() => {
            this.tenant =
                this.schedulerInstantJobProfilesService.tenantApiResponse.TenantDefinitionList;
        });

        this.schedulerInstantJobProfilesForm =
            this.createSchedulerInstantJobProfilesForm();
    }

    /**
     *  createSchedulerInstantJobProfilesForm
     *
     * @returns {FormGroup}
     */
    createSchedulerInstantJobProfilesForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.schedulerInstant.TenantId],
            ApplicationName: [this.schedulerInstant.ApplicationName],
            ProfileCode: [this.schedulerInstant.ProfileCode],
            ServerCode: [this.schedulerInstant.ServerCode],
            Description: [this.schedulerInstant.Description],
            SchedulerJobTypeId: [this.schedulerInstant.SchedulerJobTypeId],
            SearchStartDate: [this.schedulerInstant.SearchStartDate],
            SearchEndDate: [this.schedulerInstant.SearchEndDate],
        });
    }
    /**
     * SearchSchedulerInstantJobProfile
     */
    SearchSchedulerInstantJobProfile(): void {
        const data = this.schedulerInstantJobProfilesForm.getRawValue();
        this.searchSchedulerInstantJobProfilesService
            .SearchSchedulerInstantJobProfile(data)
            .then(() => {
                this.searchSchedulerInstantJobProfilesService.onSearchSchedulerInstantJobProfilesChanged.next(
                    data
                );
                this.router.navigate([
                    "/Schedulers/SchedulerInstantJobProfiles/searchSchedulerInstantJobProfiles",
                ]);
            });
    }

    ClearButton() {
        this.schedulerInstantJobProfilesForm.controls["TenantId"].reset();
        this.schedulerInstantJobProfilesForm.controls[
            "ApplicationName"
        ].reset();
        this.schedulerInstantJobProfilesForm.controls["ProfileCode"].reset();
        this.schedulerInstantJobProfilesForm.controls["ServerCode"].reset();
        this.schedulerInstantJobProfilesForm.controls["Description"].reset();
        this.schedulerInstantJobProfilesForm.controls[
            "SchedulerJobTypeId"
        ].reset();
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
        this.schedulerInstant.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.schedulerInstant.SearchStartDate);
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

        this.schedulerInstant.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.schedulerInstant.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
