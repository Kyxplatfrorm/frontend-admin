import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchApplicationUrlDefinitionsService } from "./searchApplicationUrlDefinitions.service";

export class SearchApplicationUrlDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchApplicationUrlDefinitionsService: SearchApplicationUrlDefinitionsService,
        private _matSearchApplicationUrlDefinitionsPaginator: MatPaginator,
        private _matSearchApplicationUrlDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchApplicationUrlDefinitionsService.urlDefinitionApiResponse.ApplicationUrlDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchApplicationUrlDefinitionsService
                .onApplicationUrlDefinitionsChanged,
            this._matSearchApplicationUrlDefinitionsPaginator.page,
            this._filterChange,
            this._matSearchApplicationUrlDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchApplicationUrlDefinitionsService.urlDefinitionApiResponse.ApplicationUrlDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchApplicationUrlDefinitionsPaginator
                        .pageIndex *
                    this._matSearchApplicationUrlDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchApplicationUrlDefinitionsPaginator.pageSize
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
            !this._matSearchApplicationUrlDefinitionsSort.active ||
            this._matSearchApplicationUrlDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchApplicationUrlDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;

                case "ApplicationTypeName":
                    [propertyA, propertyB] = [
                        a.ApplicationTypeName,
                        b.ApplicationTypeName,
                    ];
                    break;
                case "Url":
                    [propertyA, propertyB] = [a.Url, b.Url];
                    break;

                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
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
                (this._matSearchApplicationUrlDefinitionsSort.direction ===
                "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchApplicationUrlDefinitionsDataSource;
