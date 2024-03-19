import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { TenantWebHook } from "./tenantWebHookProfiles.model";
import {
    TenantDefinitionEntity,
    WebHookTypeEntity,
} from "app/ui/tenantWebHookProfile";
import { TenantWebHookProfilesService } from "./tenantWebHookProfiles.service";
import { SearchTenantWebHookProfileService } from "../searchTenantWebHookProfile/searchTenantWebHookProfile.service";

@Component({
    selector: "tenantWebHookProfiles",
    templateUrl: "./tenantWebHookProfiles.component.html",
    styleUrls: ["./tenantWebHookProfiles.component.scss"],
})
export class TenantWebHookProfilesComponent {
    tenantWebHook: TenantWebHook;
    tenantWebHookProfilesForm: FormGroup;
    webHookType: WebHookTypeEntity[];
    tenant: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchTenantWebHookProfileService: SearchTenantWebHookProfileService,
        private tenantWebHookProfilesService: TenantWebHookProfilesService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.tenantWebHook = new TenantWebHook();
    }

    ngOnInit(): void {
        this.tenantWebHookProfilesService.GetWebHookTypes().then(() => {
            this.webHookType =
                this.tenantWebHookProfilesService.webHookTypeApiResponse.ParameterList;
        });

        this.tenantWebHookProfilesService.GetTenants().then(() => {
            this.tenant =
                this.tenantWebHookProfilesService.tenantApiResponse.TenantDefinitionList;
        });

        this.tenantWebHookProfilesForm = this.createTenantWebHookProfilesForm();
    }

    /**
     *  createTenantWebHookProfilesForm
     *
     * @returns {FormGroup}
     */
    createTenantWebHookProfilesForm(): FormGroup {
        return this._formBuilder.group({
            WebHookTypeId: [this.tenantWebHook.WebHookTypeId],
            WebHookUrl: [this.tenantWebHook.WebHookUrl],
            TenantId: [this.tenantWebHook.TenantId],
            WebHookApiPath: [this.tenantWebHook.WebHookApiPath],
            HttpHeaderApiKeyName: [this.tenantWebHook.HttpHeaderApiKeyName],
            EncryptedApiKey: [this.tenantWebHook.EncryptedApiKey],
            SearchStartDate: [this.tenantWebHook.SearchStartDate],
            SearchEndDate: [this.tenantWebHook.SearchEndDate],
        });
    }

    /**
     * SearchTenantWebHookDefinition
     */
    SearchTenantWebHookDefinition(): void {
        const data = this.tenantWebHookProfilesForm.getRawValue();
        this.searchTenantWebHookProfileService
            .SearchTenantWebHookProfile(data)
            .then(() => {
                this.searchTenantWebHookProfileService.onSearchTenantWebHookProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "/WebHook/TenantWebHookProfiles/searchTenantWebHookProfile",
                ]);
            });
    }

    ClearButton() {
        this.tenantWebHookProfilesForm.controls["WebHookTypeId"].reset();
        this.tenantWebHookProfilesForm.controls["WebHookUrl"].reset();
        this.tenantWebHookProfilesForm.controls["TenantId"].reset();
        this.tenantWebHookProfilesForm.controls["WebHookApiPath"].reset();
        this.tenantWebHookProfilesForm.controls["HttpHeaderApiKeyName"].reset();
        this.tenantWebHookProfilesForm.controls["EncryptedApiKey"].reset();
        this.tenantWebHookProfilesForm.controls["SearchStartDate"].reset();
        this.tenantWebHookProfilesForm.controls["SearchEndDate"].reset();
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
        this.tenantWebHook.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.tenantWebHook.SearchStartDate);
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

        this.tenantWebHook.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.tenantWebHook.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
