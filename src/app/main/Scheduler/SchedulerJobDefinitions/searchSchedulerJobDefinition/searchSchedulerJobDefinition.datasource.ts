import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSchedulerJobDefinitionService } from "./searchSchedulerJobDefinition.service";

export class SearchSchedulerJobDefinitionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSchedulerJobDefinitionService: SearchSchedulerJobDefinitionService,
        private _matSearchSchedulerJobDefinitionPaginator: MatPaginator,
        private _matSearchSchedulerJobDefinitionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSchedulerJobDefinitionService.schedulerJobDefinitionApiResponse.SchedulerJobDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSchedulerJobDefinitionService
                .onSchedulerJobDefinitionChanged,
            this._matSearchSchedulerJobDefinitionPaginator.page,
            this._filterChange,
            this._matSearchSchedulerJobDefinitionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSchedulerJobDefinitionService.schedulerJobDefinitionApiResponse.SchedulerJobDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSchedulerJobDefinitionPaginator.pageIndex *
                    this._matSearchSchedulerJobDefinitionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSchedulerJobDefinitionPaginator.pageSize
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
            !this._matSearchSchedulerJobDefinitionSort.active ||
            this._matSearchSchedulerJobDefinitionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSchedulerJobDefinitionSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;

                case "RecurringTypeName":
                    [propertyA, propertyB] = [
                        a.RecurringTypeName,
                        b.RecurringTypeName,
                    ];
                    break;
                case "RecurringLevelName":
                    [propertyA, propertyB] = [
                        a.RecurringLevelName,
                        b.RecurringLevelName,
                    ];
                    break;

                case "RecurringWeekDays":
                    [propertyA, propertyB] = [
                        a.RecurringWeekDays,
                        b.RecurringWeekDays,
                    ];
                    break;
                case "LastRunDate":
                    [propertyA, propertyB] = [a.LastRunDate, b.LastRunDate];
                    break;
                case "LastRunStatusName":
                    [propertyA, propertyB] = [
                        a.LastRunStatusName,
                        b.LastRunStatusName,
                    ];
                    break;
                case "RecurringDailyTimes":
                    [propertyA, propertyB] = [
                        a.RecurringDailyTimes,
                        b.RecurringDailyTimes,
                    ];
                    break;
                case "MachineName":
                    [propertyA, propertyB] = [a.MachineName, b.MachineName];
                    break;
                case "LastProcessedStepCount":
                    [propertyA, propertyB] = [
                        a.LastProcessedStepCount,
                        b.LastProcessedStepCount,
                    ];
                    break;
                case "LastSubStepCount":
                    [propertyA, propertyB] = [
                        a.LastSubStepCount,
                        b.LastSubStepCount,
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
                (this._matSearchSchedulerJobDefinitionSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSchedulerJobDefinitionDataSource;
