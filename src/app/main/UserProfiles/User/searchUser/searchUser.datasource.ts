import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchUserService } from "./searchUser.service";

export class SearchUserDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchUserService: SearchUserService,
        private _matSearchUserPaginator: MatPaginator,
        private _matSearchUserSort: MatSort
    ) {
        super();
        this.filteredData = this.searchUserService.userResponse.UserList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchUserService.onSearchUserChanged,
            this._matSearchUserPaginator.page,
            this._filterChange,
            this._matSearchUserSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this.searchUserService.userResponse.UserList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchUserPaginator.pageIndex *
                    this._matSearchUserPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchUserPaginator.pageSize
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
            !this._matSearchUserSort.active ||
            this._matSearchUserSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchUserSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "UserType":
                    [propertyA, propertyB] = [a.UserType, b.UserType];
                    break;
                case "UserName":
                    [propertyA, propertyB] = [a.UserName, b.UserName];
                    break;
                case "UserStatus ":
                    [propertyA, propertyB] = [a.UserStatus, b.UserStatus];
                    break;
                case "HasApiKey":
                    [propertyA, propertyB] = [a.HasApiKey, b.HasApiKey];
                    break;
                case "WrongAttemptCount":
                    [propertyA, propertyB] = [
                        a.WrongAttemptCount,
                        b.WrongAttemptCount,
                    ];
                    break;
                case "UserProfile":
                    [propertyA, propertyB] = [a.UserProfile, b.UserProfile];
                    break;
                case "InsertDateTime":
                    [propertyA, propertyB] = [
                        a.InsertDateTime,
                        b.InsertDateTime,
                    ];
                    break;
                case "UpdateDateTime":
                    [propertyA, propertyB] = [
                        a.UpdateDateTime,
                        b.UpdateDateTime,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchUserSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchUserDataSource;
