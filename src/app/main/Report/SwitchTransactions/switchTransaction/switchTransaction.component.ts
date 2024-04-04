import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { SwitchTransactionService } from "./switchTransaction.service";
import {
    SwitchApplicationSessionEntity,
    SwitchApplicationsEntity,
} from "app/ui/switchTransactions";
import { SwitchTransaction } from "./switchTransactions.model";

@Component({
    selector: "switchTransaction",
    templateUrl: "./switchTransaction.component.html",
    styleUrls: ["./switchTransaction.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SwitchTransactionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    switchTransaction: SwitchTransaction;
    pageType: string;
    switchTransactionForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    switchApplicationsList: SwitchApplicationsEntity[];
    switchApplicationSessionList: SwitchApplicationSessionEntity[];
    messageParseResult: string;

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
        private switchTransactionService: SwitchTransactionService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchTransaction = new SwitchTransaction();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.switchTransactionService.onSwitchTransactionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((switchTransaction) => {
                this.switchTransaction = new SwitchTransaction(
                    switchTransaction
                );
                this.pageType = "edit";

                this.switchTransactionForm = this.createSwitchTransactionForm();
            });
        this.messageParseResult =
            this.switchTransactionService.messageParseDetail;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSwitchTransactionForm
     *
     * @returns {FormGroup}
     */
    createSwitchTransactionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchTransaction.Id],
            InsertDate: [this.switchTransaction.InsertDate],
            ReferenceNumber: [this.switchTransaction.ReferenceNumber],
            ApplicationType: [this.switchTransaction.ApplicationType],
            TransactionType: [this.switchTransaction.TransactionType],
            MerchantCode: [this.switchTransaction.MerchantCode],
            TerminalId: [this.switchTransaction.TerminalId],
            Mti: [this.switchTransaction.Mti],
            ProcessingCode: [this.switchTransaction.ProcessingCode],
            TraceNumber: [this.switchTransaction.TraceNumber],
            Rrn: [this.switchTransaction.Rrn],
            TransactionAmount: [this.switchTransaction.TransactionAmount],
            ResponseCode: [this.switchTransaction.ResponseCode],
            ApplicationId: [this.switchTransaction.ApplicationId],
            SessionId: [this.switchTransaction.SessionId],
            ServerName: [this.switchTransaction.ServerName],
            RemoteIpAddress: [this.switchTransaction.RemoteIpAddress],
            RemotePort: [this.switchTransaction.RemotePort],
            LocalIpAddress: [this.switchTransaction.LocalIpAddress],
            LocalPort: [this.switchTransaction.LocalPort],
            RoutedRemoteIpAddress: [
                this.switchTransaction.RoutedRemoteIpAddress,
            ],
            RoutedRemotePort: [this.switchTransaction.RoutedRemotePort],
            RoutedLocalIpAddress: [this.switchTransaction.RoutedLocalIpAddress],
            RoutedLocalPort: [this.switchTransaction.RoutedLocalPort],
            HexMessage: [this.switchTransaction.HexMessage],
            CardTokenNumber: [this.switchTransaction.CardTokenNumber],
            TransactionCurrencyCode: [
                this.switchTransaction.TransactionCurrencyCode,
            ],
            AcquirerId: [this.switchTransaction.AcquirerId],
            AuthorizationCode: [this.switchTransaction.AuthorizationCode],
            TxnDescription: [this.switchTransaction.TxnDescription],
            SettlementAmount: [this.switchTransaction.SettlementAmount],
            SettlementCurrencyCode: [
                this.switchTransaction.SettlementCurrencyCode,
            ],
            MessageParseDetail: [this.switchTransaction.MessageParseDetail],
        });
    }
}
