import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import {
    SwitchApplicationSessionEntity,
    SwitchApplicationsEntity,
} from "app/ui/switchReport";
import { SearchSwitchParseErrorLogsService } from "../../SwitchParseErrorReport/searchParseErrorLogs/searchParseErrorLogs.service";
import { SwitchMessage } from "../switchMessageLogs/switchMessageLogs.model";
import { SwitchMessageLogService } from "./switchMessageLog.service";
import { SearchSwitchMessageLogService } from "../searchMessageLog/searchMessageLog.service";

@Component({
    selector: "switchMessageLog",
    templateUrl: "./switchMessageLog.component.html",
    styleUrls: ["./switchMessageLog.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SwitchMessageLogComponent implements OnInit, OnDestroy {
    dialogRef: any;
    switchMessage: SwitchMessage;
    pageType: string;
    switchMessageLogForm: FormGroup;
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
        private switchMessageLogService: SwitchMessageLogService,
        private searchSwitchMessageService: SearchSwitchMessageLogService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchMessage = new SwitchMessage();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.searchSwitchMessageService
            .GetSwitchApplicationSessions()
            .then(() => {
                this.switchApplicationSessionList =
                    this.searchSwitchMessageService.switchApplicationSessionApiResponse.ParameterList;
            });
        this.searchSwitchMessageService.GetSwitchApplications().then(() => {
            this.switchApplicationsList =
                this.searchSwitchMessageService.switchApplicationsApiResponse.ParameterList;
        });
        this.switchMessageLogService.onSwitchMessageLogChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((switchMessage) => {
                this.switchMessage = new SwitchMessage(switchMessage);
                this.pageType = "edit";

                this.switchMessageLogForm = this.createSwitchMessageLogForm();
            });
        this.messageParseResult =
            this.switchMessageLogService.messageParseDetail;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSwitchMessageLogForm
     *
     * @returns {FormGroup}
     */
    createSwitchMessageLogForm(): FormGroup {
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
