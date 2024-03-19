import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { NotificationTemplate } from "./notificationTemplateDefinitions.model";
import {
    LanguageCodeEntity,
    NotificationTypeEntity,
    TemplateTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/notificationTemplateDefinition";
import { NotificationTemplateDefinitionsService } from "./notificationTemplateDefinitions.service";
import { SearchNotificationTemplateDefinitionService } from "../searchNotificationTemplateDefinition/searchNotificationTemplateDefinition.service";

@Component({
    selector: "notificationTemplateDefinitions",
    templateUrl: "./notificationTemplateDefinitions.component.html",
    styleUrls: ["./notificationTemplateDefinitions.component.scss"],
})
export class NotificationTemplateDefinitionsComponent {
    notificationTemplate: NotificationTemplate;
    notificationTemplateDefinitionsForm: FormGroup;
    languageCode: LanguageCodeEntity[];
    templateTypeEntity: TemplateTypeEntity[];
    notificationType: NotificationTypeEntity[];
    tenant: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchNotificationTemplateDefinitionService: SearchNotificationTemplateDefinitionService,
        private notificationTemplateDefinitionsService: NotificationTemplateDefinitionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.notificationTemplate = new NotificationTemplate();
    }

    ngOnInit(): void {
        this.notificationTemplateDefinitionsService
            .GetLanguageCodes()
            .then(() => {
                this.languageCode =
                    this.notificationTemplateDefinitionsService.languageCodeApiResponse.ParameterList;
            });

        this.notificationTemplateDefinitionsService
            .GetNotificationTypes()
            .then(() => {
                this.notificationType =
                    this.notificationTemplateDefinitionsService.notificationTypeApiResponse.ParameterList;
            });

        this.notificationTemplateDefinitionsService.GetTenants().then(() => {
            this.tenant =
                this.notificationTemplateDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });

        this.notificationTemplateDefinitionsForm =
            this.createNotificationTemplateDefinitionsForm();
    }

    /**
     *  createNotificationTemplateDefinitionsForm
     *
     * @returns {FormGroup}
     */
    createNotificationTemplateDefinitionsForm(): FormGroup {
        return this._formBuilder.group({
            CompanyId: [this.notificationTemplate.CompanyId],
            TemplateTypeId: [this.notificationTemplate.TemplateTypeId],
            TenantId: [this.notificationTemplate.TenantId],
            LanguageCodeId: [this.notificationTemplate.LanguageCodeId],
            Subject: [this.notificationTemplate.Subject],
            Content: [this.notificationTemplate.Content],
            SearchStartDate: [this.notificationTemplate.SearchStartDate],
            SearchEndDate: [this.notificationTemplate.SearchEndDate],
        });
    }

    /**
     * SearchNotificationTemplateDefinition
     */
    SearchNotificationTemplateDefinition(): void {
        const data = this.notificationTemplateDefinitionsForm.getRawValue();
        this.searchNotificationTemplateDefinitionService
            .SearchNotificationTemplateDefinition(data)
            .then(() => {
                this.searchNotificationTemplateDefinitionService.onSearchNotificationTemplateDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Notifications/NotificationTemplateDefinitions/searchNotificationTemplateDefinition",
                ]);
            });
    }

    ClearButton() {
        this.notificationTemplateDefinitionsForm.controls[
            "TemplateTypeId"
        ].reset();
        this.notificationTemplateDefinitionsForm.controls[
            "LanguageCodeId"
        ].reset();
        this.notificationTemplateDefinitionsForm.controls["Subject"].reset();
        this.notificationTemplateDefinitionsForm.controls["Content"].reset();
        this.notificationTemplateDefinitionsForm.controls[
            "SearchEndDate"
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
        this.notificationTemplate.SearchStartDate = utcDate;
        const searchStartDate = new Date(
            this.notificationTemplate.SearchStartDate
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

        this.notificationTemplate.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.notificationTemplate.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
