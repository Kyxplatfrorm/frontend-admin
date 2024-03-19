import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchSystemKeyDefinitionService } from "./searchSystemDefinition.service";

export class SearchSystemKeyDefinitionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchSystemKeyDefinitionService: SearchSystemKeyDefinitionService,
        private _matSearchSystemKeyDefinitionPaginator: MatPaginator,
        private _matSearchSystemKeyDefinitionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchSystemKeyDefinitionService.systemKeyApiResponse.SystemKeyDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchSystemKeyDefinitionService
                .onSearchSystemKeyDefinitionChanged,
            this._matSearchSystemKeyDefinitionPaginator.page,
            this._filterChange,
            this._matSearchSystemKeyDefinitionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchSystemKeyDefinitionService.systemKeyApiResponse.SystemKeyDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchSystemKeyDefinitionPaginator.pageIndex *
                    this._matSearchSystemKeyDefinitionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchSystemKeyDefinitionPaginator.pageSize
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
            !this._matSearchSystemKeyDefinitionSort.active ||
            this._matSearchSystemKeyDefinitionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchSystemKeyDefinitionSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
                case "KeyTypeName":
                    [propertyA, propertyB] = [a.KeyTypeName, b.KeyTypeName];
                    break;

                case "KeyCode":
                    [propertyA, propertyB] = [a.KeyCode, b.KeyCode];
                    break;
                case "KeyValue":
                    [propertyA, propertyB] = [a.KeyValue, b.KeyValue];
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
                (this._matSearchSystemKeyDefinitionSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchSystemKeyDefinitionDataSource;
