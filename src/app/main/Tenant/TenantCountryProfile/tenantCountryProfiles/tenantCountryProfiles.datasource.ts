import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TenantCountryProfilesService } from "./tenantCountryProfiles.service";

export class TenantCountryProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private tenantCountryProfilesService: TenantCountryProfilesService,
        private _matTenantCountryProfilesPaginator: MatPaginator,
        private _matTenantCountryProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.tenantCountryProfilesService.tenantCountryApiResponse.TenantCountryProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.tenantCountryProfilesService.onTenantCountryProfilesChanged,
            this._matTenantCountryProfilesPaginator.page,
            this._filterChange,
            this._matTenantCountryProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.tenantCountryProfilesService.tenantCountryApiResponse.TenantCountryProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matTenantCountryProfilesPaginator.pageIndex *
                    this._matTenantCountryProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matTenantCountryProfilesPaginator.pageSize
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
            !this._matTenantCountryProfilesSort.active ||
            this._matTenantCountryProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matTenantCountryProfilesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CountryName":
                    [propertyA, propertyB] = [a.CountryName, b.CountryName];
                    break;
                case "CountryCode":
                    [propertyA, propertyB] = [a.CountryCode, b.CountryCode];
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
                (this._matTenantCountryProfilesSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default TenantCountryProfilesDataSource;
