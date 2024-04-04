import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchCardTransactionService } from "./searchCardTransaction.service";

export class SearchCardTransactionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchCardTransactionService: SearchCardTransactionService,
        private _matSearchCardTransactionPaginator: MatPaginator,
        private _matSearchCardTransactionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchCardTransactionService.cardTransactionApiResponse.CardTransactionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchCardTransactionService.onSearchCardTransactionChanged,
            this._matSearchCardTransactionPaginator.page,
            this._filterChange,
            this._matSearchCardTransactionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchCardTransactionService.cardTransactionApiResponse.CardTransactionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchCardTransactionPaginator.pageIndex *
                    this._matSearchCardTransactionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchCardTransactionPaginator.pageSize
                );
            })
        );
    }

    get filteredData(): any {
        return this._filteredDataChange.value;
    }
    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }
    get filter(): string {
        return this._filterChange.value;
    }
    set filter(filter: string) {
        this._filterChange.next(filter);
    }
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }
    sortData(data): any[] {
        if (
            !this._matSearchCardTransactionSort.active ||
            this._matSearchCardTransactionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchCardTransactionSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CardBrand ":
                    [propertyA, propertyB] = [a.CardBrand, b.CardBrand];
                    break;
                case "TotalElapsed ":
                    [propertyA, propertyB] = [a.TotalElapsed, b.TotalElapsed];
                    break;
                case "CardType":
                    [propertyA, propertyB] = [a.CardType, b.CardType];
                    break;
                case "CardTokenNumber ":
                    [propertyA, propertyB] = [
                        a.CardTokenNumber,
                        b.CardTokenNumber,
                    ];
                    break;
                case "TransactionCode":
                    [propertyA, propertyB] = [
                        a.TransactionCode,
                        b.TransactionCode,
                    ];
                    break;
                case "TransactionEffect":
                    [propertyA, propertyB] = [
                        a.TransactionEffect,
                        b.TransactionEffect,
                    ];
                    break;
                case "ProvisionTransactionType":
                    [propertyA, propertyB] = [
                        a.ProvisionTransactionType,
                        b.ProvisionTransactionType,
                    ];
                    break;
                case "ApplicationName":
                    [propertyA, propertyB] = [
                        a.ApplicationName,
                        b.ApplicationName,
                    ];
                    break;
                case "ApplicationNetwork":
                    [propertyA, propertyB] = [
                        a.ApplicationNetwork,
                        b.ApplicationNetwork,
                    ];
                    break;
                case "SettlementStatus":
                    [propertyA, propertyB] = [
                        a.SettlementStatus,
                        b.SettlementStatus,
                    ];
                    break;
                case "SessionName":
                    [propertyA, propertyB] = [a.SessionName, b.SessionName];
                    break;
                case "ServerName":
                    [propertyA, propertyB] = [a.ServerName, b.ServerName];
                    break;
                case "TransactionEntryType":
                    [propertyA, propertyB] = [
                        a.TransactionEntryType,
                        b.TransactionEntryType,
                    ];
                    break;
                case "Mti":
                    [propertyA, propertyB] = [a.Mti, b.Mti];
                    break;
                case "ProcessingCode":
                    [propertyA, propertyB] = [
                        a.ProcessingCode,
                        b.ProcessingCode,
                    ];
                    break;
                case "CommissionAmount":
                    [propertyA, propertyB] = [
                        a.CommissionAmount,
                        b.CommissionAmount,
                    ];
                    break;
                case "Atc":
                    [propertyA, propertyB] = [a.Atc, b.Atc];
                    break;

                case "InsertDateTime":
                    [propertyA, propertyB] = [
                        a.InsertDateTime,
                        b.InsertDateTime,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchCardTransactionSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchCardTransactionDataSource;
