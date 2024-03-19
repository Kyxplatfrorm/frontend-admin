import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchApplicationDefinitionService } from "./switchApplicationDefinition.service";

export class SessionConnectionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchApplicationDefinitionService: SwitchApplicationDefinitionService,
        private _matSwitchAppDefinitionPaginator: MatPaginator,
        private _matSwitchAppDefinitionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchApplicationDefinitionService.sessionConnectionList;
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
                    this.switchApplicationDefinitionService
                        .sessionConnectionList === undefined
                ) {
                    return;
                }
                if (
                    this.switchApplicationDefinitionService
                        .sessionConnectionList === undefined
                ) {
                    return;
                }
                let data =
                    this.switchApplicationDefinitionService.sessionConnectionList.slice();

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
                case "SessionName":
                    [propertyA, propertyB] = [a.SessionName, b.SessionName];
                    break;
                case "Priority":
                    [propertyA, propertyB] = [a.Priority, b.Priority];
                    break;
                case "Server":
                    [propertyA, propertyB] = [a.Server, b.Server];
                    break;

                case "Port":
                    [propertyA, propertyB] = [a.Port, b.Port];
                    break;
                case "PermittedIpAddress":
                    [propertyA, propertyB] = [
                        a.PermittedIpAddress,
                        b.PermittedIpAddress,
                    ];
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

export default SessionConnectionDataSource;
