import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import * as XLSX from "xlsx";
import SearchSwitchMessageLogDataSource from "./searchMessageLog.datasource";
import { SwitchMessage } from "../switchMessageLogs/switchMessageLogs.model";
import { SearchSwitchMessageLogService } from "./searchMessageLog.service";

@Component({
    selector: "searchMessageLog",
    templateUrl: "./searchMessageLog.component.html",
    styleUrls: ["./searchMessageLog.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchMessageLogComponent implements OnInit {
    searchSwitchMessageLogDataSource: SearchSwitchMessageLogDataSource | null;
    displayedColumns = [
        "Id",
        "ApplicationName",
        "SessionName",
        "ApplicationType",
        "TransactionType",
        "Mti",
        "Rrn",
        "AcquirerId",
        "MerchantCode",
        "TerminalId",
        "TransactionAmount",
        "TransactionCurrencyCode",
        "CardTokenNumber",
        "TxnDescription",
        "AuthorizationCode",
        "ProcessingCode",
        "ServerName",
        "RemoteIpAddress",
        "LocalIpAddress",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchMessageLogPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchMessageLogSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    switchMessage: SwitchMessage;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSwitchMessageLogService: SearchSwitchMessageLogService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchMessage = new SwitchMessage();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSwitchMessageLogDataSource =
            new SearchSwitchMessageLogDataSource(
                this.searchSwitchMessageLogService,
                this.searchMessageLogPaginator,
                this.searchMessageLogSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSwitchMessageLogDataSource) {
                    return;
                }
                this.searchSwitchMessageLogDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    exportToExcel() {
        const data = this.searchSwitchMessageLogDataSource.filteredData.map(
            (switchMessage) => {
                return [
                    switchMessage.Id,
                    switchMessage.ApplicationName,
                    switchMessage.SessionName,
                    switchMessage.ApplicationType,
                    switchMessage.TransactionType,
                    switchMessage.Mti,
                    switchMessage.Rrn,
                    switchMessage.AcquirerId,
                    switchMessage.MerchantCode,
                    switchMessage.TerminalId,
                    switchMessage.TransactionAmount,
                    switchMessage.TransactionCurrencyCode,
                    switchMessage.CardTokenNumber,
                    switchMessage.TxnDescription,
                    switchMessage.AuthorizationCode,
                    switchMessage.ProcessingCode,
                    switchMessage.ServerName,
                    switchMessage.RemoteIpAddress,
                    switchMessage.LocalIpAddress,
                    switchMessage.InsertDateTime,
                ];
            }
        );

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            this.displayedColumns,
            ...data,
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "SwitchMessageLog");
        XLSX.writeFile(workbook, "SwitchMessageLog.xlsx");
    }
}
