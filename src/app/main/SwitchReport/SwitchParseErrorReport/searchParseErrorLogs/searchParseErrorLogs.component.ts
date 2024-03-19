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
import SearchSwitchParseErrorLogsDataSource from "./searchParseErrorLogs.datasource";
import { SearchSwitchParseErrorLogsService } from "./searchParseErrorLogs.service";
import { SwitchParseError } from "../switchParseErrorLogs/switchParseErrorLogs.model";
import * as XLSX from "xlsx";

@Component({
    selector: "searchParseErrorLogs",
    templateUrl: "./searchParseErrorLogs.component.html",
    styleUrls: ["./searchParseErrorLogs.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchParseErrorLogsComponent implements OnInit {
    searchSwitchParseErrorLogsDataSource: SearchSwitchParseErrorLogsDataSource | null;
    displayedColumns = [
        "Id",
        "ApplicationType",
        "TransactionType",
        "ServerName",
        "RemoteIpAddress",
        "RemotePort",
        "LocalIpAddress",
        "LocalPort",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSwitchParseErrorLogsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSwitchParseErrorLogsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    switchParseError: SwitchParseError;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSwitchParseErrorLogsService: SearchSwitchParseErrorLogsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchParseError = new SwitchParseError();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSwitchParseErrorLogsDataSource =
            new SearchSwitchParseErrorLogsDataSource(
                this.searchSwitchParseErrorLogsService,
                this.searchSwitchParseErrorLogsPaginator,
                this.searchSwitchParseErrorLogsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSwitchParseErrorLogsDataSource) {
                    return;
                }
                this.searchSwitchParseErrorLogsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    exportToExcel() {
        const data = this.searchSwitchParseErrorLogsDataSource.filteredData.map(
            (switchParseError) => {
                return [
                    switchParseError.Id,
                    switchParseError.ApplicationType,
                    switchParseError.TransactionType,
                    switchParseError.ServerName,
                    switchParseError.RemoteIpAddress,
                    switchParseError.RemotePort,
                    switchParseError.LocalIpAddress,
                    switchParseError.LocalPort,
                    switchParseError.InsertDateTime,
                ];
            }
        );

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            this.displayedColumns,
            ...data,
        ]);
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "SwitchParseErrorLog"
        );
        XLSX.writeFile(workbook, "switchParseErrorLog.xlsx");
    }
}
