import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SchedulerJobDefinitionService } from "./schedulerJobDefinition.service";

export class SchedulerJobDetailDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private schedulerJobDefinitionService: SchedulerJobDefinitionService,
        private _matSchedulerJobDetailPaginator: MatPaginator,
        private _matSchedulerJobDetailSort: MatSort
    ) {
        super();
        this.filteredData =
            this.schedulerJobDefinitionService.schedulerJobDetailList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.schedulerJobDefinitionService.onSchedulerJobDefinitionChanged,
            this._filterChange,
            this._matSchedulerJobDetailSort.sortChange,
            this._matSchedulerJobDetailPaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.schedulerJobDefinitionService
                        .schedulerJobDetailList === undefined
                ) {
                    return;
                }
                if (
                    this.schedulerJobDefinitionService
                        .schedulerJobDetailList === undefined
                ) {
                    return;
                }
                let data =
                    this.schedulerJobDefinitionService.schedulerJobDetailList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSchedulerJobDetailPaginator.pageIndex *
                    this._matSchedulerJobDetailPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSchedulerJobDetailPaginator.pageSize
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
            !this._matSchedulerJobDetailSort.active ||
            this._matSchedulerJobDetailSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSchedulerJobDetailSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;

                case "SchedulerJobName":
                    [propertyA, propertyB] = [
                        a.SchedulerJobName,
                        b.SchedulerJobName,
                    ];
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

                case "LastRunStatus":
                    [propertyA, propertyB] = [a.LastRunStatus, b.LastRunStatus];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSchedulerJobDetailSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SchedulerJobDetailDataSource;
