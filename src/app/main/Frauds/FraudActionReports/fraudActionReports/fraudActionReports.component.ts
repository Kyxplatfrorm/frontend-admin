import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    ApplicationTypeEntity,
    FraudRuleActionStatuesEntity,
    FraudRuleActionTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/fraudActionReport";
import { FraudAction } from "./fraudActionReports.model";
import { FraudActionReportsService } from "./fraudActionReports.service";
import { SearchFraudActionReportsService } from "../searchFraudActionReports/searchFraudActionReports.service";

@Component({
    selector: "fraudActionReports",
    templateUrl: "./fraudActionReports.component.html",
    styleUrls: ["./fraudActionReports.component.scss"],
})
export class FraudActionReportsComponent {
    fraudRuleActionType: FraudRuleActionTypeEntity[];
    fraudRuleActionStatus: FraudRuleActionStatuesEntity[];
    tenantDefinition: TenantDefinitionEntity[];
    applicationType: ApplicationTypeEntity[];
    fraudActionReportsForm: FormGroup;
    fraudAction: FraudAction;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchFraudActionReportsService: SearchFraudActionReportsService,
        private fraudActionReportsService: FraudActionReportsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.fraudAction = new FraudAction();
    }

    ngOnInit(): void {
        this.fraudActionReportsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.fraudActionReportsService.applicationTypeApiResponse.ParameterList;
        });

        this.fraudActionReportsService.GetTenants().then(() => {
            this.tenantDefinition =
                this.fraudActionReportsService.tenantApiResponse.TenantDefinitionList;
        });

        this.fraudActionReportsService.GetFraudRuleActionStatues().then(() => {
            this.fraudRuleActionStatus =
                this.fraudActionReportsService.fraudRuleActionStatuesApiResponse.ParameterList;
        });

        this.fraudActionReportsService.GetFraudRuleActionTypes().then(() => {
            this.fraudRuleActionType =
                this.fraudActionReportsService.fraudRuleActionTypeApiResponse.ParameterList;
        });

        this.fraudActionReportsForm = this.createFraudActionReportsForm();
    }

    /**
     *  createFraudActionReportsForm
     *
     * @returns {FormGroup}
     */
    createFraudActionReportsForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.fraudAction.TenantId],
            CompanyId: [this.fraudAction.CompanyId],
            CustomerId: [this.fraudAction.CustomerId],
            ApplicationTypeId: [this.fraudAction.ApplicationTypeId],
            FraudRuleActionTypeId: [this.fraudAction.FraudRuleActionTypeId],
            FraudRuleActionStatusId: [this.fraudAction.FraudRuleActionStatusId],
            ReferenceNumber: [this.fraudAction.ReferenceNumber],
            SearchStartDate: [this.fraudAction.SearchStartDate],
            SearchEndDate: [this.fraudAction.SearchEndDate],
        });
    }

    /**
     * SearchFraudAction
     */
    SearchFraudAction(): void {
        const data = this.fraudActionReportsForm.getRawValue();
        this.searchFraudActionReportsService
            .SearchFraudActionReport(data)
            .then(() => {
                this.searchFraudActionReportsService.onFraudActionReportsChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudActionReports/searchFraudActionReports",
                ]);
            });
    }

    ClearButton() {
        this.fraudActionReportsForm.controls["TenantId"].reset();
        this.fraudActionReportsForm.controls["CompanyId"].reset();
        this.fraudActionReportsForm.controls["ApplicationTypeId"].reset();
        this.fraudActionReportsForm.controls["FraudRuleActionStatusId"].reset();
        this.fraudActionReportsForm.controls["FraudRuleActionTypeId"].reset();
        this.fraudActionReportsForm.controls["ReferenceNumber"].reset();
        this.fraudActionReportsForm.controls["SearchStartDate"].reset();
        this.fraudActionReportsForm.controls["SearchEndDate"].reset();
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
        this.fraudAction.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.fraudAction.SearchStartDate);
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

        this.fraudAction.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.fraudAction.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
