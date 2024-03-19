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
import SearchSwitchTimeoutLogDataSource from "./searchTimeoutLog.datasource";
import { SwitchTimeout } from "../switchTimeoutLogs/switchTimeoutLogs.model";
import { SearchSwitchTimeoutLogService } from "./searchTimeoutLog.service";

@Component({
    selector: "searchTimeoutLog",
    templateUrl: "./searchTimeoutLog.component.html",
    styleUrls: ["./searchTimeoutLog.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchTimeoutLogComponent implements OnInit {
    searchSwitchTimeoutLogDataSource: SearchSwitchTimeoutLogDataSource | null;
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
    searchTimeoutLogPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchTimeoutLogSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    switchTimeout: SwitchTimeout;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSwitchTimeoutLogService: SearchSwitchTimeoutLogService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchTimeout = new SwitchTimeout();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSwitchTimeoutLogDataSource =
            new SearchSwitchTimeoutLogDataSource(
                this.searchSwitchTimeoutLogService,
                this.searchTimeoutLogPaginator,
                this.searchTimeoutLogSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSwitchTimeoutLogDataSource) {
                    return;
                }
                this.searchSwitchTimeoutLogDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    exportToExcel() {
        const data = this.searchSwitchTimeoutLogDataSource.filteredData.map(
            (switchTimeout) => {
                return [
                    switchTimeout.Id,
                    switchTimeout.ApplicationName,
                    switchTimeout.SessionName,
                    switchTimeout.ApplicationType,
                    switchTimeout.TransactionType,
                    switchTimeout.Mti,
                    switchTimeout.Rrn,
                    switchTimeout.AcquirerId,
                    switchTimeout.MerchantCode,
                    switchTimeout.TerminalId,
                    switchTimeout.TransactionAmount,
                    switchTimeout.TransactionCurrencyCode,
                    switchTimeout.CardTokenNumber,
                    switchTimeout.TxnDescription,
                    switchTimeout.AuthorizationCode,
                    switchTimeout.ProcessingCode,
                    switchTimeout.ServerName,
                    switchTimeout.RemoteIpAddress,
                    switchTimeout.LocalIpAddress,
                    switchTimeout.InsertDateTime,
                ];
            }
        );

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            this.displayedColumns,
            ...data,
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "SwitchTimeoutLog");
        XLSX.writeFile(workbook, "switchTimeoutLog.xlsx");
    }
}
