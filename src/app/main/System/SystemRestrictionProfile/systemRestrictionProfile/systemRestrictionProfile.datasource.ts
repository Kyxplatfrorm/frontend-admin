import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SystemRestrictionProfileService } from "./systemRestrictionProfile.service";

export class SystemRestrictionProfileDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private systemRestrictionProfileService: SystemRestrictionProfileService,
        private _matSystemRestrictionProfilePaginator: MatPaginator,
        private _matSystemRestrictionProfileSort: MatSort
    ) {
        super();
        this.filteredData =
            this.systemRestrictionProfileService.systemRestrictionProfileDetailList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.systemRestrictionProfileService
                .onSystemRestrictionProfileChanged,
            this._filterChange,
            this._matSystemRestrictionProfileSort.sortChange,
            this._matSystemRestrictionProfilePaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.systemRestrictionProfileService
                        .systemRestrictionProfileDetailList === undefined
                ) {
                    return;
                }
                if (
                    this.systemRestrictionProfileService
                        .systemRestrictionProfileDetailList === undefined
                ) {
                    return;
                }
                let data =
                    this.systemRestrictionProfileService.systemRestrictionProfileDetailList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSystemRestrictionProfilePaginator.pageIndex *
                    this._matSystemRestrictionProfilePaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSystemRestrictionProfilePaginator.pageSize
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
            !this._matSystemRestrictionProfileSort.active ||
            this._matSystemRestrictionProfileSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSystemRestrictionProfileSort.active) {
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
                (this._matSystemRestrictionProfileSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SystemRestrictionProfileDataSource;
