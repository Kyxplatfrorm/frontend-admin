import { ChangeDetectorRef, Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CardEmbossReport } from "./cardEmbossReports.model";
import { TenantDefinitionEntity } from "app/ui/cardEmbossReport";
import { CardEmbossReportsService } from "./cardEmbossReports.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SearchCardEmbossReportService } from "../searchCardEmbossReport/searchCardEmbossReport.service";

import { MatDialog } from "@angular/material/dialog";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { CardTransactionCardTokenFormDialogComponent } from "../../CardTransactions/cardTransactions/cardTransactionCardTokenForm/cardTransactionCardTokenForm.component";
import { CustomerCardFormDialogComponent } from "../../CardTransactions/cardTransactions/customerCardForm/customerCardForm.component";
import { Card } from "app/main/Card/CardDefinition/searchCard/cardDefinitions.model";

@Component({
    selector: "cardEmbossReports",
    templateUrl: "./cardEmbossReports.component.html",
    styleUrls: ["./cardEmbossReports.component.scss"],
})
export class CardEmbossReportsComponent {
    cardEmbossReport: CardEmbossReport;
    cardEmbossReportsForm: FormGroup;
    dialogRef: any;
    private _unsubscribeAll: Subject<any>;
    tenant: TenantDefinitionEntity[];
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchCardEmbossReportService: SearchCardEmbossReportService,
        private cardEmbossReportsService: CardEmbossReportsService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardEmbossReport = new CardEmbossReport();
        this._unsubscribeAll = new Subject();
        this.cardEmbossReport.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.cardEmbossReportsService.GetTenants().then(() => {
            this.tenant =
                this.cardEmbossReportsService.tenantApiResponse.TenantDefinitionList;
        });
        this.cardEmbossReportsForm = this.createCardEmbossReportsForm();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createCardEmbossReportsForm
     *
     * @returns {FormGroup}
     */
    createCardEmbossReportsForm(): FormGroup {
        return this._formBuilder.group({
            CardId: [this.cardEmbossReport.CardId],
            TenantId: [this.cardEmbossReport.TenantId],
            CustomerId: [this.cardEmbossReport.CustomerId],
            CardTokenNumber: [this.cardEmbossReport.CardTokenNumber],
            CardIssuingReasonType: [
                this.cardEmbossReport.CardIssuingReasonType,
            ],
            EmbossStatus: [this.cardEmbossReport.EmbossStatus],
            FileName: [this.cardEmbossReport.FileName],
            SearchStartDate: [this.cardEmbossReport.SearchStartDate],
            SearchEndDate: [this.cardEmbossReport.SearchEndDate],
        });
    }

    /**
     * SearchCardEmbossReport
     */
    SearchCardEmbossReport(): void {
        const data = this.cardEmbossReportsForm.getRawValue();
        this.searchCardEmbossReportService
            .SearchCardEmbossReport(data)
            .then(() => {
                this.searchCardEmbossReportService.onSearchCardEmbossReportChanged.next(
                    data
                );
                this.router.navigate([
                    "/Report/CardEmbossReport/searchCardEmbossReport",
                ]);
            });
    }

    ClearButton() {
        this.cardEmbossReportsForm.controls["CardId"].reset();
        this.cardEmbossReportsForm.controls["CustomerId"].reset();
        this.cardEmbossReportsForm.controls["TenantId"].reset();
        this.cardEmbossReportsForm.controls["CardTokenNumber"].reset();
        this.cardEmbossReportsForm.controls["CardIssuingReasonType"].reset();
        this.cardEmbossReportsForm.controls["EmbossStatus"].reset();
        this.cardEmbossReportsForm.controls["FileName"].reset();
        this.cardEmbossReportsForm.controls["SearchStartDate"].reset();
        this.cardEmbossReportsForm.controls["SearchEndDate"].reset();
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
        this.cardEmbossReport.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.cardEmbossReport.SearchStartDate);
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

        this.cardEmbossReport.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.cardEmbossReport.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }

    CardList(): void {
        this.dialogRef = this._matDialog.open(
            CardTransactionCardTokenFormDialogComponent,
            {
                panelClass: "cardTransactionCardTokenForm-dialog",
                data: {
                    action: "new",
                    cardTokenNumber:
                        this.cardEmbossReportsForm.get("CardTokenNumber").value,
                },
            }
        );
        this.dialogRef.componentInstance.cardTransactionCardTokenSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cardEmbossReport: CardEmbossReport) => {
                this.cardEmbossReportsForm.patchValue({
                    CardTokenNumber: cardEmbossReport.CardTokenNumber,
                    CardId: cardEmbossReport.Id,
                });
            });
    }

    Customer(): void {
        this.dialogRef = this._matDialog.open(CustomerCardFormDialogComponent, {
            panelClass: "customerCardForm-dialog",
            data: {
                action: "new",
                customerId: this.cardEmbossReportsForm.get("CustomerId").value,
            },
        });
        this.dialogRef.componentInstance.customerCardSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((card: Card) => {
                this.cardEmbossReportsForm.patchValue({
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
