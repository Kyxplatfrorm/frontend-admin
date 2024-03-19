import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchCardNetworksService } from "./switchCardNetworks.service";

export class SwitchCardNetworksDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchCardNetworksService: SwitchCardNetworksService,
        private _matSwitchCardNetworksPaginator: MatPaginator,
        private _matSwitchCardNetworksSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchCardNetworksService.switchCardNetworkApiResponse.SwitchCardNetworkList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchCardNetworksService.onSwitchCardNetworksChanged,
            this._matSwitchCardNetworksPaginator.page,
            this._filterChange,
            this._matSwitchCardNetworksSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchCardNetworksService.switchCardNetworkApiResponse.SwitchCardNetworkList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchCardNetworksPaginator.pageIndex *
                    this._matSwitchCardNetworksPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchCardNetworksPaginator.pageSize
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
            !this._matSwitchCardNetworksSort.active ||
            this._matSwitchCardNetworksSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSwitchCardNetworksSort.active) {
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
                (this._matSwitchCardNetworksSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchCardNetworksDataSource;
