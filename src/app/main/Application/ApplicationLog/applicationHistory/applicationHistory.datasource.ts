import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApplicationLogHistoryService } from "./applicationHistory.service";

export class ApplicationLogHistoryDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private applicationLogHistoryService: ApplicationLogHistoryService,
        private _matApplicaitonHistoryPaginator: MatPaginator,
        private _matApplicationHistorySort: MatSort
    ) {
        super();
        this.filteredData = this.applicationLogHistoryService.logList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.applicationLogHistoryService.onApplicationLogHistoryChanged,
            this._matApplicaitonHistoryPaginator.page,
            this._matApplicationHistorySort.sortChange,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.applicationLogHistoryService.logList === undefined) {
                    return;
                }
                if (this.applicationLogHistoryService.logList === undefined) {
                    return;
                }
                let data = this.applicationLogHistoryService.logList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matApplicaitonHistoryPaginator.pageIndex *
                    this._matApplicaitonHistoryPaginator.pageSize;

                return data.splice(
                    startIndex,
                    this._matApplicaitonHistoryPaginator.pageSize
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
            !this._matApplicationHistorySort.active ||
            this._matApplicationHistorySort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matApplicationHistorySort.active) {
                case "ServerName":
                    [propertyA, propertyB] = [a.ServerName, b.ServerName];
                    break;
                case "ProcessId":
                    [propertyA, propertyB] = [a.ProcessId, b.ProcessId];
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
                case "StartDateTime":
                    [propertyA, propertyB] = [a.StartDateTime, b.StartDateTime];
                    break;
                case "EndDateTime":
                    [propertyA, propertyB] = [a.EndDateTime, b.EndDateTime];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matApplicationHistorySort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ApplicationLogHistoryDataSource;
