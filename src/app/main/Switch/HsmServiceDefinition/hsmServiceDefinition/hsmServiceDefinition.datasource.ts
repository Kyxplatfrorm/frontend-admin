import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HsmServiceDefinitionService } from "./hsmServiceDefinition.service";

export class HsmServiceDefinitionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private hsmServiceDefinitionService: HsmServiceDefinitionService,
        private _matHsmServiceDefinitionPaginator: MatPaginator,
        private _matHsmServiceDefinitionSort: MatSort
    ) {
        super();
        this.filteredData = this.hsmServiceDefinitionService.hsmConnectionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.hsmServiceDefinitionService.onHsmServiceDefinitionChanged,
            this._filterChange,
            this._matHsmServiceDefinitionSort.sortChange,
            this._matHsmServiceDefinitionPaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.hsmServiceDefinitionService.hsmConnectionList ===
                    undefined
                ) {
                    return;
                }
                if (
                    this.hsmServiceDefinitionService.hsmConnectionList ===
                    undefined
                ) {
                    return;
                }
                let data =
                    this.hsmServiceDefinitionService.hsmConnectionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matHsmServiceDefinitionPaginator.pageIndex *
                    this._matHsmServiceDefinitionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matHsmServiceDefinitionPaginator.pageSize
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
            !this._matHsmServiceDefinitionSort.active ||
            this._matHsmServiceDefinitionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matHsmServiceDefinitionSort.active) {
                case "ApplicationId":
                    [propertyA, propertyB] = [a.ApplicationId, b.ApplicationId];
                    break;
                case "HsmDeviceId":
                    [propertyA, propertyB] = [a.HsmDeviceId, b.HsmDeviceId];
                    break;
                case "HsmDeviceName":
                    [propertyA, propertyB] = [a.HsmDeviceName, b.HsmDeviceName];
                    break;

                case "ConnectionCount":
                    [propertyA, propertyB] = [
                        a.ConnectionCount,
                        b.ConnectionCount,
                    ];
                    break;
                case "ConnectionTimeout":
                    [propertyA, propertyB] = [
                        a.ConnectionTimeout,
                        b.ConnectionTimeout,
                    ];
                    break;
                case "ConnectionCheckTimeSecond":
                    [propertyA, propertyB] = [
                        a.ConnectionCheckTimeSecond,
                        b.ConnectionCheckTimeSecond,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matHsmServiceDefinitionSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default HsmServiceDefinitionDataSource;
