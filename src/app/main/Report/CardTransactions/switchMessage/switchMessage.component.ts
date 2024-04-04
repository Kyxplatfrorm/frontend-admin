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
import {
    SwitchApplicationSessionEntity,
    SwitchApplicationsEntity,
} from "app/ui/switchTransactions";
import { CardTransactionsService } from "../cardTransactions/cardTransactions.service";
import { SwitchMessage } from "./switchMessage.model";
import { SwitchTransactionService } from "../../SwitchTransactions/switchTransaction/switchTransaction.service";

@Component({
    selector: "switchMessage",
    templateUrl: "./switchMessage.component.html",
    styleUrls: ["./switchMessage.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SwitchMessageComponent implements OnInit, OnDestroy {
    dialogRef: any;
    switchMessage: SwitchMessage;
    pageType: string;
    switchMessageForm: FormGroup;
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
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private cardTransactionsService: CardTransactionsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchMessage = new SwitchMessage();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.cardTransactionsService.GetSwitchApplicationSessions().then(() => {
            this.switchApplicationSessionList =
                this.cardTransactionsService.switchSessionApiResponse.ParameterList;
        });
        this.cardTransactionsService.GetSwitchApplications().then(() => {
            this.switchApplicationsList =
                this.cardTransactionsService.switchApplicationApiResponse.ParameterList;
        });
        this.switchTransactionService.onSwitchTransactionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((switchMessage) => {
                this.switchMessage = new SwitchMessage(switchMessage);
                this.pageType = "edit";

                this.switchMessageForm = this.createSwitchMessageForm();
            });
        this.messageParseResult =
            this.switchTransactionService.messageParseDetail;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSwitchMessageForm
     *
     * @returns {FormGroup}
     */
    createSwitchMessageForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchMessage.Id],
            InsertDate: [this.switchMessage.InsertDate],
            ReferenceNumber: [this.switchMessage.ReferenceNumber],
            ApplicationType: [this.switchMessage.ApplicationType],
            TransactionType: [this.switchMessage.TransactionType],
            MerchantCode: [this.switchMessage.MerchantCode],
            TerminalId: [this.switchMessage.TerminalId],
            Mti: [this.switchMessage.Mti],
            ProcessingCode: [this.switchMessage.ProcessingCode],
            TraceNumber: [this.switchMessage.TraceNumber],
            Rrn: [this.switchMessage.Rrn],
            TransactionAmount: [this.switchMessage.TransactionAmount],
            ResponseCode: [this.switchMessage.ResponseCode],
            ApplicationId: [this.switchMessage.ApplicationId],
            SessionId: [this.switchMessage.SessionId],
            ServerName: [this.switchMessage.ServerName],
            RemoteIpAddress: [this.switchMessage.RemoteIpAddress],
            RemotePort: [this.switchMessage.RemotePort],
            LocalIpAddress: [this.switchMessage.LocalIpAddress],
            LocalPort: [this.switchMessage.LocalPort],
            RoutedRemoteIpAddress: [this.switchMessage.RoutedRemoteIpAddress],
            RoutedRemotePort: [this.switchMessage.RoutedRemotePort],
            RoutedLocalIpAddress: [this.switchMessage.RoutedLocalIpAddress],
            RoutedLocalPort: [this.switchMessage.RoutedLocalPort],
            HexMessage: [this.switchMessage.HexMessage],
            CardTokenNumber: [this.switchMessage.CardTokenNumber],
            TransactionCurrencyCode: [
                this.switchMessage.TransactionCurrencyCode,
            ],
            AcquirerId: [this.switchMessage.AcquirerId],
            AuthorizationCode: [this.switchMessage.AuthorizationCode],
            TxnDescription: [this.switchMessage.TxnDescription],
            SettlementAmount: [this.switchMessage.SettlementAmount],
            SettlementCurrencyCode: [this.switchMessage.SettlementCurrencyCode],
            MessageParseDetail: [this.switchMessage.MessageParseDetail],
        });
    }
}
