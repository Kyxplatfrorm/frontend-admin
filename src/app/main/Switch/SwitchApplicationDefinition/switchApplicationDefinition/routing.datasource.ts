import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchApplicationDefinitionService } from "./switchApplicationDefinition.service";

export class RoutingDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchApplicationDefinitionService: SwitchApplicationDefinitionService,
        private _matSwitchAppDefinitionPaginator: MatPaginator,
        private _matSwitchAppDefinitionSort: MatSort
    ) {
        super();
        this.filteredData = this.switchApplicationDefinitionService.routingList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchApplicationDefinitionService
                .onSwitchApplicationDefinitionChanged,
            this._matSwitchAppDefinitionPaginator.page,
            this._matSwitchAppDefinitionSort.sortChange,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.switchApplicationDefinitionService.routingList ===
                    undefined
                ) {
                    return;
                }
                if (
                    this.switchApplicationDefinitionService.routingList ===
                    undefined
                ) {
                    return;
                }
                let data =
                    this.switchApplicationDefinitionService.routingList.slice();

                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchAppDefinitionPaginator.pageIndex *
                    this._matSwitchAppDefinitionPaginator.pageSize;

                return data.splice(
                    startIndex,
                    this._matSwitchAppDefinitionPaginator.pageSize
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
            !this._matSwitchAppDefinitionSort.active ||
            this._matSwitchAppDefinitionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSwitchAppDefinitionSort.active) {
                case "Id":
                    [propertyA, propertyB] = [
                        a.HsmServiceName,
                        b.HsmServiceName,
                    ];
                    break;
                case "RoutingRuleName":
                    [propertyA, propertyB] = [
                        a.RoutingRuleName,
                        b.RoutingRuleName,
                    ];
                    break;
                case "FromSession":
                    [propertyA, propertyB] = [a.FromSession, b.FromSession];
                    break;
                case "ToSession":
                    [propertyA, propertyB] = [a.ToSession, b.ToSession];
                    break;
                case "Priority":
                    [propertyA, propertyB] = [a.Priority, b.Priority];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSwitchAppDefinitionSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default RoutingDataSource;
