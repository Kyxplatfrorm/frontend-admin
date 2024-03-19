import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SwitchTimeout } from "./switchTimeoutLogs.model";
import { SearchSwitchTimeoutLogService } from "../searchTimeoutLog/searchTimeoutLog.service";
import {
    SwitchApplicationSessionEntity,
    SwitchApplicationsEntity,
} from "app/ui/switchReport";
import { SwitchTimeoutLogService } from "../switchTimeoutLog/switchTimeoutLog.service";
import { SearchSwitchParseErrorLogsService } from "../../SwitchParseErrorReport/searchParseErrorLogs/searchParseErrorLogs.service";
import { Router } from "@angular/router";

@Component({
    selector: "switchTimeoutLogs",
    templateUrl: "./switchTimeoutLogs.component.html",
    styleUrls: ["./switchTimeoutLogs.component.scss"],
})
export class SwitchTimeoutLogsComponent {
    switchTimeout: SwitchTimeout;
    switchTimeoutLogsForm: FormGroup;
    switchApplicationsList: SwitchApplicationsEntity[];
    switchApplicationSessionList: SwitchApplicationSessionEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSwitchTimeoutLogService: SearchSwitchTimeoutLogService,
        private switchTimeoutLogService: SwitchTimeoutLogService,
        private searchSwitchParseErrorLogsService: SearchSwitchParseErrorLogsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchTimeout = new SwitchTimeout();
        this.switchTimeout.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.searchSwitchTimeoutLogService.ClearSearchSwitchTimeoutLogDataSource();
        this.searchSwitchParseErrorLogsService
            .GetSwitchApplicationSessions()
            .then(() => {
                this.switchApplicationSessionList =
                    this.searchSwitchParseErrorLogsService.switchApplicationSessionApiResponse.ParameterList;
            });
        this.searchSwitchParseErrorLogsService
            .GetSwitchApplications()
            .then(() => {
                this.switchApplicationsList =
                    this.searchSwitchParseErrorLogsService.switchApplicationsApiResponse.ParameterList;
            });
        this.switchTimeoutLogsForm = this.createSwitchTimeoutLogsForm();
    }

    /**
     *  createSwitchTimeoutLogsForm
     *
     * @returns {FormGroup}
     */
    createSwitchTimeoutLogsForm(): FormGroup {
        return this._formBuilder.group({
            ApplicationType: [this.switchTimeout.ApplicationType],
            ApplicationId: [this.switchTimeout.ApplicationId],
            SessionId: [this.switchTimeout.SessionId],
            CardTokenNumber: [this.switchTimeout.CardTokenNumber],
            MerchantCode: [this.switchTimeout.MerchantCode],
            TerminalId: [this.switchTimeout.TerminalId],
            LocalIpAddress: [this.switchTimeout.LocalIpAddress],
            LocalPort: [this.switchTimeout.LocalPort],
            SearchStartDate: [this.switchTimeout.SearchStartDate],
            SearchEndDate: [this.switchTimeout.SearchEndDate],
            SearchStartTime: [this.switchTimeout.SearchStartTime],
            SearchEndTime: [this.switchTimeout.SearchEndTime],
            Mti: [this.switchTimeout.Mti],
            Rrn: [this.switchTimeout.Rrn],
            AuthorizationCode: [this.switchTimeout.AuthorizationCode],
            ServerName: [this.switchTimeout.ServerName],
            RemoteIpAddress: [this.switchTimeout.RemoteIpAddress],
            RemotePort: [this.switchTimeout.RemotePort],
        });
    }
    /**
     * SearchSwitchTimeoutLog
     */
    SearchSwitchTimeoutLog(): void {
        const data = this.switchTimeoutLogsForm.getRawValue();
        this.searchSwitchTimeoutLogService
            .SearchSwitchTimeoutLog(data)
            .then(() => {
                this.searchSwitchTimeoutLogService.onSearchSwitchTimeoutLogChanged.next(
                    data
                );
                this.router.navigate([
                    "/SwitchReport/SwitchTimeoutReport/searchTimeoutLog",
                ]);
            });
    }

    ClearButton() {
        this.switchTimeoutLogsForm.controls["ApplicationType"].reset();
        this.switchTimeoutLogsForm.controls["ApplicationId"].reset();
        this.switchTimeoutLogsForm.controls["SessionId"].reset();
        this.switchTimeoutLogsForm.controls["CardTokenNumber"].reset();
        this.switchTimeoutLogsForm.controls["RemoteIpAddress"].reset();
        this.switchTimeoutLogsForm.controls["RemotePort"].reset();
        this.switchTimeoutLogsForm.controls["LocalIpAddress"].reset();
        this.switchTimeoutLogsForm.controls["LocalPort"].reset();
        this.switchTimeoutLogsForm.controls["SearchStartDate"].reset();
        this.switchTimeoutLogsForm.controls["SearchEndDate"].reset();
        this.switchTimeoutLogsForm.controls["SearchStartTime"].reset();
        this.switchTimeoutLogsForm.controls["SearchEndTime"].reset();
        this.switchTimeoutLogsForm.controls["MerchantCode"].reset();
        this.switchTimeoutLogsForm.controls["TerminalId"].reset();
        this.switchTimeoutLogsForm.controls["Mti"].reset();
        this.switchTimeoutLogsForm.controls["Rrn"].reset();
        this.switchTimeoutLogsForm.controls["AuthorizationCode"].reset();
        this.switchTimeoutLogsForm.controls["ServerName"].reset();
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
        this.switchTimeout.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.switchTimeout.SearchStartDate);
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

        this.switchTimeout.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.switchTimeout.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
