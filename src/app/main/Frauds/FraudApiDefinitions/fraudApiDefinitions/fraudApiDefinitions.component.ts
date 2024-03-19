import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ApplicationTypeEntity } from "app/ui/fraudApiDefinition";
import { FraudApi } from "./fraudApiDefinitions.model";
import { FraudApiDefinitionsService } from "./fraudApiDefinitions.service";
import { SearchFraudApiDefinitionsService } from "../searchFraudApiDefinitions/searchFraudApiDefinitions.service";

@Component({
    selector: "fraudApiDefinitions",
    templateUrl: "./fraudApiDefinitions.component.html",
    styleUrls: ["./fraudApiDefinitions.component.scss"],
})
export class FraudApiDefinitionsComponent {
    applicationType: ApplicationTypeEntity[];
    fraudApiDefinitionsForm: FormGroup;
    fraudApi: FraudApi;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchFraudApiDefinitionsService: SearchFraudApiDefinitionsService,
        private fraudApiDefinitionsService: FraudApiDefinitionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.fraudApi = new FraudApi();
    }

    ngOnInit(): void {
        this.fraudApiDefinitionsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.fraudApiDefinitionsService.applicationTypeApiResponse.ParameterList;
        });

        this.fraudApiDefinitionsForm = this.createFraudApiDefinitionsForm();
    }

    /**
     *  createFraudApiDefinitionsForm
     *
     * @returns {FormGroup}
     */
    createFraudApiDefinitionsForm(): FormGroup {
        return this._formBuilder.group({
            ApplicationTypeId: [this.fraudApi.ApplicationTypeId],
            Description: [this.fraudApi.Description],
            ControllerName: [this.fraudApi.ControllerName],
            ActionName: [this.fraudApi.ActionName],
            SearchStartDate: [this.fraudApi.SearchStartDate],
            SearchEndDate: [this.fraudApi.SearchEndDate],
        });
    }

    /**
     * SearchFraudApiDefinition
     */
    SearchFraudApiDefinition(): void {
        const data = this.fraudApiDefinitionsForm.getRawValue();
        this.searchFraudApiDefinitionsService
            .SearchFraudApiDefinition(data)
            .then(() => {
                this.searchFraudApiDefinitionsService.onFraudApiDefinitionsChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudApiDefinitions/searchFraudApiDefinitions",
                ]);
            });
    }

    ClearButton() {
        this.fraudApiDefinitionsForm.controls["ActionName"].reset();
        this.fraudApiDefinitionsForm.controls["Description"].reset();
        this.fraudApiDefinitionsForm.controls["ApplicationTypeId"].reset();
        this.fraudApiDefinitionsForm.controls["SearchStartDate"].reset();
        this.fraudApiDefinitionsForm.controls["SearchEndDate"].reset();
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
        this.fraudApi.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.fraudApi.SearchStartDate);
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

        this.fraudApi.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.fraudApi.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
