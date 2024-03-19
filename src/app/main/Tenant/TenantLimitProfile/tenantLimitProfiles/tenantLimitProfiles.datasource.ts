import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TenantLimitProfilesService } from "./tenantLimitProfiles.service";

export class TenantLimitProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private tenantLimitProfilesService: TenantLimitProfilesService,
        private _matTenantLimitProfilesPaginator: MatPaginator,
        private _matTenantLimitProfilesort: MatSort
    ) {
        super();
        this.filteredData =
            this.tenantLimitProfilesService.tenantApiResponse.TenantDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.tenantLimitProfilesService.onTenantLimitProfileChanged,
            this._matTenantLimitProfilesPaginator.page,
            this._filterChange,
            this._matTenantLimitProfilesort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.tenantLimitProfilesService.tenantApiResponse.TenantDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matTenantLimitProfilesPaginator.pageIndex *
                    this._matTenantLimitProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matTenantLimitProfilesPaginator.pageSize
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
            !this._matTenantLimitProfilesort.active ||
            this._matTenantLimitProfilesort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matTenantLimitProfilesort.active) {
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
                (this._matTenantLimitProfilesort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default TenantLimitProfilesDataSource;
