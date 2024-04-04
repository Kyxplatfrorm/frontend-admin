import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";
import { CardTransaction } from "../cardTransactions/cardTransactions.model";
import {
    CardBrandEntity,
    CardEmvTransactionEntity,
    CardTypeEntity,
    SwitchMessagesEntity,
    TransactionCodeEntity,
    TransactionEffectEntity,
} from "app/ui/cardTransaction";
import { CardTransactionService } from "./cardTransaction.service";
import { CardTransactionsService } from "../cardTransactions/cardTransactions.service";
import { SearchCardTransactionService } from "../searchCardTransaction/searchCardTransaction.service";
import SwitchMessageDataSource from "./switchMessage.datasource";

@Component({
    selector: "cardTransaction",
    templateUrl: "./cardTransaction.component.html",
    styleUrls: ["./cardTransaction.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CardTransactionComponent {
    switchMessageDataSource: SwitchMessageDataSource | null;
    dialogRef: any;
    cardTransaction: CardTransaction;
    pageType: string;
    cardTransactionForm: FormGroup;
    cardEmvTransaction: CardEmvTransactionEntity[];
    cardBrand: CardBrandEntity[];
    cardType: CardTypeEntity[];
    transactionCode: TransactionCodeEntity[];
    transactionEffect: TransactionEffectEntity[];
    switchMessagesList: SwitchMessagesEntity[];
    displayedColumnsSwitch = [
        "Id",
        "InsertDateTime",
        "ApplicationType",
        "TransactionType",
        "MerchantCode",
        "ReferenceNumber",
        "ResponseCode",
        "Mti",
        "ProcessingCode",
        "TraceNumber",
        "Rrn",
        "TransactionAmount",
        "ServerName",
        "CardTokenNumber",
        "SettlementCurrencyCode",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    switchMessagePaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchMessageSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private cardTransactionService: CardTransactionService,
        private cardTransactionsService: CardTransactionsService,
        private searchCardTransactionService: SearchCardTransactionService,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardTransaction = new CardTransaction();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
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

        this.switchMessageDataSource = new SwitchMessageDataSource(
            this.cardTransactionService,
            this.switchMessagePaginator,
            this.switchMessageSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchMessageDataSource) {
                    return;
                }
                this.switchMessageDataSource.filter =
                    this.filter.nativeElement.value;
            });

        this.cardTransactionService.onCardTransactionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cardTransaction) => {
                if (cardTransaction) {
                    this.cardTransaction = new CardTransaction(cardTransaction);
                    this.pageType = "edit";
                    this.switchMessagesList =
                        this.cardTransactionService.switchMessagesList;
                    this.cardEmvTransaction =
                        this.cardTransactionService.cardEmvTransaction;
                }
                this.cardTransactionForm = this.createCardTransactionForm();
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createCardTransactionForm
     *
     * @returns {FormGroup}
     */
    createCardTransactionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.cardTransaction.Id],
            CardTokenNumber: [this.cardTransaction.CardTokenNumber],
            CardId: [this.cardTransaction.CardId],
            CardFinancialId: [this.cardTransaction.CardFinancialId],
            ReferenceNumber: [this.cardTransaction.ReferenceNumber],
            OriginalReferenceNumber: [
                this.cardTransaction.OriginalReferenceNumber,
            ],
            CardTypeId: [this.cardTransaction.CardTypeId],
            CardBrandId: [this.cardTransaction.CardBrandId],
            IsExternalAuthorizedTransaction: [
                this.cardTransaction.IsExternalAuthorizedTransaction,
            ],
            ExternalAuthorizationProfileId: [
                this.cardTransaction.ExternalAuthorizationProfileId,
            ],
            HasAccountUsage: [this.cardTransaction.HasAccountUsage],
            AccountId: [this.cardTransaction.AccountId],
            AvailableBalance: [this.cardTransaction.AvailableBalance],
            TransactionDateTime: [this.cardTransaction.TransactionDateTime],
            TransactionCodeId: [this.cardTransaction.TransactionCodeId],
            TransactionEffectId: [this.cardTransaction.TransactionEffectId],
            ProvisionTransactionType: [
                this.cardTransaction.ProvisionTransactionType,
            ],
            IsFinancialTransaction: [
                this.cardTransaction.IsFinancialTransaction,
            ],
            IsSucceded: [this.cardTransaction.IsSucceded],
            ResponseCode: [this.cardTransaction.ResponseCode],
            ErrorCode: [this.cardTransaction.ErrorCode],
            ErrorDescription: [this.cardTransaction.ErrorDescription],
            BillingAmount: [this.cardTransaction.BillingAmount],
            BillingCurrencyCode: [this.cardTransaction.BillingCurrencyCode],
            FeeAmount: [this.cardTransaction.FeeAmount],
            CommissionAmount: [this.cardTransaction.CommissionAmount],
            FeeCurrencyCode: [this.cardTransaction.FeeCurrencyCode],
            F4: [this.cardTransaction.F4],
            F49: [this.cardTransaction.F49],
            F6: [this.cardTransaction.F6],
            F51: [this.cardTransaction.F51],
            IsReversed: [this.cardTransaction.IsReversed],
            ReversalType: [this.cardTransaction.ReversalType],
            ReversedDateTime: [this.cardTransaction.ReversedDateTime],
            TxnDescription: [this.cardTransaction.TxnDescription],
            IsOnusTransaction: [this.cardTransaction.IsOnusTransaction],
            IsSystemTransaction: [this.cardTransaction.IsSystemTransaction],
            ApplicationNetwork: [this.cardTransaction.ApplicationNetwork],
            ApplicationId: [this.cardTransaction.ApplicationId],
            SessionId: [this.cardTransaction.SessionId],
            SettlementStatus: [this.cardTransaction.SettlementStatus],
            SettlementDate: [this.cardTransaction.SettlementDate],
            Mti: [this.cardTransaction.Mti],
            ProcessingCode: [this.cardTransaction.ProcessingCode],
            ProcessingGroupCode: [this.cardTransaction.ProcessingGroupCode],
            TransactionLocalDateTime: [
                this.cardTransaction.TransactionLocalDateTime,
            ],
            AcquirerId: [this.cardTransaction.AcquirerId],
            F7: [this.cardTransaction.F7],
            F9: [this.cardTransaction.F9],
            F10: [this.cardTransaction.F10],
            F11: [this.cardTransaction.F11],
            F12: [this.cardTransaction.F12],
            F13: [this.cardTransaction.F13],
            F14: [this.cardTransaction.F14],
            Mcc: [this.cardTransaction.Mcc],
            F22: [this.cardTransaction.F22],
            TransactionEntryType: [this.cardTransaction.TransactionEntryType],
            CardSequenceNumber: [this.cardTransaction.CardSequenceNumber],
            F25: [this.cardTransaction.F25],
            F26: [this.cardTransaction.F26],
            F28: [this.cardTransaction.F28],
            F32: [this.cardTransaction.F32],
            F33: [this.cardTransaction.F33],
            F37: [this.cardTransaction.F37],
            F38: [this.cardTransaction.F38],
            F41: [this.cardTransaction.F41],
            F42: [this.cardTransaction.F42],
            F43Name: [this.cardTransaction.F43Name],
            F43City: [this.cardTransaction.F43City],
            F43State: [this.cardTransaction.F43State],
            F43Country: [this.cardTransaction.F43Country],
            F44: [this.cardTransaction.F44],
            F48: [this.cardTransaction.F48],
            F53: [this.cardTransaction.F53],
            F60: [this.cardTransaction.F60],
            F61: [this.cardTransaction.F61],
            F62: [this.cardTransaction.F62],
            F63: [this.cardTransaction.F63],
            F90: [this.cardTransaction.F90],
            F95: [this.cardTransaction.F95],
            CvmResult: [this.cardTransaction.CvmResult],
            HasCvv: [this.cardTransaction.HasCvv],
            CvvCheckResult: [this.cardTransaction.CvvCheckResult],
            HasCvv2: [this.cardTransaction.HasCvv2],
            Cvv2CheckResult: [this.cardTransaction.Cvv2CheckResult],
            HasCavv: [this.cardTransaction.HasCavv],
            CavvIndicator: [this.cardTransaction.CavvIndicator],
            CavvCheckResult: [this.cardTransaction.CavvCheckResult],
            HasOnlinePin: [this.cardTransaction.HasOnlinePin],
            OnlinePinCheckResult: [this.cardTransaction.OnlinePinCheckResult],
            HasOfflinePin: [this.cardTransaction.HasOfflinePin],
            OfflinePinCheckResult: [this.cardTransaction.OfflinePinCheckResult],
            HasEmvData: [this.cardTransaction.HasEmvData],
            Atc: [this.cardTransaction.Atc],
            EmvCheckResult: [this.cardTransaction.EmvCheckResult],
            EmvTransactionId: [this.cardTransaction.EmvTransactionId],
            ClearingMatchStatus: [this.cardTransaction.ClearingMatchStatus],
            ClearingTransactionId: [this.cardTransaction.ClearingTransactionId],
            ServerName: [this.cardTransaction.ServerName],
            ServerDateTime: [this.cardTransaction.ServerDateTime],
            EndPointAddress: [this.cardTransaction.EndPointAddress],
            CurrencyRate: [this.cardTransaction.CurrencyRate],
            F54: [this.cardTransaction.F54],
            HasPartialReversal: [this.cardTransaction.HasPartialReversal],
            HasIncrementalAuthorization: [
                this.cardTransaction.HasIncrementalAuthorization,
            ],
            IncrmentalAuthorizationCount: [
                this.cardTransaction.IncrmentalAuthorizationCount,
            ],
            LastIncrementalAuthorizationDateTime: [
                this.cardTransaction.LastIncrementalAuthorizationDateTime,
            ],
            TransactionCategoryCode: [
                this.cardTransaction.TransactionCategoryCode,
            ],
            TerminalType: [this.cardTransaction.TerminalType],
            CardTransactionSource: [this.cardTransaction.CardTransactionSource],
            HasSwitchSettlementDate: [
                this.cardTransaction.HasSwitchSettlementDate,
            ],
            SwitchSettlementDate: [this.cardTransaction.SwitchSettlementDate],
            PosCountryCode: [this.cardTransaction.PosCountryCode],
            TransactionIdentifier: [this.cardTransaction.TransactionIdentifier],
            OriginalF4: [this.cardTransaction.OriginalF4],
            OriginalF6: [this.cardTransaction.OriginalF6],
            OriginalBillingAmount: [this.cardTransaction.OriginalBillingAmount],
            InsertDate: [this.cardTransaction.InsertDate],
            F55Length: [this.cardTransaction.F55Length],
            F55Tag5F34: [this.cardTransaction.F55Tag5F34],
            F55Tag5F2A: [this.cardTransaction.F55Tag5F2A],
            F55Tag82: [this.cardTransaction.F55Tag82],
            F55Tag84: [this.cardTransaction.F55Tag84],
            F55Tag95: [this.cardTransaction.F55Tag95],
            F55Tag9A: [this.cardTransaction.F55Tag9A],
            F55Tag9C: [this.cardTransaction.F55Tag9C],
            F55Tag9F02: [this.cardTransaction.F55Tag9F02],
            F55Tag9F03: [this.cardTransaction.F55Tag9F03],
            F55Tag9F10: [this.cardTransaction.F55Tag9F10],
            F55Tag9F1A: [this.cardTransaction.F55Tag9F1A],
            F55Tag9F26: [this.cardTransaction.F55Tag9F26],
            F55Tag9F27: [this.cardTransaction.F55Tag9F27],
            F55Tag9F33: [this.cardTransaction.F55Tag9F33],
            F55Tag9F34: [this.cardTransaction.F55Tag9F34],
            F55Tag9F36: [this.cardTransaction.F55Tag9F36],
            F55Tag9F37: [this.cardTransaction.F55Tag9F37],
            F55Tag91: [this.cardTransaction.F55Tag91],
            F55Tag71: [this.cardTransaction.F55Tag71],
            F55Tag72: [this.cardTransaction.F55Tag72],
            AuthorizationIsSucceded: [
                this.cardTransaction.AuthorizationIsSucceded,
            ],
            AuthorizationResponseCode: [
                this.cardTransaction.AuthorizationResponseCode,
            ],
            AuthorizationErrorCode: [
                this.cardTransaction.AuthorizationErrorCode,
            ],
            AuthorizationErrorDescription: [
                this.cardTransaction.AuthorizationErrorDescription,
            ],
            TotalElapsed: [this.cardTransaction.TotalElapsed],
            TotalAuthorizationElapsed: [
                this.cardTransaction.TotalAuthorizationElapsed,
            ],
        });
    }
}
