import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchFraudRuleDefinitionsService } from "./searchFraudRuleDefinitions.service";

export class SearchFraudRuleDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchFraudRuleDefinitionsService: SearchFraudRuleDefinitionsService,
        private _matSearchFraudRuleDefinitionsPaginator: MatPaginator,
        private _matSearchFraudRuleDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchFraudRuleDefinitionsService.fraudRuleDefinitionApiResponse.FraudRuleDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchFraudRuleDefinitionsService
                .onFraudRuleDefinitionsChanged,
            this._matSearchFraudRuleDefinitionsPaginator.page,
            this._filterChange,
            this._matSearchFraudRuleDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchFraudRuleDefinitionsService.fraudRuleDefinitionApiResponse.FraudRuleDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchFraudRuleDefinitionsPaginator.pageIndex *
                    this._matSearchFraudRuleDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchFraudRuleDefinitionsPaginator.pageSize
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
            !this._matSearchFraudRuleDefinitionsSort.active ||
            this._matSearchFraudRuleDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchFraudRuleDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;

                case "FraudGroupName":
                    [propertyA, propertyB] = [
                        a.FraudGroupName,
                        b.FraudGroupName,
                    ];
                    break;
                case "FraudQuery":
                    [propertyA, propertyB] = [a.FraudQuery, b.FraudQuery];
                    break;

                case "FraudRuleActionTypeName":
                    [propertyA, propertyB] = [
                        a.FraudRuleActionTypeName,
                        b.FraudRuleActionTypeName,
                    ];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "FraudRuleCheckTimeTypeName":
                    [propertyA, propertyB] = [
                        a.FraudRuleCheckTimeTypeName,
                        b.FraudRuleCheckTimeTypeName,
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
                (this._matSearchFraudRuleDefinitionsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchFraudRuleDefinitionsDataSource;
