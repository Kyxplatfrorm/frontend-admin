import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TenantCardAuthorizationProfilesService } from "./tenantCardAuthorizationProfiles.service";

export class TenantCardAuthorizationProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private tenantCardAuthorizationProfilesService: TenantCardAuthorizationProfilesService,
        private _matTenantCardAuthorizationProfilesPaginator: MatPaginator,
        private _matTenantCardAuthorizationProfilesort: MatSort
    ) {
        super();
        this.filteredData =
            this.tenantCardAuthorizationProfilesService.tenantApiResponse.TenantDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.tenantCardAuthorizationProfilesService
                .onTenantCardAuthorizationProfilesChanged,
            this._matTenantCardAuthorizationProfilesPaginator.page,
            this._filterChange,
            this._matTenantCardAuthorizationProfilesort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.tenantCardAuthorizationProfilesService.tenantApiResponse.TenantDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matTenantCardAuthorizationProfilesPaginator
                        .pageIndex *
                    this._matTenantCardAuthorizationProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matTenantCardAuthorizationProfilesPaginator.pageSize
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
            !this._matTenantCardAuthorizationProfilesort.active ||
            this._matTenantCardAuthorizationProfilesort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matTenantCardAuthorizationProfilesort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "TenantCode":
                    [propertyA, propertyB] = [a.TenantCode, b.TenantCode];
                    break;
                case "DefaultCurrencyCode":
                    [propertyA, propertyB] = [
                        a.DefaultCurrencyCode,
                        b.DefaultCurrencyCode,
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
                (this._matTenantCardAuthorizationProfilesort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default TenantCardAuthorizationProfilesDataSource;
