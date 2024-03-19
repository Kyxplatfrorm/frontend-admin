import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserProfilesService } from "./userProfiles.service";

export class UserProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private userProfilesService: UserProfilesService,
        private _matUserProfilesPaginator: MatPaginator,
        private _matUserProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.userProfilesService.userProfilesApiResponse.UserProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.userProfilesService.onUserProfilesChanged,
            this._matUserProfilesPaginator.page,
            this._filterChange,
            this._matUserProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.userProfilesService.userProfilesApiResponse.UserProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matUserProfilesPaginator.pageIndex *
                    this._matUserProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matUserProfilesPaginator.pageSize
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
            !this._matUserProfilesSort.active ||
            this._matUserProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matUserProfilesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ProfileCode":
                    [propertyA, propertyB] = [a.ProfileCode, b.ProfileCode];
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
                (this._matUserProfilesSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default UserProfilesDataSource;
