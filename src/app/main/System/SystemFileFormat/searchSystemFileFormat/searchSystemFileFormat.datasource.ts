import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSystemFileFormatService } from "./searchSystemFileFormat.service";

export class SearchSystemFileFormatDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSystemFileFormatService: SearchSystemFileFormatService,
        private _matSearchSystemFileFormatPaginator: MatPaginator,
        private _matSearchSystemFileFormatSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSystemFileFormatService.systemFileFormatApiResponse.SystemFileFormatList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSystemFileFormatService.onSearchSystemFileFormatChanged,
            this._matSearchSystemFileFormatPaginator.page,
            this._filterChange,
            this._matSearchSystemFileFormatSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSystemFileFormatService.systemFileFormatApiResponse.SystemFileFormatList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSystemFileFormatPaginator.pageIndex *
                    this._matSearchSystemFileFormatPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSystemFileFormatPaginator.pageSize
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
            !this._matSearchSystemFileFormatSort.active ||
            this._matSearchSystemFileFormatSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSystemFileFormatSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
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
                case "FileNameFormat":
                    [propertyA, propertyB] = [
                        a.FileNameFormat,
                        b.FileNameFormat,
                    ];
                    break;

                case "FileFormatCode":
                    [propertyA, propertyB] = [
                        a.FileFormatCode,
                        b.FileFormatCode,
                    ];
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
                (this._matSearchSystemFileFormatSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSystemFileFormatDataSource;
