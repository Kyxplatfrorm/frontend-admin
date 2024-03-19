import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSchedulerJobReportsService } from "./searchSchedulerJobReports.service";

export class SearchSchedulerJobReportsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSchedulerJobReportsService: SearchSchedulerJobReportsService,
        private _matSearchSchedulerJobReportsPaginator: MatPaginator,
        private _matSearchSchedulerJobReportsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSchedulerJobReportsService.schedulerJobReportApiResponse.SchedulerJobQueueList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSchedulerJobReportsService
                .onSearchSchedulerJobReportsChanged,
            this._matSearchSchedulerJobReportsPaginator.page,
            this._filterChange,
            this._matSearchSchedulerJobReportsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSchedulerJobReportsService.schedulerJobReportApiResponse.SchedulerJobQueueList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSchedulerJobReportsPaginator.pageIndex *
                    this._matSearchSchedulerJobReportsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSchedulerJobReportsPaginator.pageSize
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
            !this._matSearchSchedulerJobReportsSort.active ||
            this._matSearchSchedulerJobReportsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSchedulerJobReportsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "ServerCode":
                    [propertyA, propertyB] = [a.ServerCode, b.ServerCode];
                    break;

                case "SchedulerJobName":
                    [propertyA, propertyB] = [
                        a.SchedulerJobName,
                        b.SchedulerJobName,
                    ];
                    break;
                case "SchedulerJobDetailName":
                    [propertyA, propertyB] = [
                        a.SchedulerJobDetailName,
                        b.SchedulerJobDetailName,
                    ];
                    break;
                case "RecurringTypeName":
                    [propertyA, propertyB] = [
                        a.RecurringTypeName,
                        b.RecurringTypeName,
                    ];
                    break;

                case "RunStatusName":
                    [propertyA, propertyB] = [a.RunStatusName, b.RunStatusName];
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
                case "ResultMessage":
                    [propertyA, propertyB] = [a.ResultMessage, b.ResultMessage];
                    break;
                case "MachineName":
                    [propertyA, propertyB] = [a.MachineName, b.MachineName];
                    break;

                case "InsertDateTime":
                    [propertyA, propertyB] = [
                        a.InsertDateTime,
                        b.InsertDateTime,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchSchedulerJobReportsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSchedulerJobReportsDataSource;
