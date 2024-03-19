import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiPermissionProfilesService } from "./apiPermissionProfiles.service";

export class ApiPermissionProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private apiPermissionProfilesService: ApiPermissionProfilesService,
        private _matApiPermissionProfilesPaginator: MatPaginator,
        private _matApiPermissionProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.apiPermissionProfilesService.apiPermissionApiResponse.ApiPermissionProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.apiPermissionProfilesService.onApiPermissionProfilesChanged,
            this._matApiPermissionProfilesPaginator.page,
            this._filterChange,
            this._matApiPermissionProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.apiPermissionProfilesService.apiPermissionApiResponse.ApiPermissionProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matApiPermissionProfilesPaginator.pageIndex *
                    this._matApiPermissionProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matApiPermissionProfilesPaginator.pageSize
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
            !this._matApiPermissionProfilesSort.active ||
            this._matApiPermissionProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matApiPermissionProfilesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ProfileName":
                    [propertyA, propertyB] = [a.ProfileName, b.ProfileName];
                    break;
                case "ApplicationTypeName":
                    [propertyA, propertyB] = [
                        a.ApplicationTypeName,
                        b.ApplicationTypeName,
                    ];
                    break;
                case "PermissionCheckTypeName":
                    [propertyA, propertyB] = [
                        a.PermissionCheckTypeName,
                        b.PermissionCheckTypeName,
                    ];
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
                (this._matApiPermissionProfilesSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ApiPermissionProfilesDataSource;
