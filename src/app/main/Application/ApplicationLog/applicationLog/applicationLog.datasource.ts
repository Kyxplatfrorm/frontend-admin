import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApplicationLogService } from "./applicationLog.service";

export class ApplicationLogDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private applicationLogService: ApplicationLogService,
        private _matAppLogPaginator: MatPaginator,
        private _matAppLogSort: MatSort
    ) {
        super();
        this.filteredData =
            this.applicationLogService.applicationLogApiResponse.ApplicationLogList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.applicationLogService.onApplicationLogChanged,
            this._matAppLogPaginator.page,
            this._filterChange,
            this._matAppLogSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.applicationLogService.applicationLogApiResponse.ApplicationLogList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matAppLogPaginator.pageIndex *
                    this._matAppLogPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matAppLogPaginator.pageSize
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
            !this._matAppLogSort.active ||
            this._matAppLogSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matAppLogSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ApplicationId":
                    [propertyA, propertyB] = [a.ApplicationId, b.ApplicationId];
                    break;
                case "IsRunning":
                    [propertyA, propertyB] = [a.IsRunning, b.IsRunning];
                    break;
                case "ServiceName":
                    [propertyA, propertyB] = [a.ServiceName, b.ServiceName];
                    break;
                case "ServerName":
                    [propertyA, propertyB] = [a.ServerName, b.ServerName];
                    break;
                case "ApplicationType":
                    [propertyA, propertyB] = [
                        a.ApplicationType,
                        b.ApplicationType,
                    ];
                    break;
                case "StartDateTime":
                    [propertyA, propertyB] = [a.StartDateTime, b.StartDateTime];
                    break;

                case "EndDateTime":
                    [propertyA, propertyB] = [a.EndDateTime, b.EndDateTime];
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
                (this._matAppLogSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ApplicationLogDataSource;
