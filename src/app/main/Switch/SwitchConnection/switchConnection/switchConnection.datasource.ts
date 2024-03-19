import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchConnectionService } from "./switchConnection.service";

export class SwitchConnectionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchConnectionService: SwitchConnectionService,
        private _matSwitchConnectionPaginator: MatPaginator,
        private _matSwitchConnectionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchConnectionService.switchConnectionApiResponse.ConnectionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchConnectionService.onSwitchConnectionChanged,
            this._matSwitchConnectionPaginator.page,
            this._filterChange,
            this._matSwitchConnectionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchConnectionService.switchConnectionApiResponse.ConnectionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchConnectionPaginator.pageIndex *
                    this._matSwitchConnectionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchConnectionPaginator.pageSize
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
            !this._matSwitchConnectionSort.active ||
            this._matSwitchConnectionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matSwitchConnectionSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ApplicationName":
                    [propertyA, propertyB] = [
                        a.ApplicationName,
                        b.ApplicationName,
                    ];
                    break;
                case "SessionName":
                    [propertyA, propertyB] = [a.SessionName, b.SessionName];
                    break;
                case "ConnectionType":
                    [propertyA, propertyB] = [
                        a.ConnectionType,
                        b.ConnectionType,
                    ];
                    break;
                case "RemoteIpAddress":
                    [propertyA, propertyB] = [
                        a.RemoteIpAddress,
                        b.RemoteIpAddress,
                    ];
                    break;
                case "LocalIpAddress":
                    [propertyA, propertyB] = [
                        a.LocalIpAddress,
                        b.LocalIpAddress,
                    ];
                    break;
                case "ConnectionStartDateTime":
                    [propertyA, propertyB] = [
                        a.ConnectionStartDateTime,
                        b.ConnectionStartDateTime,
                    ];
                    break;
                case "ConnectionEndDateTime":
                    [propertyA, propertyB] = [
                        a.ConnectionEndDateTime,
                        b.ConnectionEndDateTime,
                    ];
                    break;
                case "IsConnected":
                    [propertyA, propertyB] = [a.IsConnected, b.IsConnected];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSwitchConnectionSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchConnectionDataSource;
