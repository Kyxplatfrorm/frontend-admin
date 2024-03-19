import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchTransactionCodeMapService } from "./switchTransactionCodeMap.service";

export class SwitchTransactionCodeMapDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchTransactionCodeMapService: SwitchTransactionCodeMapService,
        private _matSwitchTransactionCodeMapPaginator: MatPaginator,
        private _matSwitchTransactionCodeMapSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchTransactionCodeMapService.switchTransactionCodeMapApiResponse.SwitchTransactionCodeMapList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchTransactionCodeMapService
                .onSwitchTransactionCodeMapChanged,
            this._matSwitchTransactionCodeMapPaginator.page,
            this._filterChange,
            this._matSwitchTransactionCodeMapSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchTransactionCodeMapService.switchTransactionCodeMapApiResponse.SwitchTransactionCodeMapList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchTransactionCodeMapPaginator.pageIndex *
                    this._matSwitchTransactionCodeMapPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchTransactionCodeMapPaginator.pageSize
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
            !this._matSwitchTransactionCodeMapSort.active ||
            this._matSwitchTransactionCodeMapSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSwitchTransactionCodeMapSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "NetworkTypeName":
                    [propertyA, propertyB] = [
                        a.NetworkTypeName,
                        b.NetworkTypeName,
                    ];
                    break;
                case "TransactionEntryTypeName":
                    [propertyA, propertyB] = [
                        a.TransactionEntryTypeName,
                        b.TransactionEntryTypeName,
                    ];
                    break;

                case "TransactionCodeName":
                    [propertyA, propertyB] = [
                        a.TransactionCodeName,
                        b.TransactionCodeName,
                    ];
                    break;
                case "IsActive":
                    [propertyA, propertyB] = [a.IsActive, b.IsActive];
                    break;
                case "Mti":
                    [propertyA, propertyB] = [a.Mti, b.Mti];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
                case "ProcessingCode":
                    [propertyA, propertyB] = [
                        a.ProcessingCode,
                        b.ProcessingCode,
                    ];
                    break;
                case "TransactionAmount":
                    [propertyA, propertyB] = [
                        a.TransactionAmount,
                        b.TransactionAmount,
                    ];
                    break;
                case "Priority":
                    [propertyA, propertyB] = [a.Priority, b.Priority];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSwitchTransactionCodeMapSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchTransactionCodeMapDataSource;
