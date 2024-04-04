import { ChangeDetectorRef, Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CardTransaction } from "./cardTransactions.model";
import {
    CardBrandEntity,
    CardTypeEntity,
    SwitchApplicationEntity,
    SwitchSessionEntity,
    TenantDefinitionEntity,
    TransactionCodeEntity,
    TransactionEffectEntity,
} from "app/ui/cardTransaction";
import { CardTransactionsService } from "./cardTransactions.service";
import { SearchCardTransactionService } from "../searchCardTransaction/searchCardTransaction.service";
import { CustomerCardFormDialogComponent } from "./customerCardForm/customerCardForm.component";
import { takeUntil } from "rxjs/operators";
import { CardTransactionCardTokenFormDialogComponent } from "./cardTransactionCardTokenForm/cardTransactionCardTokenForm.component";
import { Router } from "@angular/router";
import { SearchCustomerService } from "app/main/Customer/CustomerDefinition/searchCustomer/searchCustomer.service";
import { SearchCardService } from "app/main/Card/CardDefinition/searchCard/searchCard.service";
import { Card } from "app/main/Card/CardDefinition/searchCard/cardDefinitions.model";

@Component({
    selector: "cardTransactions",
    templateUrl: "./cardTransactions.component.html",
    styleUrls: ["./cardTransactions.component.scss"],
})
export class CardTransactionsComponent {
    cardTransaction: CardTransaction;
    cardTransactionsForm: FormGroup;
    cardBrand: CardBrandEntity[];
    cardType: CardTypeEntity[];
    transactionCode: TransactionCodeEntity[];
    transactionEffect: TransactionEffectEntity[];
    switchApplicationSessionList: SwitchSessionEntity[];
    switchApplicationList: SwitchApplicationEntity[];
    tenantDefinition: TenantDefinitionEntity[];
    dialogRef: any;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchCardTransactionService: SearchCardTransactionService,
        private cardTransactionsService: CardTransactionsService,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private searchCustomerService: SearchCustomerService,
        private searchCardService: SearchCardService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardTransaction = new CardTransaction();
        this._unsubscribeAll = new Subject();
        this.cardTransaction.SearchStartDate = new Date();
    }

    ngOnInit(): void {
        this.cardTransactionsService.GetTenants().then(() => {
            this.tenantDefinition =
                this.cardTransactionsService.tenantApiResponse.TenantDefinitionList;
        });
        this.cardTransactionsService.GetCardBrands().then(() => {
            this.cardBrand =
                this.cardTransactionsService.cardBrandApiResponse.ParameterList;
        });
        this.cardTransactionsService.GetCardTypes().then(() => {
            this.cardType =
                this.cardTransactionsService.cardTypeApiResponse.ParameterList;
        });
        this.cardTransactionsService.GetTransactionEffects().then(() => {
            this.transactionEffect =
                this.cardTransactionsService.transactionEffectApiResponse.ParameterList;
        });
        this.cardTransactionsService.GetTranscationCodes().then(() => {
            this.transactionCode =
                this.cardTransactionsService.transactionCodeApiResponse.ParameterList;
        });
        this.cardTransactionsService.GetSwitchApplicationSessions().then(() => {
            this.switchApplicationSessionList =
                this.cardTransactionsService.switchSessionApiResponse.ParameterList;
        });
        this.cardTransactionsService.GetSwitchApplications().then(() => {
            this.switchApplicationList =
                this.cardTransactionsService.switchApplicationApiResponse.ParameterList;
        });
        this.cardTransactionsForm = this.createCardTransactionForm();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     *  createCardTransactionForm
     *
     * @returns {FormGroup}
     */
    createCardTransactionForm(): FormGroup {
        return this._formBuilder.group({
            CardId: [this.cardTransaction.CardId],
            CustomerId: [this.cardTransaction.CustomerId],
            CompanyId: [this.cardTransaction.CompanyId],
            CardTokenNumber: [this.cardTransaction.CardTokenNumber],
            CardFinancialId: [this.cardTransaction.CardFinancialId],
            AccountId: [this.cardTransaction.AccountId],
            ReferenceNumber: [this.cardTransaction.ReferenceNumber],
            CardTypeId: [this.cardTransaction.CardTypeId],
            CardBrandId: [this.cardTransaction.CardBrandId],
            TransactionCodeId: [this.cardTransaction.TransactionCodeId],
            TransactionEffectId: [this.cardTransaction.TransactionEffectId],
            ResponseCode: [this.cardTransaction.ResponseCode],
            ErrorCode: [this.cardTransaction.ErrorCode],
            ApplicationId: [this.cardTransaction.ApplicationId],
            SessionId: [this.cardTransaction.SessionId],
            ApplicationNetwork: [this.cardTransaction.ApplicationNetwork],
            ProvisionTransactionType: [
                this.cardTransaction.ProvisionTransactionType,
            ],
            Mti: [this.cardTransaction.Mti],
            Atc: [this.cardTransaction.Atc],
            ServerName: [this.cardTransaction.ServerName],
            EmvTransactionId: [this.cardTransaction.EmvTransactionId],
            SearchStartDate: [this.cardTransaction.SearchStartDate],
            SearchEndDate: [this.cardTransaction.SearchEndDate],
            TotalElapsed: [this.cardTransaction.TotalElapsed],
            TenantId: [this.cardTransaction.TenantId],
        });
    }
    /**
     * SearchCardTransaction
     */
    SearchCardTransaction(): void {
        const data = this.cardTransactionsForm.getRawValue();
        this.searchCardTransactionService
            .SearchCardTransaction(data)
            .then(() => {
                this.searchCardTransactionService.onSearchCardTransactionChanged.next(
                    data
                );
            })
            .then(() => {
                this.router.navigate([
                    "/Report/CardTransactions/searchCardTransaction",
                ]);
            });
    }

    ClearButton() {
        this.cardTransactionsForm.controls["CardId"].reset();
        this.cardTransactionsForm.controls["TenantId"].reset();
        this.cardTransactionsForm.controls["CustomerId"].reset();
        this.cardTransactionsForm.controls["CompanyId"].reset();
        this.cardTransactionsForm.controls["CardTokenNumber"].reset();
        this.cardTransactionsForm.controls["CardFinancialId"].reset();
        this.cardTransactionsForm.controls["AccountId"].reset();
        this.cardTransactionsForm.controls["ReferenceNumber"].reset();
        this.cardTransactionsForm.controls["CardTypeId"].reset();
        this.cardTransactionsForm.controls["CardBrandId"].reset();
        this.cardTransactionsForm.controls["TransactionCodeId"].reset();
        this.cardTransactionsForm.controls["TransactionEffectId"].reset();
        this.cardTransactionsForm.controls["ResponseCode"].reset();
        this.cardTransactionsForm.controls["ErrorCode"].reset();
        this.cardTransactionsForm.controls["TotalElapsed"].reset();
        this.cardTransactionsForm.controls["ApplicationId"].reset();
        this.cardTransactionsForm.controls["SessionId"].reset();
        this.cardTransactionsForm.controls["ApplicationNetwork"].reset();
        this.cardTransactionsForm.controls["ProvisionTransactionType"].reset();
        this.cardTransactionsForm.controls["Mti"].reset();
        this.cardTransactionsForm.controls["Atc"].reset();
        this.cardTransactionsForm.controls["ServerName"].reset();
        this.cardTransactionsForm.controls["EmvTransactionId"].reset();
        this.cardTransactionsForm.controls["SearchStartDate"].reset();
        this.cardTransactionsForm.controls["SearchEndDate"].reset();
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
        this.cardTransaction.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.cardTransaction.SearchStartDate);
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

        this.cardTransaction.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.cardTransaction.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }

    newForm(): void {
        this.dialogRef = this._matDialog.open(CustomerCardFormDialogComponent, {
            panelClass: "customerCardForm-dialog",
            data: {
                action: "new",
                customerId: this.cardTransactionsForm.get("CustomerId").value,
            },
        });
        this.dialogRef.componentInstance.customerCardSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((card: Card) => {
                this.cardTransactionsForm.patchValue({
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

    CardList(): void {
        this.dialogRef = this._matDialog.open(
            CardTransactionCardTokenFormDialogComponent,
            {
                panelClass: "cardTransactionCardTokenForm-dialog",
                data: {
                    action: "new",
                    cardTokenNumber:
                        this.cardTransactionsForm.get("CardTokenNumber").value,
                },
            }
        );
        this.dialogRef.componentInstance.cardTransactionCardTokenSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((card: Card) => {
                this.cardTransactionsForm.patchValue({
                    CardTokenNumber: card.CardTokenNumber,
                    CustomerNumber: card.CustomerNumber,
                    IdentityNumber: card.IdentityNumber,
                    CellPhoneNumber: card.CellPhoneNumber,
                    Email: card.Email,
                    CardId: card.Id,
                });
            });
    }
}
