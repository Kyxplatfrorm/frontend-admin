import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchHsmTransactionService } from "./searchHsmTransaction.service";

export class SearchHsmTransactionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchHsmTransactionService: SearchHsmTransactionService,
        private _matSearchHsmTransactionPaginator: MatPaginator,
        private _matSearchHsmTransactionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchHsmTransactionService.hsmTransactionReportApiResponse.HsmTransactionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchHsmTransactionService.onSearchHsmTransactionChanged,
            this._matSearchHsmTransactionPaginator.page,
            this._filterChange,
            this._matSearchHsmTransactionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchHsmTransactionService.hsmTransactionReportApiResponse.HsmTransactionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchHsmTransactionPaginator.pageIndex *
                    this._matSearchHsmTransactionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchHsmTransactionPaginator.pageSize
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
            !this._matSearchHsmTransactionSort.active ||
            this._matSearchHsmTransactionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchHsmTransactionSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CommandCode ":
                    [propertyA, propertyB] = [a.CommandCode, b.CommandCode];
                    break;
                case "CommandName":
                    [propertyA, propertyB] = [a.CommandName, b.CommandName];
                    break;

                case "ResponseCode":
                    [propertyA, propertyB] = [a.ResponseCode, b.ResponseCode];
                    break;
                case "ResponseDescription":
                    [propertyA, propertyB] = [
                        a.ResponseDescription,
                        b.ResponseDescription,
                    ];
                    break;
                case "ServiceName ":
                    [propertyA, propertyB] = [a.ServiceName, b.ServiceName];
                    break;
                case "ServerName":
                    [propertyA, propertyB] = [a.ServerName, b.ServerName];
                    break;
                case "EndPointAddress":
                    [propertyA, propertyB] = [
                        a.EndPointAddress,
                        b.EndPointAddress,
                    ];
                    break;
                case "HsmIpAddress":
                    [propertyA, propertyB] = [a.HsmIpAddress, b.HsmIpAddress];
                    break;
                case "TotalElapsed":
                    [propertyA, propertyB] = [a.TotalElapsed, b.TotalElapsed];
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
                (this._matSearchHsmTransactionSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchHsmTransactionDataSource;
