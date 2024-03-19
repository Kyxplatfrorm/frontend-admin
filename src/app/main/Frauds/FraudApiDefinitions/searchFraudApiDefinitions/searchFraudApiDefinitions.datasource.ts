import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchFraudApiDefinitionsService } from "./searchFraudApiDefinitions.service";

export class SearchFraudApiDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchFraudApiDefinitionsService: SearchFraudApiDefinitionsService,
        private _matSearchFraudApiDefinitionsPaginator: MatPaginator,
        private _matSearchFraudApiDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchFraudApiDefinitionsService.fraudApiDefinitionApiResponse.FraudApiDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchFraudApiDefinitionsService.onFraudApiDefinitionsChanged,
            this._matSearchFraudApiDefinitionsPaginator.page,
            this._filterChange,
            this._matSearchFraudApiDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchFraudApiDefinitionsService.fraudApiDefinitionApiResponse.FraudApiDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchFraudApiDefinitionsPaginator.pageIndex *
                    this._matSearchFraudApiDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchFraudApiDefinitionsPaginator.pageSize
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
            !this._matSearchFraudApiDefinitionsSort.active ||
            this._matSearchFraudApiDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchFraudApiDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;

                case "ApplicationTypeName":
                    [propertyA, propertyB] = [
                        a.ApplicationTypeName,
                        b.ApplicationTypeName,
                    ];
                    break;
                case "ControllerName":
                    [propertyA, propertyB] = [
                        a.ControllerName,
                        b.ControllerName,
                    ];
                    break;

                case "ActionName":
                    [propertyA, propertyB] = [a.ActionName, b.ActionName];
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
                (this._matSearchFraudApiDefinitionsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchFraudApiDefinitionsDataSource;
