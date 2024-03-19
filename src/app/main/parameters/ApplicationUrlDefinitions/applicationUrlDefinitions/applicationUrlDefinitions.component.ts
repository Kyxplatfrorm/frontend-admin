import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    ApplicationTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/urlDefinition";
import { ApplicationUrl } from "./applicationUrlDefinitions.model";
import { ApplicationUrlDefinitionsService } from "./applicationUrlDefinitions.service";
import { SearchApplicationUrlDefinitionsService } from "../searchApplicationUrlDefinitions/searchApplicationUrlDefinitions.service";

@Component({
    selector: "applicationUrlDefinitions",
    templateUrl: "./applicationUrlDefinitions.component.html",
    styleUrls: ["./applicationUrlDefinitions.component.scss"],
})
export class ApplicationUrlDefinitionsComponent {
    applicationType: ApplicationTypeEntity[];
    tenant: TenantDefinitionEntity[];
    applicationUrlDefinitionsForm: FormGroup;
    applicationUrl: ApplicationUrl;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchApplicationUrlDefinitionsService: SearchApplicationUrlDefinitionsService,
        private applicationUrlDefinitionsService: ApplicationUrlDefinitionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.applicationUrl = new ApplicationUrl();
    }

    ngOnInit(): void {
        this.applicationUrlDefinitionsService.GetTenants().then(() => {
            this.tenant =
                this.applicationUrlDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });

        this.applicationUrlDefinitionsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.applicationUrlDefinitionsService.applicationTypeApiResponse.ParameterList;
        });

        this.applicationUrlDefinitionsForm =
            this.createApplicationUrlDefinitionForm();
    }

    /**
     *  createApplicationUrlDefinitionForm
     *
     * @returns {FormGroup}
     */
    createApplicationUrlDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.applicationUrl.TenantId],
            ApplicationTypeId: [this.applicationUrl.ApplicationTypeId],
            Description: [this.applicationUrl.Description],
            Url: [this.applicationUrl.Url],
            SearchStartDate: [this.applicationUrl.SearchStartDate],
            SearchEndDate: [this.applicationUrl.SearchEndDate],
        });
    }

    /**
     * SearchApplicationUrlDefinition
     */
    SearchApplicationUrlDefinition(): void {
        const data = this.applicationUrlDefinitionsForm.getRawValue();
        this.searchApplicationUrlDefinitionsService
            .SearchApplicationUrlDefinition(data)
            .then(() => {
                this.searchApplicationUrlDefinitionsService.onApplicationUrlDefinitionsChanged.next(
                    data
                );
                this.router.navigate([
                    "/Parameters/ApplicationUrlDefinitions/searchApplicationUrlDefinitions",
                ]);
            });
    }

    ClearButton() {
        this.applicationUrlDefinitionsForm.controls["Url"].reset();
        this.applicationUrlDefinitionsForm.controls["Description"].reset();
        this.applicationUrlDefinitionsForm.controls[
            "ApplicationTypeId"
        ].reset();
        this.applicationUrlDefinitionsForm.controls["TenantId"].reset();
        this.applicationUrlDefinitionsForm.controls["SearchStartDate"].reset();
        this.applicationUrlDefinitionsForm.controls["SearchEndDate"].reset();
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
        this.applicationUrl.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.applicationUrl.SearchStartDate);
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

        this.applicationUrl.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.applicationUrl.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
