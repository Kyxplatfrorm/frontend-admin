import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { FraudRuleDefinitionsService } from "./fraudRuleDefinitions.service";
import {
    FraudGroupDefinitionEntity,
    FraudRuleActionTypeEntity,
    FraudRuleCheckTimeTypeEntity,
    NotificationTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/fraudRuleDefinitions";
import { FraudRule } from "./fraudRuleDefinitions.model";
import { SearchFraudRuleDefinitionsService } from "../searchFraudRuleDefinitions/searchFraudRuleDefinitions.service";

@Component({
    selector: "fraudRuleDefinitions",
    templateUrl: "./fraudRuleDefinitions.component.html",
    styleUrls: ["./fraudRuleDefinitions.component.scss"],
})
export class FraudRuleDefinitionsComponent {
    fraudGroupDefinition: FraudGroupDefinitionEntity[];
    tenantDefinition: TenantDefinitionEntity[];
    fraudRuleActionType: FraudRuleActionTypeEntity[];
    fraudRuleCheckTimeType: FraudRuleCheckTimeTypeEntity[];
    notificationType: NotificationTypeEntity[];
    fraudRuleDefinitionsForm: FormGroup;
    fraudRule: FraudRule;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchFraudRuleDefinitionsService: SearchFraudRuleDefinitionsService,
        private fraudRuleDefinitionsService: FraudRuleDefinitionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.fraudRule = new FraudRule();
    }

    ngOnInit(): void {
        this.fraudRuleDefinitionsService.GetFraudGroups().then(() => {
            this.fraudGroupDefinition =
                this.fraudRuleDefinitionsService.fraudGroupDefinitionApiResponse.FraudGroupDefinitionList;
        });

        this.fraudRuleDefinitionsService.GetTenants().then(() => {
            this.tenantDefinition =
                this.fraudRuleDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });

        this.fraudRuleDefinitionsService.GetFraudRuleActionTypes().then(() => {
            this.fraudRuleActionType =
                this.fraudRuleDefinitionsService.fraudRuleActionTypeApiResponse.ParameterList;
        });

        this.fraudRuleDefinitionsService.GetNotificationTypes().then(() => {
            this.notificationType =
                this.fraudRuleDefinitionsService.notificationTypeApiResponse.ParameterList;
        });

        this.fraudRuleDefinitionsService
            .GetFraudRuleCheckTimeTypes()
            .then(() => {
                this.fraudRuleCheckTimeType =
                    this.fraudRuleDefinitionsService.fraudRuleCheckTimeTypeApiResponse.ParameterList;
            });

        this.fraudRuleDefinitionsForm = this.createFraudRuleDefinitionsForm();
    }

    /**
     *  createFraudRuleDefinitionsForm
     *
     * @returns {FormGroup}
     */
    createFraudRuleDefinitionsForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.fraudRule.TenantId],
            Description: [this.fraudRule.Description],
            FraudGroupId: [this.fraudRule.FraudGroupId],
            FraudRuleActionTypeId: [this.fraudRule.FraudRuleActionTypeId],
            NotificationTypeId: [this.fraudRule.NotificationTypeId],
            FraudRuleCheckTimeTypeId: [this.fraudRule.FraudRuleCheckTimeTypeId],
            SearchStartDate: [this.fraudRule.SearchStartDate],
            SearchEndDate: [this.fraudRule.SearchEndDate],
        });
    }

    /**
     * SearchFraudRuleDefinition
     */
    SearchFraudRuleDefinition(): void {
        const data = this.fraudRuleDefinitionsForm.getRawValue();
        this.searchFraudRuleDefinitionsService
            .SearchFraudRuleDefinition(data)
            .then(() => {
                this.searchFraudRuleDefinitionsService.onFraudRuleDefinitionsChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudRuleDefinitions/searchFraudRuleDefinitions",
                ]);
            });
    }

    ClearButton() {
        this.fraudRuleDefinitionsForm.controls["TenantId"].reset();
        this.fraudRuleDefinitionsForm.controls["Description"].reset();
        this.fraudRuleDefinitionsForm.controls["FraudGroupId"].reset();
        this.fraudRuleDefinitionsForm.controls["FraudQuery"].reset();
        this.fraudRuleDefinitionsForm.controls["FraudRuleActionTypeId"].reset();
        this.fraudRuleDefinitionsForm.controls[
            "FraudRuleCheckTimeTypeId"
        ].reset();
        this.fraudRuleDefinitionsForm.controls["SearchStartDate"].reset();
        this.fraudRuleDefinitionsForm.controls["SearchEndDate"].reset();
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
        this.fraudRule.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.fraudRule.SearchStartDate);
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

        this.fraudRule.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.fraudRule.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
