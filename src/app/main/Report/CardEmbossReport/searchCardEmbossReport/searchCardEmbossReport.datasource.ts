import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchCardEmbossReportService } from "./searchCardEmbossReport.service";

export class SearchCardEmbossReportDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchCardEmbossReportService: SearchCardEmbossReportService,
        private _matSearchCardEmbossReportPaginator: MatPaginator,
        private _matSearchCardEmbossReportSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchCardEmbossReportService.cardEmbossReportApiResponse.CardEmbossReportList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchCardEmbossReportService.onSearchCardEmbossReportChanged,
            this._matSearchCardEmbossReportPaginator.page,
            this._filterChange,
            this._matSearchCardEmbossReportSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchCardEmbossReportService.cardEmbossReportApiResponse.CardEmbossReportList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchCardEmbossReportPaginator.pageIndex *
                    this._matSearchCardEmbossReportPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchCardEmbossReportPaginator.pageSize
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
            !this._matSearchCardEmbossReportSort.active ||
            this._matSearchCardEmbossReportSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchCardEmbossReportSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "InsertDate ":
                    [propertyA, propertyB] = [a.InsertDate, b.InsertDate];
                    break;
                case "CardId":
                    [propertyA, propertyB] = [a.CardId, b.CardId];
                    break;

                case "CustomerId":
                    [propertyA, propertyB] = [a.CustomerId, b.CustomerId];
                    break;
                case "IsNoNameCard":
                    [propertyA, propertyB] = [a.IsNoNameCard, b.IsNoNameCard];
                    break;
                case "CardOrderId ":
                    [propertyA, propertyB] = [a.CardOrderId, b.CardOrderId];
                    break;
                case "ErrorCode":
                    [propertyA, propertyB] = [a.ErrorCode, b.ErrorCode];
                    break;
                case "BranchId":
                    [propertyA, propertyB] = [a.BranchId, b.BranchId];
                    break;
                case "CardTokenNumber":
                    [propertyA, propertyB] = [
                        a.CardTokenNumber,
                        b.CardTokenNumber,
                    ];
                    break;
                case "InsertDateTime":
                    [propertyA, propertyB] = [
                        a.InsertDateTime,
                        b.InsertDateTime,
                    ];
                    break;
                case "PanSequenceNumber":
                    [propertyA, propertyB] = [
                        a.PanSequenceNumber,
                        b.PanSequenceNumber,
                    ];
                    break;
                case "IsExported":
                    [propertyA, propertyB] = [a.IsExported, b.IsExported];
                    break;
                case "ExportDateTime":
                    [propertyA, propertyB] = [
                        a.ExportDateTime,
                        b.ExportDateTime,
                    ];
                    break;
                case "ExportCount":
                    [propertyA, propertyB] = [a.ExportCount, b.ExportCount];
                    break;
                case "FileId":
                    [propertyA, propertyB] = [a.FileId, b.FileId];
                    break;
                case "FileName":
                    [propertyA, propertyB] = [a.FileName, b.FileName];
                    break;
                case "EmbossStatus":
                    [propertyA, propertyB] = [a.EmbossStatus, b.EmbossStatus];
                    break;
                case "ProductId":
                    [propertyA, propertyB] = [a.ProductId, b.ProductId];
                    break;
                case "CardIssuingReasonType":
                    [propertyA, propertyB] = [
                        a.CardIssuingReasonType,
                        b.CardIssuingReasonType,
                    ];
                    break;
                case "ExpiryDate":
                    [propertyA, propertyB] = [a.ExpiryDate, b.ExpiryDate];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchCardEmbossReportSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchCardEmbossReportDataSource;
