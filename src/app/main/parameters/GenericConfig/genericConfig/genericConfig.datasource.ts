import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GenericConfigGroupsService } from "../genericConfigGroups/genericConfigGroups.service";

export class GenericConfigDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private genericConfigGroupsService: GenericConfigGroupsService,
        private _matGenericConfigPaginator: MatPaginator,
        private _matGenericConfigSort: MatSort
    ) {
        super();
        this.filteredData = this.genericConfigGroupsService.genericConfigList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.genericConfigGroupsService.onGenericConfigGroupChanged,
            this._filterChange,
            this._matGenericConfigSort.sortChange,
            this._matGenericConfigPaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.genericConfigGroupsService.genericConfigList ===
                    undefined
                ) {
                    return;
                }
                if (
                    this.genericConfigGroupsService.genericConfigList ===
                    undefined
                ) {
                    return;
                }
                let data =
                    this.genericConfigGroupsService.genericConfigList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matGenericConfigPaginator.pageIndex *
                    this._matGenericConfigPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matGenericConfigPaginator.pageSize
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
            !this._matGenericConfigSort.active ||
            this._matGenericConfigSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matGenericConfigSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ConfigKey":
                    [propertyA, propertyB] = [a.ConfigKey, b.ConfigKey];
                    break;
                case "ConfigValue":
                    [propertyA, propertyB] = [a.ConfigValue, b.ConfigValue];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matGenericConfigSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default GenericConfigDataSource;
