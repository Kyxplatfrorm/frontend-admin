import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiPermissionProfileService } from "./apiPermissionProfile.service";

export class ApiPermissionProfileDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private apiPermissionProfileService: ApiPermissionProfileService,
        private _matApiPermissionProfilePaginator: MatPaginator,
        private _matApiPermissionProfileSort: MatSort
    ) {
        super();
        this.filteredData =
            this.apiPermissionProfileService.apiPermissionProfileDetailList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.apiPermissionProfileService.onApiPermissionProfileChanged,
            this._filterChange,
            this._matApiPermissionProfileSort.sortChange,
            this._matApiPermissionProfilePaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.apiPermissionProfileService
                        .apiPermissionProfileDetailList === undefined
                ) {
                    return;
                }
                if (
                    this.apiPermissionProfileService
                        .apiPermissionProfileDetailList === undefined
                ) {
                    return;
                }
                let data =
                    this.apiPermissionProfileService.apiPermissionProfileDetailList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matApiPermissionProfilePaginator.pageIndex *
                    this._matApiPermissionProfilePaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matApiPermissionProfilePaginator.pageSize
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
            !this._matApiPermissionProfileSort.active ||
            this._matApiPermissionProfileSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matApiPermissionProfileSort.active) {
                case "ProfileName":
                    [propertyA, propertyB] = [a.ProfileName, b.ProfileName];
                    break;
                case "ApiDefinitionName":
                    [propertyA, propertyB] = [
                        a.ApiDefinitionName,
                        b.ApiDefinitionName,
                    ];
                    break;

                case "ApiLimitProfileName":
                    [propertyA, propertyB] = [
                        a.ApiLimitProfileName,
                        b.ApiLimitProfileName,
                    ];
                    break;
                case "IsActive":
                    [propertyA, propertyB] = [a.IsActive, b.IsActive];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matApiPermissionProfileSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ApiPermissionProfileDataSource;
