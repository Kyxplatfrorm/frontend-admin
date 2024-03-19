import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SystemFileFormat } from "./systemFileFormats.model";
import {
    FileDirectionTypeEntity,
    FileFormatTypeEntity,
} from "app/ui/systemFileFormat";
import { SystemFileFormatsService } from "./systemFileFormats.service";
import { SearchSystemFileFormatService } from "../searchSystemFileFormat/searchSystemFileFormat.service";

@Component({
    selector: "systemFileFormats",
    templateUrl: "./systemFileFormats.component.html",
    styleUrls: ["./systemFileFormats.component.scss"],
})
export class SystemFileFormatsComponent {
    systemFileFormat: SystemFileFormat;
    systemFileFormatsForm: FormGroup;
    fileFormatType: FileFormatTypeEntity[];
    fileDirectionType: FileDirectionTypeEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSystemFileFormatservice: SearchSystemFileFormatService,
        private systemFileFormatsService: SystemFileFormatsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.systemFileFormat = new SystemFileFormat();
    }

    ngOnInit(): void {
        this.systemFileFormatsService.GetFileDirectionTypes().then(() => {
            this.fileDirectionType =
                this.systemFileFormatsService.fileDirectionTypeApiResponse.ParameterList;
        });

        this.systemFileFormatsService.GetFileFormatTypes().then(() => {
            this.fileFormatType =
                this.systemFileFormatsService.fileFormatTypeApiResponse.ParameterList;
        });

        this.systemFileFormatsForm = this.createSystemFileFormatsForm();
    }

    /**
     *  createSystemFileFormatsForm
     *
     * @returns {FormGroup}
     */
    createSystemFileFormatsForm(): FormGroup {
        return this._formBuilder.group({
            FileFormatTypeId: [this.systemFileFormat.FileFormatTypeId],
            FileDirectionTypeId: [this.systemFileFormat.FileDirectionTypeId],
            FileFormatCode: [this.systemFileFormat.FileFormatCode],
            FileNameFormat: [this.systemFileFormat.FileNameFormat],
            Description: [this.systemFileFormat.Description],
            SearchStartDate: [this.systemFileFormat.SearchStartDate],
            SearchEndDate: [this.systemFileFormat.SearchEndDate],
        });
    }

    /**
     * SearchSystemFileFormat
     */
    SearchSystemFileFormat(): void {
        const data = this.systemFileFormatsForm.getRawValue();
        this.searchSystemFileFormatservice
            .SearchSystemFileFormat(data)
            .then(() => {
                this.searchSystemFileFormatservice.onSearchSystemFileFormatChanged.next(
                    data
                );
                this.router.navigate([
                    "/System/SystemFileFormat/searchSystemFileFormat",
                ]);
            });
    }

    ClearButton() {
        this.systemFileFormatsForm.controls["FileFormatTypeId"].reset();
        this.systemFileFormatsForm.controls["FileDirectionTypeId"].reset();
        this.systemFileFormatsForm.controls["FileFormatCode"].reset();
        this.systemFileFormatsForm.controls["FileNameFormat"].reset();
        this.systemFileFormatsForm.controls["Description"].reset();
        this.systemFileFormatsForm.controls["SearchStartDate"].reset();
        this.systemFileFormatsForm.controls["SearchEndDate"].reset();
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
        this.systemFileFormat.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.systemFileFormat.SearchStartDate);
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

        this.systemFileFormat.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.systemFileFormat.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
