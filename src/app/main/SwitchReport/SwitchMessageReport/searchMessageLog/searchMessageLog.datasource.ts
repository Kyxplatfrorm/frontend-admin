import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSwitchMessageLogService } from "./searchMessageLog.service";

export class SearchSwitchMessageLogDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSwitchMessageLogService: SearchSwitchMessageLogService,
        private _matSearchSwitchMessageLogPaginator: MatPaginator,
        private _matSearchSwitchMessageLogSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSwitchMessageLogService.switchMessageLogApiResponse.SwitchLogList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSwitchMessageLogService.onSearchSwitchMessageLogChanged,
            this._matSearchSwitchMessageLogPaginator.page,
            this._filterChange,
            this._matSearchSwitchMessageLogSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSwitchMessageLogService.switchMessageLogApiResponse.SwitchLogList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSwitchMessageLogPaginator.pageIndex *
                    this._matSearchSwitchMessageLogPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSwitchMessageLogPaginator.pageSize
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
            !this._matSearchSwitchMessageLogSort.active ||
            this._matSearchSwitchMessageLogSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSwitchMessageLogSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ApplicationName ":
                    [propertyA, propertyB] = [
                        a.ApplicationName,
                        b.ApplicationName,
                    ];
                    break;
                case "SessionName":
                    [propertyA, propertyB] = [a.SessionName, b.SessionName];
                    break;

                case "ApplicationType ":
                    [propertyA, propertyB] = [
                        a.ApplicationType,
                        b.ApplicationType,
                    ];
                    break;
                case "TransactionType":
                    [propertyA, propertyB] = [
                        a.TransactionType,
                        b.TransactionType,
                    ];
                    break;
                case "Mti":
                    [propertyA, propertyB] = [a.Mti, b.Mti];
                    break;
                case "Rrn":
                    [propertyA, propertyB] = [a.Rrn, b.Rrn];
                    break;
                case "AcquirerId":
                    [propertyA, propertyB] = [a.AcquirerId, b.AcquirerId];
                    break;
                case "CardTokenNumber":
                    [propertyA, propertyB] = [
                        a.CardTokenNumber,
                        b.CardTokenNumber,
                    ];
                    break;
                case "MerchantCode":
                    [propertyA, propertyB] = [a.MerchantCode, b.MerchantCode];
                    break;
                case "TerminalId":
                    [propertyA, propertyB] = [a.TerminalId, b.TerminalId];
                    break;
                case "TransactionAmount":
                    [propertyA, propertyB] = [
                        a.TransactionAmount,
                        b.TransactionAmount,
                    ];
                    break;
                case "TransactionCurrencyCode":
                    [propertyA, propertyB] = [
                        a.TransactionCurrencyCode,
                        b.TransactionCurrencyCode,
                    ];
                    break;
                case "TxnDescription":
                    [propertyA, propertyB] = [
                        a.TxnDescription,
                        b.TxnDescription,
                    ];
                    break;
                case "AuthorizationCode":
                    [propertyA, propertyB] = [
                        a.AuthorizationCode,
                        b.AuthorizationCode,
                    ];
                    break;
                case "ProcessingCode":
                    [propertyA, propertyB] = [
                        a.ProcessingCode,
                        b.ProcessingCode,
                    ];
                    break;

                case "ServerName":
                    [propertyA, propertyB] = [a.ServerName, b.ServerName];
                    break;
                case "RemoteIpAddress":
                    [propertyA, propertyB] = [
                        a.RemoteIpAddress,
                        b.RemoteIpAddress,
                    ];
                    break;
                case "LocalIpAddress ":
                    [propertyA, propertyB] = [
                        a.LocalIpAddress,
                        b.LocalIpAddress,
                    ];
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
                (this._matSearchSwitchMessageLogSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSwitchMessageLogDataSource;
