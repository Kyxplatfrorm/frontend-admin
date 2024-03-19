import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SwitchParseError } from "./switchParseErrorLogs.model";
import { SearchSwitchParseErrorLogsService } from "../searchParseErrorLogs/searchParseErrorLogs.service";

@Component({
    selector: "switchParseErrorLogs",
    templateUrl: "./switchParseErrorLogs.component.html",
    styleUrls: ["./switchParseErrorLogs.component.scss"],
})
export class SwitchParseErrorLogsComponent {
    switchParseError: SwitchParseError;
    switchParseErrorLogsForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSwitchParseErrorLogsService: SearchSwitchParseErrorLogsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchParseError = new SwitchParseError();
        this.switchParseError.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.searchSwitchParseErrorLogsService.ClearSearchSwitchParseErrorLogDataSource();
        this.switchParseErrorLogsForm = this.createSwitchParseErrorLogsForm();
    }

    /**
     *  createSwitchParseErrorLogsForm
     *
     * @returns {FormGroup}
     */
    createSwitchParseErrorLogsForm(): FormGroup {
        return this._formBuilder.group({
            ApplicationType: [this.switchParseError.ApplicationType],
            ApplicationId: [this.switchParseError.ApplicationId],
            SessionId: [this.switchParseError.SessionId],
            ServerName: [this.switchParseError.ServerName],
            RemoteIpAddress: [this.switchParseError.RemoteIpAddress],
            RemotePort: [this.switchParseError.RemotePort],
            LocalIpAddress: [this.switchParseError.LocalIpAddress],
            LocalPort: [this.switchParseError.LocalPort],
            SearchStartDate: [this.switchParseError.SearchStartDate],
            SearchEndDate: [this.switchParseError.SearchEndDate],
            SearchStartTime: [this.switchParseError.SearchStartTime],
            SearchEndTime: [this.switchParseError.SearchEndTime],
        });
    }
    /**
     * SearchSwitchParseErrorLog
     */
    SearchSwitchParseErrorLog(): void {
        const data = this.switchParseErrorLogsForm.getRawValue();
        this.searchSwitchParseErrorLogsService
            .SearchSwitchParseErrorLog(data)
            .then(() => {
                this.searchSwitchParseErrorLogsService.onSearchSwitchParseErrorLogsChanged.next(
                    data
                );
                this.router.navigate([
                    "/SwitchReport/SwitchParseErrorReport/searchParseErrorLogs",
                ]);
            });
    }

    ClearButton() {
        this.switchParseErrorLogsForm.controls["ApplicationType"].reset();
        this.switchParseErrorLogsForm.controls["ApplicationId"].reset();
        this.switchParseErrorLogsForm.controls["SessionId"].reset();
        this.switchParseErrorLogsForm.controls["ServerName"].reset();
        this.switchParseErrorLogsForm.controls["RemoteIpAddress"].reset();
        this.switchParseErrorLogsForm.controls["RemotePort"].reset();
        this.switchParseErrorLogsForm.controls["LocalIpAddress"].reset();
        this.switchParseErrorLogsForm.controls["LocalPort"].reset();
        this.switchParseErrorLogsForm.controls["SearchStartDate"].reset();
        this.switchParseErrorLogsForm.controls["SearchEndDate"].reset();
        this.switchParseErrorLogsForm.controls["SearchStartTime"].reset();
        this.switchParseErrorLogsForm.controls["SearchEndTime"].reset();
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
        this.switchParseError.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.switchParseError.SearchStartDate);
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

        this.switchParseError.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.switchParseError.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
