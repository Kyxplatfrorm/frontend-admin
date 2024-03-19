import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FraudGroupDefinitionsService } from "./fraudGroupDefinitions.service";

export class FraudGroupDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private fraudGroupDefinitionsService: FraudGroupDefinitionsService,
        private _matFraudGroupDefinitionsPaginator: MatPaginator,
        private _matFraudGroupDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.fraudGroupDefinitionsService.fraudGroupDefinitionApiResponse.FraudGroupDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.fraudGroupDefinitionsService.onFraudGroupDefinitionsChanged,
            this._matFraudGroupDefinitionsPaginator.page,
            this._filterChange,
            this._matFraudGroupDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.fraudGroupDefinitionsService.fraudGroupDefinitionApiResponse.FraudGroupDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matFraudGroupDefinitionsPaginator.pageIndex *
                    this._matFraudGroupDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matFraudGroupDefinitionsPaginator.pageSize
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
            !this._matFraudGroupDefinitionsSort.active ||
            this._matFraudGroupDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matFraudGroupDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
                case "IsBuiltInDefinition":
                    [propertyA, propertyB] = [
                        a.IsBuiltInDefinition,
                        b.IsBuiltInDefinition,
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
                (this._matFraudGroupDefinitionsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default FraudGroupDefinitionsDataSource;
