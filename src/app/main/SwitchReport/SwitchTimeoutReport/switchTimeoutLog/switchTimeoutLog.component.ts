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
import { SwitchTimeout } from "../switchTimeoutLogs/switchTimeoutLogs.model";
import {
    SwitchApplicationSessionEntity,
    SwitchApplicationsEntity,
} from "app/ui/switchReport";
import { SearchSwitchParseErrorLogsService } from "../../SwitchParseErrorReport/searchParseErrorLogs/searchParseErrorLogs.service";
import { SwitchTimeoutLogService } from "./switchTimeoutLog.service";

@Component({
    selector: "switchTimeoutLog",
    templateUrl: "./switchTimeoutLog.component.html",
    styleUrls: ["./switchTimeoutLog.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SwitchTimeoutLogComponent implements OnInit, OnDestroy {
    dialogRef: any;
    switchTimeout: SwitchTimeout;
    pageType: string;
    switchTimeoutLogForm: FormGroup;
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
        private switchTimeoutLogService: SwitchTimeoutLogService,
        private searchSwitchParseErrorLogsService: SearchSwitchParseErrorLogsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchTimeout = new SwitchTimeout();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.searchSwitchParseErrorLogsService
            .GetSwitchApplicationSessions()
            .then(() => {
                this.switchApplicationSessionList =
                    this.searchSwitchParseErrorLogsService.switchApplicationSessionApiResponse.ParameterList;
            });
        this.searchSwitchParseErrorLogsService
            .GetSwitchApplications()
            .then(() => {
                this.switchApplicationsList =
                    this.searchSwitchParseErrorLogsService.switchApplicationsApiResponse.ParameterList;
            });
        this.switchTimeoutLogService.onSwitchTimeoutLogChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((switchTimeout) => {
                this.switchTimeout = new SwitchTimeout(switchTimeout);
                this.pageType = "edit";

                this.switchTimeoutLogForm = this.createSwitchTimeoutLogForm();
            });
        this.messageParseResult =
            this.switchTimeoutLogService.messageParseDetail;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSwitchTimeoutLogForm
     *
     * @returns {FormGroup}
     */
    createSwitchTimeoutLogForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchTimeout.Id],
            ApplicationType: [this.switchTimeout.ApplicationType],
            TransactionType: [this.switchTimeout.TransactionType],
            InsertDate: [this.switchTimeout.InsertDate],
            CardTokenNumber: [this.switchTimeout.CardTokenNumber],
            MerchantCode: [this.switchTimeout.MerchantCode],
            TerminalId: [this.switchTimeout.TerminalId],
            Mti: [this.switchTimeout.Mti],
            ProcessingCode: [this.switchTimeout.ProcessingCode],
            TraceNumber: [this.switchTimeout.TraceNumber],
            Rrn: [this.switchTimeout.Rrn],
            TransactionAmount: [this.switchTimeout.TransactionAmount],
            TransactionCurrencyCode: [
                this.switchTimeout.TransactionCurrencyCode,
            ],
            AcquirerId: [this.switchTimeout.AcquirerId],
            AuthorizationCode: [this.switchTimeout.AuthorizationCode],
            ResponseCode: [this.switchTimeout.ResponseCode],
            ApplicationId: [this.switchTimeout.ApplicationId],
            SessionId: [this.switchTimeout.SessionId],
            ServerName: [this.switchTimeout.ServerName],
            RemoteIpAddress: [this.switchTimeout.RemoteIpAddress],
            RemotePort: [this.switchTimeout.RemotePort],
            LocalIpAddress: [this.switchTimeout.LocalIpAddress],
            LocalPort: [this.switchTimeout.LocalPort],
            TxnDescription: [this.switchTimeout.TxnDescription],
            HexMessage: [this.switchTimeout.HexMessage],
            MessageParseDetail: [this.switchTimeout.MessageParseDetail],
        });
    }
}
