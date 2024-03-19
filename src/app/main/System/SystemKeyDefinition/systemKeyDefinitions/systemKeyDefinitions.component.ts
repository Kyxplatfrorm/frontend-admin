import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SystemKey } from "./systemKeyDefinitions.model";
import { KeyTypeEntity } from "app/ui/systemKeyProfile";
import { SystemKeyDefinitionsService } from "./systemKeyDefinitions.service";
import { SearchSystemKeyDefinitionService } from "../searchSystemDefinition/searchSystemDefinition.service";

@Component({
    selector: "systemKeyDefinitions",
    templateUrl: "./systemKeyDefinitions.component.html",
    styleUrls: ["./systemKeyDefinitions.component.scss"],
})
export class SystemKeyDefinitionsComponent {
    systemKey: SystemKey;
    systemKeyDefinitionsForm: FormGroup;
    keyType: KeyTypeEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSystemKeyDefinitionService: SearchSystemKeyDefinitionService,
        private systemKeyDefinitionsService: SystemKeyDefinitionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.systemKey = new SystemKey();
    }

    ngOnInit(): void {
        this.systemKeyDefinitionsService.GetKeyTypes().then(() => {
            this.keyType =
                this.systemKeyDefinitionsService.keyTypeApiResponse.ParameterList;
        });

        this.systemKeyDefinitionsForm = this.createSystemKeyDefinitionsForm();
    }

    /**
     *  createSystemKeyDefinitionsForm
     *
     * @returns {FormGroup}
     */
    createSystemKeyDefinitionsForm(): FormGroup {
        return this._formBuilder.group({
            KeyTypeId: [this.systemKey.KeyTypeId],
            KeyCode: [this.systemKey.KeyCode],
            KeyValue: [this.systemKey.KeyValue],
            Description: [this.systemKey.Description],
            SearchStartDate: [this.systemKey.SearchStartDate],
            SearchEndDate: [this.systemKey.SearchEndDate],
        });
    }

    /**
     * SearchSystemKeyDefinition
     */
    SearchSystemKeyDefinition(): void {
        const data = this.systemKeyDefinitionsForm.getRawValue();
        this.searchSystemKeyDefinitionService
            .SearchSystemKeyDefinition(data)
            .then(() => {
                this.searchSystemKeyDefinitionService.onSearchSystemKeyDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/System/SystemKeyDefinition/searchSystemKeyDefinition",
                ]);
            });
    }

    ClearButton() {
        this.systemKeyDefinitionsForm.controls["KeyTypeId"].reset();
        this.systemKeyDefinitionsForm.controls["KeyCode"].reset();
        this.systemKeyDefinitionsForm.controls["KeyValue"].reset();
        this.systemKeyDefinitionsForm.controls["Description"].reset();
        this.systemKeyDefinitionsForm.controls["SearchStartDate"].reset();
        this.systemKeyDefinitionsForm.controls["SearchEndDate"].reset();
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
        this.systemKey.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.systemKey.SearchStartDate);
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

        this.systemKey.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.systemKey.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
