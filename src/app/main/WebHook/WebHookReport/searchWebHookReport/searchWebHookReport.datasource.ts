import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchWebHookReportService } from "./searchWebHookReport.service";

export class SearchWebHookReportDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchWebHookReportService: SearchWebHookReportService,
        private _matSearchWebHookReportPaginator: MatPaginator,
        private _matSearchWebHookReportSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchWebHookReportService.webHookReportApiResponse.WebHookReportList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchWebHookReportService.onSearchWebHookReportChanged,
            this._matSearchWebHookReportPaginator.page,
            this._filterChange,
            this._matSearchWebHookReportSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchWebHookReportService.webHookReportApiResponse.WebHookReportList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchWebHookReportPaginator.pageIndex *
                    this._matSearchWebHookReportPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchWebHookReportPaginator.pageSize
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
            !this._matSearchWebHookReportSort.active ||
            this._matSearchWebHookReportSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchWebHookReportSort.active) {
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

                case "RecordType":
                    [propertyA, propertyB] = [a.RecordType, b.RecordType];
                    break;
                case "RunStatusName":
                    [propertyA, propertyB] = [a.RunStatusName, b.RunStatusName];
                    break;
                case "DueDateTime":
                    [propertyA, propertyB] = [a.DueDateTime, b.DueDateTime];
                    break;
                case "HttpPostUrl":
                    [propertyA, propertyB] = [a.HttpPostUrl, b.HttpPostUrl];
                    break;
                case "ResultMessage":
                    [propertyA, propertyB] = [a.ResultMessage, b.ResultMessage];
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
                (this._matSearchWebHookReportSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchWebHookReportDataSource;
