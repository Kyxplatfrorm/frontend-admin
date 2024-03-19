import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchTransactionCodeMapsService } from "./switchTransactionCodeMaps.service";

export class SwitchTransactionCodeMapsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchTransactionCodeMapsService: SwitchTransactionCodeMapsService,
        private _matSwitchTransactionCodeMapsPaginator: MatPaginator,
        private _matSwitchTransactionCodeMapsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchTransactionCodeMapsService.switchCardNetworkApiResponse.SwitchCardNetworkList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchTransactionCodeMapsService
                .onSwitchTransactionCodeMapsChanged,
            this._matSwitchTransactionCodeMapsPaginator.page,
            this._filterChange,
            this._matSwitchTransactionCodeMapsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchTransactionCodeMapsService.switchCardNetworkApiResponse.SwitchCardNetworkList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchTransactionCodeMapsPaginator.pageIndex *
                    this._matSwitchTransactionCodeMapsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchTransactionCodeMapsPaginator.pageSize
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
            !this._matSwitchTransactionCodeMapsSort.active ||
            this._matSwitchTransactionCodeMapsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSwitchTransactionCodeMapsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "NetworkType":
                    [propertyA, propertyB] = [a.NetworkType, b.NetworkType];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSwitchTransactionCodeMapsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchTransactionCodeMapsDataSource;
