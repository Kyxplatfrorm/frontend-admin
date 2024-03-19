import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiLimitProfilesService } from "./apiLimitProfiles.service";

export class ApiLimitProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private apiLimitProfilesService: ApiLimitProfilesService,
        private _matApiLimitProfilesPaginator: MatPaginator,
        private _matApiLimitProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.apiLimitProfilesService.apiLimitProfileApiResponse.ApiLimitProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.apiLimitProfilesService.onApiLimitProfilesChanged,
            this._matApiLimitProfilesPaginator.page,
            this._filterChange,
            this._matApiLimitProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.apiLimitProfilesService.apiLimitProfileApiResponse.ApiLimitProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matApiLimitProfilesPaginator.pageIndex *
                    this._matApiLimitProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matApiLimitProfilesPaginator.pageSize
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
            !this._matApiLimitProfilesSort.active ||
            this._matApiLimitProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matApiLimitProfilesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ProfileName":
                    [propertyA, propertyB] = [a.ProfileName, b.ProfileName];
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
                (this._matApiLimitProfilesSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ApiLimitProfilesDataSource;
