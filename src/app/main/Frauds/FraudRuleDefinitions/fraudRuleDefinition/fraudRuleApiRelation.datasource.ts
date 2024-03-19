import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FraudRuleDefinitionService } from "./fraudRuleDefinition.service";

export class FraudRuleApiRelationDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private fraudRuleDefinitionService: FraudRuleDefinitionService,
        private _matFraudRuleApiRelationPaginator: MatPaginator,
        private _matFraudRuleApiRelationSort: MatSort
    ) {
        super();
        this.filteredData =
            this.fraudRuleDefinitionService.fraudRuleApiRelation;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.fraudRuleDefinitionService.onFraudRuleDefinitionChanged,
            this._filterChange,
            this._matFraudRuleApiRelationSort.sortChange,
            this._matFraudRuleApiRelationPaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.fraudRuleDefinitionService.fraudRuleApiRelation ===
                    undefined
                ) {
                    return;
                }
                if (
                    this.fraudRuleDefinitionService.fraudRuleApiRelation ===
                    undefined
                ) {
                    return;
                }
                let data =
                    this.fraudRuleDefinitionService.fraudRuleApiRelation.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matFraudRuleApiRelationPaginator.pageIndex *
                    this._matFraudRuleApiRelationPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matFraudRuleApiRelationPaginator.pageSize
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
            !this._matFraudRuleApiRelationSort.active ||
            this._matFraudRuleApiRelationSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matFraudRuleApiRelationSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;

                case "FraudRuleName":
                    [propertyA, propertyB] = [a.FraudRuleName, b.FraudRuleName];
                    break;

                case "IsActive":
                    [propertyA, propertyB] = [a.IsActive, b.IsActive];
                    break;

                case "Priority":
                    [propertyA, propertyB] = [a.Priority, b.Priority];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matFraudRuleApiRelationSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default FraudRuleApiRelationDataSource;
