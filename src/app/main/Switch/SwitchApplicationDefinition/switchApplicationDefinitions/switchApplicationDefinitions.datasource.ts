import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchApplicationDefinitionsService } from "./switchApplicationDefinitions.service";

export class SwitchApplicationDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchApplicationDefinitionsService: SwitchApplicationDefinitionsService,
        private _matSwitchAppDefinitionsPaginator: MatPaginator,
        private _matSwitchAppDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchApplicationDefinitionsService.switchApplicationApiResponse.ApplicationList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchApplicationDefinitionsService
                .onSwitchApplicationDefinitionsChanged,
            this._matSwitchAppDefinitionsPaginator.page,
            this._filterChange,
            this._matSwitchAppDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchApplicationDefinitionsService.switchApplicationApiResponse.ApplicationList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchAppDefinitionsPaginator.pageIndex *
                    this._matSwitchAppDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchAppDefinitionsPaginator.pageSize
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
            !this._matSwitchAppDefinitionsSort.active ||
            this._matSwitchAppDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSwitchAppDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ApplicationType":
                    [propertyA, propertyB] = [
                        a.ApplicationType,
                        b.ApplicationType,
                    ];
                    break;
                case "ServiceName":
                    [propertyA, propertyB] = [a.ServiceName, b.ServiceName];
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
                (this._matSwitchAppDefinitionsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchApplicationDefinitionsDataSource;
