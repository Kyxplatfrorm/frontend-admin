import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SearchSwitchParseErrorLogsService } from "../../SwitchParseErrorReport/searchParseErrorLogs/searchParseErrorLogs.service";
import { SwitchMessage } from "./switchMessageLogs.model";
import {
    SwitchApplicationSessionEntity,
    SwitchApplicationsEntity,
} from "app/ui/switchReport";
import { SearchSwitchMessageLogService } from "../searchMessageLog/searchMessageLog.service";
import { Router } from "@angular/router";

@Component({
    selector: "switchMessageLogs",
    templateUrl: "./switchMessageLogs.component.html",
    styleUrls: ["./switchMessageLogs.component.scss"],
})
export class SwitchMessageLogsComponent {
    switchMessage: SwitchMessage;
    switchMessageLogsForm: FormGroup;
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
        private searchSwitchMessageLogService: SearchSwitchMessageLogService,
        //  private switchMessageLogService: switchMessageLogService,
        private router: Router,
        private searchSwitchParseErrorLogsService: SearchSwitchParseErrorLogsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchMessage = new SwitchMessage();
        this.switchMessage.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.searchSwitchMessageLogService.ClearSearchSwitchMessageLogDataSource();
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
        this.switchMessageLogsForm = this.createSwitchMessageLogsForm();
    }

    /**
     *  createSwitchMessageLogsForm
     *
     * @returns {FormGroup}
     */
    createSwitchMessageLogsForm(): FormGroup {
        return this._formBuilder.group({
            ApplicationType: [this.switchMessage.ApplicationType],
            ApplicationId: [this.switchMessage.ApplicationId],
            SessionId: [this.switchMessage.SessionId],
            CardTokenNumber: [this.switchMessage.CardTokenNumber],
            MerchantCode: [this.switchMessage.MerchantCode],
            TerminalId: [this.switchMessage.TerminalId],
            LocalIpAddress: [this.switchMessage.LocalIpAddress],
            LocalPort: [this.switchMessage.LocalPort],
            SearchStartDate: [this.switchMessage.SearchStartDate],
            SearchEndDate: [this.switchMessage.SearchEndDate],
            SearchStartTime: [this.switchMessage.SearchStartTime],
            SearchEndTime: [this.switchMessage.SearchEndTime],
            Mti: [this.switchMessage.Mti],
            Rrn: [this.switchMessage.Rrn],
            AuthorizationCode: [this.switchMessage.AuthorizationCode],
            ServerName: [this.switchMessage.ServerName],
            RemoteIpAddress: [this.switchMessage.RemoteIpAddress],
            RemotePort: [this.switchMessage.RemotePort],
        });
    }
    /**
     * SearchSwitchMessageLog
     */
    SearchSwitchMessageLog(): void {
        const data = this.switchMessageLogsForm.getRawValue();
        this.searchSwitchMessageLogService
            .SearchSwitchMessageLog(data)
            .then(() => {
                this.searchSwitchMessageLogService.onSearchSwitchMessageLogChanged.next(
                    data
                );
                this.router.navigate([
                    "/SwitchReport/SwitchMessageReport/searchMessageLog",
                ]);
            });
    }

    ClearButton() {
        this.switchMessageLogsForm.controls["ApplicationType"].reset();
        this.switchMessageLogsForm.controls["ApplicationId"].reset();
        this.switchMessageLogsForm.controls["SessionId"].reset();
        this.switchMessageLogsForm.controls["CardTokenNumber"].reset();
        this.switchMessageLogsForm.controls["RemoteIpAddress"].reset();
        this.switchMessageLogsForm.controls["RemotePort"].reset();
        this.switchMessageLogsForm.controls["LocalIpAddress"].reset();
        this.switchMessageLogsForm.controls["LocalPort"].reset();
        this.switchMessageLogsForm.controls["SearchStartDate"].reset();
        this.switchMessageLogsForm.controls["SearchEndDate"].reset();
        this.switchMessageLogsForm.controls["SearchStartTime"].reset();
        this.switchMessageLogsForm.controls["SearchEndTime"].reset();
        this.switchMessageLogsForm.controls["MerchantCode"].reset();
        this.switchMessageLogsForm.controls["TerminalId"].reset();
        this.switchMessageLogsForm.controls["Mti"].reset();
        this.switchMessageLogsForm.controls["Rrn"].reset();
        this.switchMessageLogsForm.controls["AuthorizationCode"].reset();
        this.switchMessageLogsForm.controls["ServerName"].reset();
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
        this.switchMessage.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.switchMessage.SearchStartDate);
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

        this.switchMessage.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.switchMessage.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
