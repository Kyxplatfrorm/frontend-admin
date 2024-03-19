import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TenantLimitProfileService } from "./tenantLimitProfile.service";

export class TenantLimitProfileDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private tenantLimitProfileService: TenantLimitProfileService,
        private _matTenantLimitProfilePaginator: MatPaginator,
        private _matTenantLimitProfileSort: MatSort
    ) {
        super();
        this.filteredData =
            this.tenantLimitProfileService.tenantLimitProfileDetailList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.tenantLimitProfileService.onTenantLimitProfileChanged,
            this._filterChange,
            this._matTenantLimitProfileSort.sortChange,
            this._matTenantLimitProfilePaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.tenantLimitProfileService
                        .tenantLimitProfileDetailList === undefined
                ) {
                    return;
                }
                if (
                    this.tenantLimitProfileService
                        .tenantLimitProfileDetailList === undefined
                ) {
                    return;
                }
                let data =
                    this.tenantLimitProfileService.tenantLimitProfileDetailList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matTenantLimitProfilePaginator.pageIndex *
                    this._matTenantLimitProfilePaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matTenantLimitProfilePaginator.pageSize
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
            !this._matTenantLimitProfileSort.active ||
            this._matTenantLimitProfileSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matTenantLimitProfileSort.active) {
                case "TransactionGroupName":
                    [propertyA, propertyB] = [
                        a.TransactionGroupName,
                        b.TransactionGroupName,
                    ];
                    break;
            }
            switch (this._matTenantLimitProfileSort.active) {
                case "CustomerSegmentName":
                    [propertyA, propertyB] = [
                        a.CustomerSegmentName,
                        b.CustomerSegmentName,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matTenantLimitProfileSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default TenantLimitProfileDataSource;
