import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchNotificationReportService } from "./searchNotificationReport.service";

export class SearchNotificationReportDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchNotificationReportService: SearchNotificationReportService,
        private _matSearchNotificationReportPaginator: MatPaginator,
        private _matSearchNotificationReportSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchNotificationReportService.notificationReportApiResponse.NotificationReportList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchNotificationReportService
                .onSearchNotificationReportChanged,
            this._matSearchNotificationReportPaginator.page,
            this._filterChange,
            this._matSearchNotificationReportSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchNotificationReportService.notificationReportApiResponse.NotificationReportList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchNotificationReportPaginator.pageIndex *
                    this._matSearchNotificationReportPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchNotificationReportPaginator.pageSize
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
            !this._matSearchNotificationReportSort.active ||
            this._matSearchNotificationReportSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchNotificationReportSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "CustomerName":
                    [propertyA, propertyB] = [a.CustomerName, b.CustomerName];
                    break;

                case "NotificationTypeName":
                    [propertyA, propertyB] = [
                        a.NotificationTypeName,
                        b.NotificationTypeName,
                    ];
                    break;
                case "LanguageCodeName":
                    [propertyA, propertyB] = [
                        a.LanguageCodeName,
                        b.LanguageCodeName,
                    ];
                    break;
                case "ReceiverAddress":
                    [propertyA, propertyB] = [
                        a.ReceiverAddress,
                        b.ReceiverAddress,
                    ];
                    break;
                case "Subject":
                    [propertyA, propertyB] = [a.Subject, b.Subject];
                    break;
                case "SentStatusName":
                    [propertyA, propertyB] = [
                        a.SentStatusName,
                        b.SentStatusName,
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
                (this._matSearchNotificationReportSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchNotificationReportDataSource;
