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
import SearchHsmTransactionDataSource from "./searchHsmTransaction.datasource";
import { SearchHsmTransactionService } from "./searchHsmTransaction.service";
import * as XLSX from "xlsx";

@Component({
    selector: "searchHsmTransaction",
    templateUrl: "./searchHsmTransaction.component.html",
    styleUrls: ["./searchHsmTransaction.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchHsmTransactionComponent implements OnInit {
    searchHsmTransactionDataSource: SearchHsmTransactionDataSource | null;
    displayedColumns = [
        "Id",
        "CommandCode",
        "CommandName",
        "ResponseCode",
        "ResponseDescription",
        "ServerName",
        "HsmIpAddress",
        "TotalElapsed",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchHsmTransactionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchHsmTransactionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    @ViewChild("table") table: ElementRef;
    private _unsubscribeAll: Subject<any>;
    data: any;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchHsmTransactionService: SearchHsmTransactionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchHsmTransactionDataSource =
            new SearchHsmTransactionDataSource(
                this.searchHsmTransactionService,
                this.searchHsmTransactionPaginator,
                this.searchHsmTransactionSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchHsmTransactionDataSource) {
                    return;
                }
                this.searchHsmTransactionDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    exportToExcel() {
        const data = this.searchHsmTransactionDataSource.filteredData.map(
            (transaction) => {
                return [
                    transaction.Id,
                    transaction.CommandCode,
                    transaction.CommandName,
                    transaction.ResponseCode,
                    transaction.ResponseDescription,
                    transaction.ServerName,
                    transaction.HsmIpAddress,
                    transaction.TotalElapsed,
                    transaction.InsertDateTime,
                ];
            }
        );

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            this.displayedColumns,
            ...data,
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, "transactions.xlsx");
    }
}
