import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchRestApiLogService } from "./searchRestApiLog.service";

export class SearchRestApiLogDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchRestApiLogService: SearchRestApiLogService,
        private _matSearchRestApiLogPaginator: MatPaginator,
        private _matSearchRestApiLogSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchRestApiLogService.restApiLogResponse.RestApiLogList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchRestApiLogService.onSearchRestApiLogChanged,
            this._matSearchRestApiLogPaginator.page,
            this._filterChange,
            this._matSearchRestApiLogSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchRestApiLogService.restApiLogResponse.RestApiLogList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchRestApiLogPaginator.pageIndex *
                    this._matSearchRestApiLogPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchRestApiLogPaginator.pageSize
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
            !this._matSearchRestApiLogSort.active ||
            this._matSearchRestApiLogSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchRestApiLogSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ApiChannel ":
                    [propertyA, propertyB] = [a.ApiChannel, b.ApiChannel];
                    break;
                case "UserName":
                    [propertyA, propertyB] = [a.UserName, b.UserName];
                    break;

                case "ServerType":
                    [propertyA, propertyB] = [a.ServerType, b.ServerType];
                    break;
                case "ApiName":
                    [propertyA, propertyB] = [a.ApiName, b.ApiName];
                    break;
                case "ApiStatus ":
                    [propertyA, propertyB] = [a.ApiStatus, b.ApiStatus];
                    break;
                case "ErrorCode":
                    [propertyA, propertyB] = [a.ErrorCode, b.ErrorCode];
                    break;
                case "TotalElapsed":
                    [propertyA, propertyB] = [a.TotalElapsed, b.TotalElapsed];
                    break;
                case "HttpMethod":
                    [propertyA, propertyB] = [a.HttpMethod, b.HttpMethod];
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
                (this._matSearchRestApiLogSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchRestApiLogDataSource;
