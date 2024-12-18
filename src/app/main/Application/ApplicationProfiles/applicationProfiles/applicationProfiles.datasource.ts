import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApplicationProfilesService } from "./applicationProfiles.service";

export class ApplicationProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private applicationProfilesService: ApplicationProfilesService,
        private _matAppProfilesPaginator: MatPaginator,
        private _matAppProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.applicationProfilesService.applicationProfilesApiResponse.ApplicationProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.applicationProfilesService.onAppProfilesChanged,
            this._matAppProfilesPaginator.page,
            this._filterChange,
            this._matAppProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.applicationProfilesService.applicationProfilesApiResponse.ApplicationProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matAppProfilesPaginator.pageIndex *
                    this._matAppProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matAppProfilesPaginator.pageSize
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
            !this._matAppProfilesSort.active ||
            this._matAppProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matAppProfilesSort.active) {
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
                (this._matAppProfilesSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ApplicationProfilesDataSource;
