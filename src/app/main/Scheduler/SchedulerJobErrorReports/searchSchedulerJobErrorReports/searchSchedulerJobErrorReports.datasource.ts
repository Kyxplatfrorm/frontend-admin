import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSchedulerJobErrorReportsService } from "./searchSchedulerJobErrorReports.service";

export class SearchSchedulerJobErrorReportsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSchedulerJobErrorReportsService: SearchSchedulerJobErrorReportsService,
        private _matSearchSchedulerJobErrorReportsPaginator: MatPaginator,
        private _matSearchSchedulerJobErrorReportsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSchedulerJobErrorReportsService.schedulerJobErrorReportApiResponse.SchedulerJobErrorReportList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSchedulerJobErrorReportsService
                .onSearchSchedulerJobErrorReportsChanged,
            this._matSearchSchedulerJobErrorReportsPaginator.page,
            this._filterChange,
            this._matSearchSchedulerJobErrorReportsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSchedulerJobErrorReportsService.schedulerJobErrorReportApiResponse.SchedulerJobErrorReportList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSchedulerJobErrorReportsPaginator.pageIndex *
                    this._matSearchSchedulerJobErrorReportsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSchedulerJobErrorReportsPaginator.pageSize
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
            !this._matSearchSchedulerJobErrorReportsSort.active ||
            this._matSearchSchedulerJobErrorReportsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSchedulerJobErrorReportsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;

                case "RunStatusName":
                    [propertyA, propertyB] = [a.RunStatusName, b.RunStatusName];
                    break;
                case "TotalElapsed":
                    [propertyA, propertyB] = [a.TotalElapsed, b.TotalElapsed];
                    break;

                case "MachineName":
                    [propertyA, propertyB] = [a.MachineName, b.MachineName];
                    break;

                case "SchedulerJobDescription":
                    [propertyA, propertyB] = [
                        a.SchedulerJobDescription,
                        b.SchedulerJobDescription,
                    ];
                    break;

                case "ServerCode":
                    [propertyA, propertyB] = [a.ServerCode, b.ServerCode];
                    break;

                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
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
                (this._matSearchSchedulerJobErrorReportsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSchedulerJobErrorReportsDataSource;
