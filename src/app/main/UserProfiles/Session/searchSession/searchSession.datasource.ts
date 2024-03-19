import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSessionService } from "./searchSession.service";

export class SearchSessionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSessionService: SearchSessionService,
        private _matSearchSessionPaginator: MatPaginator,
        private _matSearchSessionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSessionService.sessionResponse.SessionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSessionService.onSearchSessionChanged,
            this._matSearchSessionPaginator.page,
            this._filterChange,
            this._matSearchSessionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSessionService.sessionResponse.SessionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSessionPaginator.pageIndex *
                    this._matSearchSessionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSessionPaginator.pageSize
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
            !this._matSearchSessionSort.active ||
            this._matSearchSessionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSessionSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "UserId":
                    [propertyA, propertyB] = [a.UserId, b.UserId];
                    break;
                case "SessionStatus":
                    [propertyA, propertyB] = [a.SessionStatus, b.SessionStatus];
                    break;
                case "UserName":
                    [propertyA, propertyB] = [a.UserName, b.UserName];
                    break;
                case "UserType ":
                    [propertyA, propertyB] = [a.UserType, b.UserType];
                    break;
                case "Server":
                    [propertyA, propertyB] = [a.Server, b.Server];
                    break;
                case "ClientIp":
                    [propertyA, propertyB] = [a.ClientIp, b.ClientIp];
                    break;
                case "StartDateTime":
                    [propertyA, propertyB] = [a.StartDateTime, b.StartDateTime];
                    break;
                case "EndDatetime":
                    [propertyA, propertyB] = [a.EndDatetime, b.EndDatetime];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchSessionSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSessionDataSource;
