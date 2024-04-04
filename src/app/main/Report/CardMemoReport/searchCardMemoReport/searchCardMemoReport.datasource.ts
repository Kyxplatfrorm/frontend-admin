import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchCardMemoReportService } from "./searchCardMemoReport.service";

export class SearchCardMemoReportDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchCardMemoReportService: SearchCardMemoReportService,
        private _matSearchCardMemoReportPaginator: MatPaginator,
        private _matSearchCardMemoReportSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchCardMemoReportService.cardMemoReportApiResponse.CardMemoReportList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchCardMemoReportService.onSearchCardMemoReportChanged,
            this._matSearchCardMemoReportPaginator.page,
            this._filterChange,
            this._matSearchCardMemoReportSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchCardMemoReportService.cardMemoReportApiResponse.CardMemoReportList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchCardMemoReportPaginator.pageIndex *
                    this._matSearchCardMemoReportPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchCardMemoReportPaginator.pageSize
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
            !this._matSearchCardMemoReportSort.active ||
            this._matSearchCardMemoReportSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchCardMemoReportSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CustomerId ":
                    [propertyA, propertyB] = [a.CustomerId, b.CustomerId];
                    break;

                case "MemoDate ":
                    [propertyA, propertyB] = [a.MemoDate, b.MemoDate];
                    break;
                case "ApplicationTypeName":
                    [propertyA, propertyB] = [
                        a.ApplicationTypeName,
                        b.ApplicationTypeName,
                    ];
                    break;

                case "MemoChannelTypeName":
                    [propertyA, propertyB] = [
                        a.MemoChannelTypeName,
                        b.MemoChannelTypeName,
                    ];
                    break;
                case "MemoKeyTypeName":
                    [propertyA, propertyB] = [
                        a.MemoKeyTypeName,
                        b.MemoKeyTypeName,
                    ];
                    break;
                case "MemoTypeName ":
                    [propertyA, propertyB] = [a.MemoTypeName, b.MemoTypeName];
                    break;
                case "MemoKey":
                    [propertyA, propertyB] = [a.MemoKey, b.MemoKey];
                    break;
                case "MemoCode":
                    [propertyA, propertyB] = [a.MemoCode, b.MemoCode];
                    break;
                case "MemoCodeName":
                    [propertyA, propertyB] = [a.MemoCodeName, b.MemoCodeName];
                    break;
                case "InsertDateTime":
                    [propertyA, propertyB] = [
                        a.InsertDateTime,
                        b.InsertDateTime,
                    ];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
                case "InsertUserName":
                    [propertyA, propertyB] = [
                        a.InsertUserName,
                        b.InsertUserName,
                    ];
                    break;
                case "NewValue":
                    [propertyA, propertyB] = [a.NewValue, b.NewValue];
                    break;
                case "OldValue":
                    [propertyA, propertyB] = [a.OldValue, b.OldValue];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchCardMemoReportSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchCardMemoReportDataSource;
