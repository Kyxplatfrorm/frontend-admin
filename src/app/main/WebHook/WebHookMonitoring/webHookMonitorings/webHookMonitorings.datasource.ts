import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WebHookMonitoringsService } from "./webHookMonitorings.service";

export class WebHookMonitoringsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private webHookMonitoringsService: WebHookMonitoringsService,
        private _matWebHookMonitoringsPaginator: MatPaginator,
        private _matWebHookMonitoringsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.webHookMonitoringsService.webHookMonitoringApiResponse.WebHookQueueWithoutContentList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.webHookMonitoringsService.onWebHookMonitoringsChanged,
            this._matWebHookMonitoringsPaginator.page,
            this._filterChange,
            this._matWebHookMonitoringsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.webHookMonitoringsService.webHookMonitoringApiResponse.WebHookQueueWithoutContentList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matWebHookMonitoringsPaginator.pageIndex *
                    this._matWebHookMonitoringsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matWebHookMonitoringsPaginator.pageSize
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
            !this._matWebHookMonitoringsSort.active ||
            this._matWebHookMonitoringsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matWebHookMonitoringsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "WebHookTypeName":
                    [propertyA, propertyB] = [
                        a.WebHookTypeName,
                        b.WebHookTypeName,
                    ];
                    break;

                case "RunStatusName":
                    [propertyA, propertyB] = [a.RunStatusName, b.RunStatusName];
                    break;
                case "RecordType":
                    [propertyA, propertyB] = [a.RecordType, b.RecordType];
                    break;
                case "HttpStatusCode":
                    [propertyA, propertyB] = [
                        a.HttpStatusCode,
                        b.HttpStatusCode,
                    ];
                    break;
                case "HttpPostUrl":
                    [propertyA, propertyB] = [a.HttpPostUrl, b.HttpPostUrl];
                    break;
                case "ResultMessage":
                    [propertyA, propertyB] = [a.ResultMessage, b.ResultMessage];
                    break;
                case "RetryCount":
                    [propertyA, propertyB] = [a.RetryCount, b.RetryCount];
                    break;
                case "TotalElapsed":
                    [propertyA, propertyB] = [a.TotalElapsed, b.TotalElapsed];
                    break;
                case "ReferenceNumberType":
                    [propertyA, propertyB] = [
                        a.ReferenceNumberType,
                        b.ReferenceNumberType,
                    ];
                    break;
                case "ReferenceNumber":
                    [propertyA, propertyB] = [
                        a.ReferenceNumber,
                        b.ReferenceNumber,
                    ];
                    break;
                case "DueDateTime":
                    [propertyA, propertyB] = [a.DueDateTime, b.DueDateTime];
                    break;
                case "QueueDateTime":
                    [propertyA, propertyB] = [a.QueueDateTime, b.QueueDateTime];
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
                (this._matWebHookMonitoringsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default WebHookMonitoringsDataSource;
