import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SystemFileInformation } from "./systemFileInformations.model";
import {
    FileDirectionTypeEntity,
    FileFormatTypeEntity,
    FileSourceTypeEntity,
    FileStatusTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/systemFileInformation";
import { SystemFileInformationsService } from "./systemFileInformations.service";
import { SearchSystemFileInformationService } from "../searchSystemFileInformation/searchSystemFileInformation.service";

@Component({
    selector: "systemFileInformations",
    templateUrl: "./systemFileInformations.component.html",
    styleUrls: ["./systemFileInformations.component.scss"],
})
export class SystemFileInformationsComponent {
    systemFileInformation: SystemFileInformation;
    systemFileInformationsForm: FormGroup;
    tenant: TenantDefinitionEntity[];
    fileSourceType: FileSourceTypeEntity[];
    fileStatusType: FileStatusTypeEntity[];
    fileDirectionType: FileDirectionTypeEntity[];
    fileFormatType: FileFormatTypeEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSystemFileInformationService: SearchSystemFileInformationService,
        private systemFileInformationsService: SystemFileInformationsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.systemFileInformation = new SystemFileInformation();
        this.systemFileInformation.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.systemFileInformationsService.GetTenants().then(() => {
            this.tenant =
                this.systemFileInformationsService.tenantApiResponse.TenantDefinitionList;
        });

        this.systemFileInformationsService.GetFileDirectionTypes().then(() => {
            this.fileDirectionType =
                this.systemFileInformationsService.fileDirectionTypeApiResponse.ParameterList;
        });

        this.systemFileInformationsService.GetFileFormatTypes().then(() => {
            this.fileFormatType =
                this.systemFileInformationsService.fileFormatTypeApiResponse.ParameterList;
        });

        this.systemFileInformationsService.GetFileSources().then(() => {
            this.fileSourceType =
                this.systemFileInformationsService.fileSourceTypeApiResponse.ParameterList;
        });

        this.systemFileInformationsService.GetFileStatues().then(() => {
            this.fileStatusType =
                this.systemFileInformationsService.fileStatusTypeApiResponse.ParameterList;
        });
        this.systemFileInformationsForm =
            this.createSystemFileInformationsForm();
    }

    /**
     *  createSystemFileInformationsForm
     *
     * @returns {FormGroup}
     */
    createSystemFileInformationsForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.systemFileInformation.TenantId],
            FileFormatTypeId: [this.systemFileInformation.FileFormatTypeId],
            FileDirectionTypeId: [
                this.systemFileInformation.FileDirectionTypeId,
            ],
            FileStatusId: [this.systemFileInformation.FileStatusId],
            FileSourceId: [this.systemFileInformation.FileSourceId],
            FileName: [this.systemFileInformation.FileName],
            SearchStartDate: [this.systemFileInformation.SearchStartDate],
            SearchEndDate: [this.systemFileInformation.SearchEndDate],
        });
    }

    /**
     * SearchSystemFileInformation
     */
    SearchSystemFileInformation(): void {
        const data = this.systemFileInformationsForm.getRawValue();
        this.searchSystemFileInformationService
            .SearchSystemFileInformation(data)
            .then(() => {
                this.searchSystemFileInformationService.onSearchSystemFileInformationChanged.next(
                    data
                );
                this.router.navigate([
                    "/System/SystemFileInformation/searchSystemFileInformation",
                ]);
            });
    }

    ClearButton() {
        this.systemFileInformationsForm.controls["TenantId"].reset();
        this.systemFileInformationsForm.controls["FileFormatTypeId"].reset();
        this.systemFileInformationsForm.controls["FileDirectionTypeId"].reset();
        this.systemFileInformationsForm.controls["FileStatusId"].reset();
        this.systemFileInformationsForm.controls["FileSourceId"].reset();
        this.systemFileInformationsForm.controls["FileName"].reset();
        this.systemFileInformationsForm.controls["SearchStartDate"].reset();
        this.systemFileInformationsForm.controls["SearchEndDate"].reset();
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
        this.systemFileInformation.SearchStartDate = utcDate;
        const searchStartDate = new Date(
            this.systemFileInformation.SearchStartDate
        );
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

        this.systemFileInformation.SearchEndDate = utcDate;
        const searchEndDate = new Date(
            this.systemFileInformation.SearchEndDate
        );
        const searchEndDateString = searchEndDate.toISOString();
    }
}
