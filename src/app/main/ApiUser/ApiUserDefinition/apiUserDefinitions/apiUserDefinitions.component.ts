import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ApiUser } from "./apiUserDefinitions.model";
import { ApiUserDefinitionsService } from "./apiUserDefinitions.service";
import { SearchApiUserDefinitionService } from "../searchApiUserDefinition/searchApiUserDefinition.service";
import { UserStatusEntity } from "app/ui/apiUserDefinition";
import { TenantDefinitionEntity } from "app/ui/tenant";
import { UserTypeEntity } from "app/ui/userDefinition";
import { Router } from "@angular/router";
import { TenantDefinitionsService } from "app/main/Tenant/TenantDefinitions/tenantDefinitions/tenantDefinitions.service";

@Component({
    selector: "apiUserDefinitions",
    templateUrl: "./apiUserDefinitions.component.html",
    styleUrls: ["./apiUserDefinitions.component.scss"],
})
export class ApiUserDefinitionsComponent {
    apiUser: ApiUser;
    apiUserDefinitionsForm: FormGroup;
    private _unsubscribeAll: Subject<any>;
    userStatusList: UserStatusEntity[];
    tenantList: TenantDefinitionEntity[];
    userTypeList: UserTypeEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private apiUserDefinitionsService: ApiUserDefinitionsService,
        private searchApiUserDefinitionService: SearchApiUserDefinitionService,
        private tenantDefinitionsService: TenantDefinitionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.apiUser = new ApiUser();
        this._unsubscribeAll = new Subject();
        // this.ApiUser.InsertBeginDateTime = new Date();
    }

    ngOnInit(): void {
        this.apiUserDefinitionsService.GetUserStatus().then(() => {
            this.userStatusList =
                this.apiUserDefinitionsService.userStatusResponse.ParameterList;
        });
        this.apiUserDefinitionsService.GetTenants().then(() => {
            this.tenantList =
                this.apiUserDefinitionsService.tenantDefApiResponse.TenantDefinitionList;
        });
        this.apiUserDefinitionsService.GetUserTypes().then(() => {
            this.userTypeList =
                this.apiUserDefinitionsService.userTypeResponse.ParameterList;
        });
        this.apiUserDefinitionsForm = this.createApiUserForm();
    }

    /**
     *  createApiUserForm
     *
     * @returns {FormGroup}
     */
    createApiUserForm(): FormGroup {
        return this._formBuilder.group({
            UserName: [this.apiUser.UserName],
            UserFullName: [this.apiUser.UserFullName],
            SelectedUserStatus: [this.apiUser.SelectedUserStatus],
            InsertBeginDateTime: [this.apiUser.InsertBeginDateTime],
            InsertEndDateTime: [this.apiUser.InsertEndDateTime],
            UpdateBeginDateTime: [this.apiUser.UpdateBeginDateTime],
            UpdateEndDateTime: [this.apiUser.UpdateEndDateTime],
            ApiKey: [this.apiUser.ApiKey],
            Email: [this.apiUser.Email],
            UserTypeId: [this.apiUser.UserTypeId],
            TenantId: [this.apiUser.TenantId],
        });
    }
    ClearButton() {
        this.apiUserDefinitionsForm.controls["UserName"].reset();
        this.apiUserDefinitionsForm.controls["UserFullName"].reset();
        this.apiUserDefinitionsForm.controls["SelectedUserStatus"].reset();
        this.apiUserDefinitionsForm.controls["InsertBeginDateTime"].reset();
        this.apiUserDefinitionsForm.controls["InsertEndDateTime"].reset();
        this.apiUserDefinitionsForm.controls["UpdateBeginDateTime"].reset();
        this.apiUserDefinitionsForm.controls["UpdateEndDateTime"].reset();
        this.apiUserDefinitionsForm.controls["ApiKey"].reset();
        this.apiUserDefinitionsForm.controls["Email"].reset();
        this.apiUserDefinitionsForm.controls["UserTypeId"].reset();
        this.apiUserDefinitionsForm.controls["TenantId"].reset();
    }

    /**
     * SearchApiUserDefinition
     */
    SearchApiUserDefinition(): void {
        const data = this.apiUserDefinitionsForm.getRawValue();
        this.searchApiUserDefinitionService.SearchApiUser(data).then(() => {
            this.searchApiUserDefinitionService.onSearchApiUserDefinitionChanged.next(
                data
            );
            this.router.navigate([
                "/ApiUser/ApiUserDefinition/searchApiUserDefinition",
            ]);
        });
    }

    onDateInsertBeginChange(event: MatDatepickerInputEvent<Date>) {
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

        this.apiUser.InsertBeginDateTime = utcDate;
        const insertBeginDateTime = new Date(this.apiUser.InsertBeginDateTime);
        const insertBeginDateTimeString = insertBeginDateTime.toISOString();
    }

    onDateInsertEndChange(event: MatDatepickerInputEvent<Date>) {
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

        this.apiUser.InsertEndDateTime = utcDate;
        const insertEndDateTime = new Date(this.apiUser.InsertEndDateTime);
        const insertEndDateTimeString = insertEndDateTime.toISOString();
    }
    onDateUpdateBeginChange(event: MatDatepickerInputEvent<Date>) {
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

        this.apiUser.UpdateBeginDateTime = utcDate;
        const updateBeginDateTime = new Date(this.apiUser.UpdateBeginDateTime);
        const updateBeginDateTimeString = updateBeginDateTime.toISOString();
    }

    onDateUpdateEndChange(event: MatDatepickerInputEvent<Date>) {
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

        this.apiUser.UpdateEndDateTime = utcDate;
        const updateEndDateTime = new Date(this.apiUser.UpdateEndDateTime);
        const updateEndDateTimeString = updateEndDateTime.toISOString();
    }
}
