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
import SearchCardTransactionDataSource from "./searchCardTransaction.datasource";
import { SearchCardTransactionService } from "./searchCardTransaction.service";
import { CardTransaction } from "../cardTransactions/cardTransactions.model";

@Component({
    selector: "searchCardTransaction",
    templateUrl: "./searchCardTransaction.component.html",
    styleUrls: ["./searchCardTransaction.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchCardTransactionComponent implements OnInit {
    searchCardTransactionDataSource: SearchCardTransactionDataSource | null;
    displayedColumns = [
        "Id",
        "ReferenceNumber",
        "CardTokenNumber",
        "CustomerId",
        "InsertDateTime",
        "TotalElapsed",
        "TransactionLocalDateTime",
        "TransactionCode",
        "TransactionEffect",
        "BillingAmount",
        "FeeAmount",
        "BillingCurrencyCode",
        "ApplicationNetwork",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchCardTransactionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchCardTransactionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    cardTransaction: CardTransaction;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchCardTransactionService: SearchCardTransactionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardTransaction = new CardTransaction();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchCardTransactionDataSource =
            new SearchCardTransactionDataSource(
                this.searchCardTransactionService,
                this.searchCardTransactionPaginator,
                this.searchCardTransactionSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchCardTransactionDataSource) {
                    return;
                }
                this.searchCardTransactionDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    exportToExcel() {
        const data = this.searchCardTransactionDataSource.filteredData.map(
            (cardTransaction) => {
                return [
                    cardTransaction.Id,
                    cardTransaction.ReferenceNumber,
                    cardTransaction.CardTokenNumber,
                    cardTransaction.CustomerId,
                    cardTransaction.InsertDateTime,
                    cardTransaction.TransactionLocalDateTime,
                    cardTransaction.TransactionCode,
                    cardTransaction.TransactionEffect,
                    cardTransaction.BillingAmount,
                    cardTransaction.FeeAmount,
                    cardTransaction.BillingCurrencyCode,
                    cardTransaction.ApplicationNetwork,
                ];
            }
        );

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            this.displayedColumns,
            ...data,
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "CardTransaction");
        XLSX.writeFile(workbook, "CardTransaction.xlsx");
    }
}
