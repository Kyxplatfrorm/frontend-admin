import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSwitchParseErrorLogsService } from "./searchParseErrorLogs.service";

export class SearchSwitchParseErrorLogsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSwitchParseErrorLogsService: SearchSwitchParseErrorLogsService,
        private _matSearchSwitchParseErrorLogsPaginator: MatPaginator,
        private _matSearchSwitchParseErrorLogsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSwitchParseErrorLogsService.switchParseErrorLogApiResponse.SwitchLogList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSwitchParseErrorLogsService
                .onSearchSwitchParseErrorLogsChanged,
            this._matSearchSwitchParseErrorLogsPaginator.page,
            this._filterChange,
            this._matSearchSwitchParseErrorLogsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSwitchParseErrorLogsService.switchParseErrorLogApiResponse.SwitchLogList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSwitchParseErrorLogsPaginator.pageIndex *
                    this._matSearchSwitchParseErrorLogsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSwitchParseErrorLogsPaginator.pageSize
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
            !this._matSearchSwitchParseErrorLogsSort.active ||
            this._matSearchSwitchParseErrorLogsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSwitchParseErrorLogsSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
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
                case "RemotePort":
                    [propertyA, propertyB] = [a.RemotePort, b.RemotePort];
                    break;
                case "LocalPort":
                    [propertyA, propertyB] = [a.LocalPort, b.LocalPort];
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
                (this._matSearchSwitchParseErrorLogsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSwitchParseErrorLogsDataSource;
