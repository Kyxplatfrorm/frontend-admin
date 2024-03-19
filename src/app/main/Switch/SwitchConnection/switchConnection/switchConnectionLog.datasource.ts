import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchConnectionService } from "./switchConnection.service";
import { SwitchConnectionLogService } from "./switchConnectionLog.service";

export class SwitchConnectionLogDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchConnectionLogService: SwitchConnectionLogService,
        private _matSwitchConnectionLogPaginator: MatPaginator,
        private _matSwitchConnectionLogSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchConnectionLogService.switchConnectionLogApiResponse.ConnectionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchConnectionLogService.onSwitchConnectionLogChanged,
            this._matSwitchConnectionLogPaginator.page,
            this._filterChange,
            this._matSwitchConnectionLogSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchConnectionLogService.switchConnectionLogApiResponse.ConnectionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchConnectionLogPaginator.pageIndex *
                    this._matSwitchConnectionLogPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchConnectionLogPaginator.pageSize
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
            !this._matSwitchConnectionLogSort.active ||
            this._matSwitchConnectionLogSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matSwitchConnectionLogSort.active) {
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
                (this._matSwitchConnectionLogSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchConnectionLogDataSource;
