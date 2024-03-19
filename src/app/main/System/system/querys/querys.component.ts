import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { Query } from "./querys.model";
import { SearchQueryService } from "../searchQuery/searchQuery.service";
import { QueryTypeEntity } from "app/ui/query";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Router } from "@angular/router";

@Component({
    selector: "querys",
    templateUrl: "./querys.component.html",
    styleUrls: ["./querys.component.scss"],
})
export class QuerysComponent {
    query: Query;
    querysForm: FormGroup;
    queryTypeList: QueryTypeEntity[];
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchQueryService: SearchQueryService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.query = new Query();
        this._unsubscribeAll = new Subject();
        this.query.InsertBeginDateTime = new Date();
    }

    ngOnInit(): void {
        this.searchQueryService.ClearSearchQueryDataSource();
        this.searchQueryService.GetQueryTypes().then(() => {
            this.queryTypeList =
                this.searchQueryService.queryTypeResponse.ParameterList;
        });
        this.querysForm = this.createQueryForm();
    }

    /**
     *  createQueryForm
     *
     * @returns {FormGroup}
     */
    createQueryForm(): FormGroup {
        return this._formBuilder.group({
            QueryTypeId: [this.query.QueryTypeId],
            QueryCode: [this.query.QueryCode],
            Description: [this.query.Description],
            InsertBeginDateTime: [this.query.InsertBeginDateTime],
            InsertEndDateTime: [this.query.InsertEndDateTime],
            UpdateBeginDateTime: [this.query.UpdateBeginDateTime],
            UpdateEndDateTime: [this.query.UpdateEndDateTime],
        });
    }
    ClearButton() {
        this.querysForm.controls["QueryTypeId"].reset();
        this.querysForm.controls["QueryCode"].reset();
        this.querysForm.controls["Description"].reset();
        this.querysForm.controls["InsertBeginDateTime"].reset();
        this.querysForm.controls["InsertEndDateTime"].reset();
        this.querysForm.controls["UpdateBeginDateTime"].reset();
        this.querysForm.controls["UpdateEndDateTime"].reset();
    }
    /**
     * SearchQuery
     */
    SearchQuery(): void {
        const data = this.querysForm.getRawValue();
        this.searchQueryService.SearchQuery(data).then(() => {
            this.searchQueryService.onSearchQueryChanged.next(data);
            this.router.navigate(["/System/system/searchQuery"]);
        });
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
        this.query.InsertBeginDateTime = utcDate;
        const ınsertBeginDate = new Date(this.query.InsertBeginDateTime);
        const ınsertBeginDateString = ınsertBeginDate.toISOString();
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
        this.query.InsertEndDateTime = utcDate;
        const ınsertEndDateTime = new Date(this.query.InsertEndDateTime);
        const ınsertEndDateTimeString = ınsertEndDateTime.toISOString();
    }
    onDateBeginChange(event: MatDatepickerInputEvent<Date>) {
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
        this.query.UpdateBeginDateTime = utcDate;
        const updateBeginDateTime = new Date(this.query.UpdateBeginDateTime);
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
        this.query.UpdateEndDateTime = utcDate;
        const updateEndDateTime = new Date(this.query.UpdateEndDateTime);
        const updateEndDateTimeString = updateEndDateTime.toISOString();
    }
}
