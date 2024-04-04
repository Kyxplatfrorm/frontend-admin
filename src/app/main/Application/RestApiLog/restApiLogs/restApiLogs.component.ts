import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { RestApiLog } from "./restApiLogs.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SearchRestApiLogService } from "../searchRestApiLog/searchRestApiLog.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    ApiRunStatusEntity,
    HttpMethodEntity,
    TenantEntity,
} from "app/ui/restApiLog";
import { RestApiLogsService } from "./restApiLogs.service";
import { UserTypeEntity } from "app/ui/userDefinition";

@Component({
    selector: "restApiLogs",
    templateUrl: "./restApiLogs.component.html",
    styleUrls: ["./restApiLogs.component.scss"],
})
export class RestApiLogsComponent {
    restApiLog: RestApiLog;
    restApiLogsForm: FormGroup;
    tenant: TenantEntity[];
    apiRunStatus: ApiRunStatusEntity[];
    userTypeList: UserTypeEntity[];
    httpMethod: HttpMethodEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchRestApiLogService: SearchRestApiLogService,
        private restApiLogsService: RestApiLogsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.restApiLog = new RestApiLog();
        this.restApiLog.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.restApiLogsService.GetTenants().then(() => {
            this.tenant =
                this.restApiLogsService.tenantApiResponse.ParameterList;
        });

        this.restApiLogsService.GetApiRunStatues().then(() => {
            this.apiRunStatus =
                this.restApiLogsService.apiRunStatusApiResponse.ParameterList;
        });

        this.restApiLogsService.GetUserTypes().then(() => {
            this.userTypeList =
                this.restApiLogsService.userTypeResponse.ParameterList;
        });

        this.restApiLogsService.GetHttpMethods().then(() => {
            this.httpMethod =
                this.restApiLogsService.httpMethodApiResponse.ParameterList;
        });
        this.restApiLogsForm = this.createRestApiLogsForm();
    }

    /**
     *  createRestApiLogsForm
     *
     * @returns {FormGroup}
     */
    createRestApiLogsForm(): FormGroup {
        return this._formBuilder.group({
            UserName: [this.restApiLog.UserName],
            ApiName: [this.restApiLog.ApiName],
            ServerName: [this.restApiLog.ServerName],
            ServerType: [this.restApiLog.ServerType],
            ApiRunStatusId: [this.restApiLog.ApiRunStatusId],
            ApiReferenceNumber: [this.restApiLog.ApiReferenceNumber],
            TotalElapsed: [this.restApiLog.TotalElapsed],
            HttpResponseCode: [this.restApiLog.HttpResponseCode],
            SearchStartDate: [this.restApiLog.SearchStartDate],
            SearchEndDate: [this.restApiLog.SearchEndDate],
            SearchStartTime: [this.restApiLog.SearchStartTime],
            SearchEndTime: [this.restApiLog.SearchEndTime],
            TenantId: [this.restApiLog.TenantId],
            ControllerName: [this.restApiLog.ControllerName],
            ClientIp: [this.restApiLog.ClientIp],
            UserTypeId: [this.restApiLog.UserTypeId],
            HttpMethodId: [this.restApiLog.HttpMethodId],
        });
    }
    /**
     * SearchRestApiLog
     */
    SearchRestApiLog(): void {
        const data = this.restApiLogsForm.getRawValue();
        this.searchRestApiLogService.SearchRestApiLog(data).then(() => {
            this.searchRestApiLogService.onSearchRestApiLogChanged.next(data);
            this.router.navigate(["/Application/RestApiLog/searchRestApiLog"]);
        });
    }

    ClearButton() {
        this.restApiLogsForm.controls["UserName"].reset();
        this.restApiLogsForm.controls["ApiName"].reset();
        this.restApiLogsForm.controls["ServerName"].reset();
        this.restApiLogsForm.controls["ServerType"].reset();
        this.restApiLogsForm.controls["ApiRunStatusId"].reset();
        this.restApiLogsForm.controls["ApiReferenceNumber"].reset();
        this.restApiLogsForm.controls["TotalElapsed"].reset();
        this.restApiLogsForm.controls["HttpResponseCode"].reset();
        this.restApiLogsForm.controls["SearchStartDate"].reset();
        this.restApiLogsForm.controls["SearchEndDate"].reset();
        this.restApiLogsForm.controls["SearchStartTime"].reset();
        this.restApiLogsForm.controls["SearchEndTime"].reset();
        this.restApiLogsForm.controls["TenantId"].reset();
        this.restApiLogsForm.controls["ControllerName"].reset();
        this.restApiLogsForm.controls["ClientIp"].reset();
        this.restApiLogsForm.controls["UserTypeId"].reset();
        this.restApiLogsForm.controls["HttpMethodId"].reset();
        this.restApiLogsForm.controls["TenantId"].reset();
    }

    onDateChange(event: MatDatepickerInputEvent<Date>) {
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
        this.restApiLog.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.restApiLog.SearchStartDate);
        const searchStartDateString = searchStartDate.toISOString();
    }
    onDateEndChange(event: MatDatepickerInputEvent<Date>) {
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

        this.restApiLog.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.restApiLog.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
