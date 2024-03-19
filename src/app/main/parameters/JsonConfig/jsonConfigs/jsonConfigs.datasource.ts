import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JsonConfigsService } from "./jsonConfigs.service";

export class JsonConfigDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private jsonConfigsService: JsonConfigsService,
        private _matJsonConfigPaginator: MatPaginator,
        private _matJsonConfigSort: MatSort
    ) {
        super();
        this.filteredData =
            this.jsonConfigsService.jsonConfigApiResponse.JsonConfigList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.jsonConfigsService.onJsonConfigChanged,
            this._matJsonConfigPaginator.page,
            this._filterChange,
            this._matJsonConfigSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.jsonConfigsService.jsonConfigApiResponse.JsonConfigList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matJsonConfigPaginator.pageIndex *
                    this._matJsonConfigPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matJsonConfigPaginator.pageSize
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
            !this._matJsonConfigSort.active ||
            this._matJsonConfigSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matJsonConfigSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "ConfigCode":
                    [propertyA, propertyB] = [a.ConfigCode, b.ConfigCode];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
                case "ConfigValue":
                    [propertyA, propertyB] = [a.ConfigValue, b.ConfigValue];
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
                (this._matJsonConfigSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default JsonConfigDataSource;
