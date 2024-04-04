import { ChangeDetectorRef, Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { CardMemoReport } from "./cardMemoReports.model";
import { CardMemoReportsService } from "./cardMemoReports.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    ApplicationTypeEntity,
    MemoChannelTypeEntity,
    MemoCodeEntity,
    MemoKeyTypeEntity,
    MemoTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/cardMemoReport";
import { SearchCardMemoReportService } from "../searchCardMemoReport/searchCardMemoReport.service";
import { CustomerCardFormDialogComponent } from "../../CardTransactions/cardTransactions/customerCardForm/customerCardForm.component";
import { Card } from "app/main/Card/CardDefinition/searchCard/cardDefinitions.model";

@Component({
    selector: "cardMemoReports",
    templateUrl: "./cardMemoReports.component.html",
    styleUrls: ["./cardMemoReports.component.scss"],
})
export class CardMemoReportsComponent {
    cardMemoReport: CardMemoReport;
    cardMemoReportsForm: FormGroup;
    dialogRef: any;
    private _unsubscribeAll: Subject<any>;
    applicationType: ApplicationTypeEntity[];
    memoChannelType: MemoChannelTypeEntity[];
    memoKeyType: MemoKeyTypeEntity[];
    memoType: MemoTypeEntity[];
    memoCode: MemoCodeEntity[];
    tenant: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchCardMemoReportService: SearchCardMemoReportService,
        private cardMemoReportsService: CardMemoReportsService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardMemoReport = new CardMemoReport();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.cardMemoReportsService.GetTenants().then(() => {
            this.tenant =
                this.cardMemoReportsService.tenantApiResponse.TenantDefinitionList;
        });
        this.cardMemoReportsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.cardMemoReportsService.applicationTypeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoChannelTypes().then(() => {
            this.memoChannelType =
                this.cardMemoReportsService.memoChannelTypeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoCodes().then(() => {
            this.memoCode =
                this.cardMemoReportsService.memoCodeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoKeyTypes().then(() => {
            this.memoKeyType =
                this.cardMemoReportsService.memoKeyTypeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoTypes().then(() => {
            this.memoType =
                this.cardMemoReportsService.memoTypeApiResponse.ParameterList;
        });
        this.cardMemoReportsForm = this.createCardMemoReportsForm();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createCardMemoReportsForm
     *
     * @returns {FormGroup}
     */
    createCardMemoReportsForm(): FormGroup {
        return this._formBuilder.group({
            ApplicationTypeId: [this.cardMemoReport.ApplicationTypeId],
            TenantId: [this.cardMemoReport.TenantId],
            CustomerId: [this.cardMemoReport.CustomerId],
            MemoChannelTypeId: [this.cardMemoReport.MemoChannelTypeId],
            MemoKeyTypeId: [this.cardMemoReport.MemoKeyTypeId],
            MemoTypeId: [this.cardMemoReport.MemoTypeId],
            MemoCodeId: [this.cardMemoReport.MemoCodeId],
            Description: [this.cardMemoReport.Description],
            SearchStartDate: [this.cardMemoReport.SearchStartDate],
            SearchEndDate: [this.cardMemoReport.SearchEndDate],
        });
    }

    /**
     * SearchCardMemoReport
     */
    SearchCardMemoReport(): void {
        const data = this.cardMemoReportsForm.getRawValue();
        this.searchCardMemoReportService.SearchCardMemoReport(data).then(() => {
            this.searchCardMemoReportService.onSearchCardMemoReportChanged.next(
                data
            );
            this.router.navigate([
                "/Report/CardMemoReport/searchCardMemoReport",
            ]);
        });
    }

    ClearButton() {
        this.cardMemoReportsForm.controls["ApplicationTypeId"].reset();
        this.cardMemoReportsForm.controls["TenantId"].reset();
        this.cardMemoReportsForm.controls["CustomerId"].reset();
        this.cardMemoReportsForm.controls["MemoChannelTypeId"].reset();
        this.cardMemoReportsForm.controls["MemoKeyTypeId"].reset();
        this.cardMemoReportsForm.controls["MemoTypeId"].reset();
        this.cardMemoReportsForm.controls["MemoCodeId"].reset();
        this.cardMemoReportsForm.controls["Description"].reset();
        this.cardMemoReportsForm.controls["SearchStartDate"].reset();
        this.cardMemoReportsForm.controls["SearchEndDate"].reset();
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
        this.cardMemoReport.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.cardMemoReport.SearchStartDate);
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

        this.cardMemoReport.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.cardMemoReport.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }

    Customer(): void {
        this.dialogRef = this._matDialog.open(CustomerCardFormDialogComponent, {
            panelClass: "customerCardForm-dialog",
            data: {
                action: "new",
                customerId: this.cardMemoReportsForm.get("CustomerId").value,
            },
        });
        this.dialogRef.componentInstance.customerCardSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((card: Card) => {
                this.cardMemoReportsForm.patchValue({
                    CustomerId: card.Id,
                    ProductId: card.ProductId,
                    EmbossName: card.CustomerFullName,
                    CountryId: card.CountryId,
                    CityId: card.CityId,
                    CountyId: card.CountyId,
                    Address: card.Address,
                    ZipCode: card.ZipCode,
                });
            });
    }
}
