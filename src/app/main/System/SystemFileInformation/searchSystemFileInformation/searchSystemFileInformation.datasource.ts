import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSystemFileInformationService } from "./searchSystemFileInformation.service";

export class SearchSystemFileInformationDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSystemFileInformationService: SearchSystemFileInformationService,
        private _matSearchSystemFileInformationPaginator: MatPaginator,
        private _matSearchSystemFileInformationSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSystemFileInformationService.systemFileInformationApiResponse.SystemFileInformationList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSystemFileInformationService
                .onSearchSystemFileInformationChanged,
            this._matSearchSystemFileInformationPaginator.page,
            this._filterChange,
            this._matSearchSystemFileInformationSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSystemFileInformationService.systemFileInformationApiResponse.SystemFileInformationList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSystemFileInformationPaginator.pageIndex *
                    this._matSearchSystemFileInformationPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSystemFileInformationPaginator.pageSize
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
            !this._matSearchSystemFileInformationSort.active ||
            this._matSearchSystemFileInformationSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSystemFileInformationSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "IsTenantFile":
                    [propertyA, propertyB] = [a.IsTenantFile, b.IsTenantFile];
                    break;

                case "InsertDate":
                    [propertyA, propertyB] = [a.InsertDate, b.InsertDate];
                    break;
                case "FileFormatCode":
                    [propertyA, propertyB] = [
                        a.FileFormatCode,
                        b.FileFormatCode,
                    ];
                    break;

                case "FileName":
                    [propertyA, propertyB] = [a.FileName, b.FileName];
                    break;

                case "FileSourceName":
                    [propertyA, propertyB] = [
                        a.FileSourceName,
                        b.FileSourceName,
                    ];
                    break;

                case "FileStatusName":
                    [propertyA, propertyB] = [
                        a.FileStatusName,
                        b.FileStatusName,
                    ];
                    break;

                case "FileFormatTypeName":
                    [propertyA, propertyB] = [
                        a.FileFormatTypeName,
                        b.FileFormatTypeName,
                    ];
                    break;

                case "FileDirectionTypeName":
                    [propertyA, propertyB] = [
                        a.FileDirectionTypeName,
                        b.FileDirectionTypeName,
                    ];
                    break;

                case "FileSize":
                    [propertyA, propertyB] = [a.FileSize, b.FileSize];
                    break;

                case "DailyFileIndex":
                    [propertyA, propertyB] = [
                        a.DailyFileIndex,
                        b.DailyFileIndex,
                    ];
                    break;

                case "RecordCount":
                    [propertyA, propertyB] = [a.RecordCount, b.RecordCount];
                    break;

                case "RejectCount":
                    [propertyA, propertyB] = [a.RejectCount, b.RejectCount];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchSystemFileInformationSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSystemFileInformationDataSource;
