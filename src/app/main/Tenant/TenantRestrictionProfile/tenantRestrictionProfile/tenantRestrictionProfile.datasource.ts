import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TenantRestrictionProfileService } from "./tenantRestrictionProfile.service";

export class TenantRestrictionProfileDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private tenantRestrictionProfileService: TenantRestrictionProfileService,
        private _matTenantRestrictionProfilePaginator: MatPaginator,
        private _matTenantRestrictionProfileSort: MatSort
    ) {
        super();
        this.filteredData =
            this.tenantRestrictionProfileService.tenantRestrictionProfileDetail;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.tenantRestrictionProfileService
                .onTenantRestrictionProfileChanged,
            this._filterChange,
            this._matTenantRestrictionProfileSort.sortChange,
            this._matTenantRestrictionProfilePaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.tenantRestrictionProfileService
                        .tenantRestrictionProfileDetail === undefined
                ) {
                    return;
                }
                if (
                    this.tenantRestrictionProfileService
                        .tenantRestrictionProfileDetail === undefined
                ) {
                    return;
                }
                let data =
                    this.tenantRestrictionProfileService.tenantRestrictionProfileDetail.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matTenantRestrictionProfilePaginator.pageIndex *
                    this._matTenantRestrictionProfilePaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matTenantRestrictionProfilePaginator.pageSize
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
            !this._matTenantRestrictionProfileSort.active ||
            this._matTenantRestrictionProfileSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matTenantRestrictionProfileSort.active) {
                case "RestrictionCheckType":
                    [propertyA, propertyB] = [
                        a.RestrictionCheckType,
                        b.RestrictionCheckType,
                    ];
                    break;
                case "RestrictionType":
                    [propertyA, propertyB] = [
                        a.RestrictionType,
                        b.RestrictionType,
                    ];
                    break;
                case "RestrictionCode":
                    [propertyA, propertyB] = [
                        a.RestrictionCode,
                        b.RestrictionCode,
                    ];
                    break;
                case "RestrictionCodeDescription":
                    [propertyA, propertyB] = [
                        a.RestrictionCodeDescription,
                        b.RestrictionCodeDescription,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matTenantRestrictionProfileSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default TenantRestrictionProfileDataSource;
