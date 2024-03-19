import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSchedulerInstantJobProfilesService } from "./searchSchedulerInstantJobProfiles.service";

export class SearchSchedulerInstantJobProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSchedulerInstantJobProfilesService: SearchSchedulerInstantJobProfilesService,
        private _matSearchSchedulerInstantJobProfilesPaginator: MatPaginator,
        private _matSearchSchedulerInstantJobProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSchedulerInstantJobProfilesService.schedulerInstantJobProfileApiResponse.SchedulerInstantJobProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSchedulerInstantJobProfilesService
                .onSearchSchedulerInstantJobProfilesChanged,
            this._matSearchSchedulerInstantJobProfilesPaginator.page,
            this._filterChange,
            this._matSearchSchedulerInstantJobProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSchedulerInstantJobProfilesService.schedulerInstantJobProfileApiResponse.SchedulerInstantJobProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSchedulerInstantJobProfilesPaginator
                        .pageIndex *
                    this._matSearchSchedulerInstantJobProfilesPaginator
                        .pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSchedulerInstantJobProfilesPaginator.pageSize
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
            !this._matSearchSchedulerInstantJobProfilesSort.active ||
            this._matSearchSchedulerInstantJobProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSchedulerInstantJobProfilesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "ProfileCode":
                    [propertyA, propertyB] = [a.ProfileCode, b.ProfileCode];
                    break;

                case "ServerCode":
                    [propertyA, propertyB] = [a.ServerCode, b.ServerCode];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
                case "SchedulerJobTypeName":
                    [propertyA, propertyB] = [
                        a.SchedulerJobTypeName,
                        b.SchedulerJobTypeName,
                    ];
                    break;
                case "ApplicationPath":
                    [propertyA, propertyB] = [
                        a.ApplicationPath,
                        b.ApplicationPath,
                    ];
                    break;
                case "ApplicationName":
                    [propertyA, propertyB] = [
                        a.ApplicationName,
                        b.ApplicationName,
                    ];
                    break;
                case "ApplicationParameter":
                    [propertyA, propertyB] = [
                        a.ApplicationParameter,
                        b.ApplicationParameter,
                    ];
                    break;
                case "FullClassName":
                    [propertyA, propertyB] = [a.FullClassName, b.FullClassName];
                    break;
                case "MethodName":
                    [propertyA, propertyB] = [a.MethodName, b.MethodName];
                    break;
                case "ProcedureName":
                    [propertyA, propertyB] = [a.ProcedureName, b.ProcedureName];
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
                (this._matSearchSchedulerInstantJobProfilesSort.direction ===
                "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSchedulerInstantJobProfilesDataSource;
