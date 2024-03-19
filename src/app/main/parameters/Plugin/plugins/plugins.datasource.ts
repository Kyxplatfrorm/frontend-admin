import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PluginService } from "./plugins.service";

export class PluginDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private pluginService: PluginService,
        private _matPluginPaginator: MatPaginator,
        private _matPluginSort: MatSort
    ) {
        super();
        this.filteredData = this.pluginService.pluginApiResponse.PluginList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.pluginService.onPluginChanged,
            this._matPluginPaginator.page,
            this._filterChange,
            this._matPluginSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.pluginService.pluginApiResponse.PluginList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matPluginPaginator.pageIndex *
                    this._matPluginPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matPluginPaginator.pageSize
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
            !this._matPluginSort.active ||
            this._matPluginSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matPluginSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "PluginCode":
                    [propertyA, propertyB] = [a.PluginCode, b.PluginCode];
                    break;
                case "PluginDescription":
                    [propertyA, propertyB] = [
                        a.PluginDescription,
                        b.PluginDescription,
                    ];
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
                (this._matPluginSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default PluginDataSource;
