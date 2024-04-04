import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { HsmTransaction } from "./hsmTransactionReports.model";
import { SearchHsmTransactionService } from "../searchHsmTransaction/searchHsmTransaction.service";
import { Router } from "@angular/router";

@Component({
    selector: "hsmTransactionReports",
    templateUrl: "./hsmTransactionReports.component.html",
    styleUrls: ["./hsmTransactionReports.component.scss"],
})
export class HsmTransactionReportsComponent {
    hsmTransaction: HsmTransaction;
    hsmTransactionReportsForm: FormGroup;
    private _unsubscribeAll: Subject<any>;
    isIndeterminate = true;
    isChecked = undefined;
    isLastIndeterminate = true;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchHsmTransactionService: SearchHsmTransactionService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.hsmTransaction = new HsmTransaction();
        this._unsubscribeAll = new Subject();
        this.hsmTransaction.SearchStartDate = new Date();
    }
    onChangeCheckbox(checkbox: MatCheckbox): void {
        this.isIndeterminate = checkbox.indeterminate;
        if (checkbox.indeterminate) {
            checkbox.indeterminate = false;
            checkbox.checked = true;
        } else if (!checkbox.indeterminate && !checkbox.checked) {
            checkbox.checked = false;
        } else if (!checkbox.indeterminate && checkbox.checked) {
            checkbox.indeterminate = true;
        }
        this.isLastIndeterminate = checkbox.indeterminate;
    }

    ngOnInit(): void {
        this.searchHsmTransactionService.ClearSearchHsmTransactionDataSource();
        this.hsmTransactionReportsForm = this.createHsmTransactionReportsForm();
    }

    /**
     *  createHsmTransactionReportsForm
     *
     * @returns {FormGroup}
     */
    createHsmTransactionReportsForm(): FormGroup {
        return this._formBuilder.group({
            CommandCode: [this.hsmTransaction.CommandCode],
            ResponseCode: [this.hsmTransaction.ResponseCode],
            HsmIpAddress: [this.hsmTransaction.HsmIpAddress],
            TotalElapsed: [this.hsmTransaction.TotalElapsed],
            SearchStartDate: [this.hsmTransaction.SearchStartDate],
            SearchEndDate: [this.hsmTransaction.SearchEndDate],
            SearchStartTime: [this.hsmTransaction.SearchStartTime],
            SearchEndTime: [this.hsmTransaction.SearchEndTime],
        });
    }

    /**
     * SearchHsmTransaction
     */
    SearchHsmTransaction(): void {
        const data = this.hsmTransactionReportsForm.getRawValue();
        if (this.isLastIndeterminate) {
            data.ShowActiveSessions = null;
        }
        this.searchHsmTransactionService.SearchHsmTransaction(data).then(() => {
            this.searchHsmTransactionService.onSearchHsmTransactionChanged.next(
                data
            );
            this.router.navigate([
                "/Switch/HsmTransactionReport/searchHsmTransaction",
            ]);
        });
    }

    ClearButton() {
        this.hsmTransactionReportsForm.controls["CommandCode"].reset();
        this.hsmTransactionReportsForm.controls["ResponseCode"].reset();
        this.hsmTransactionReportsForm.controls["HsmIpAddress"].reset();
        this.hsmTransactionReportsForm.controls[
            "ShowFailedTransactions"
        ].reset();
        this.hsmTransactionReportsForm.controls["TotalElapsed"].reset();
        this.hsmTransactionReportsForm.controls["SearchStartDate"].reset();
        this.hsmTransactionReportsForm.controls["SearchEndDate"].reset();
        this.hsmTransactionReportsForm.controls["SearchStartTime"].reset();
        this.hsmTransactionReportsForm.controls["SearchEndTime"].reset();
        this.isIndeterminate = true;
        this.isLastIndeterminate = true;
        this.isChecked = undefined;
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
        this.hsmTransaction.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.hsmTransaction.SearchStartDate);
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

        this.hsmTransaction.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.hsmTransaction.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
