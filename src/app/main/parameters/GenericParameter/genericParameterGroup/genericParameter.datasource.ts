import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GenericParameterGroupsService } from "../genericParameterGroups/genericParameterGroups.service";

export class GenericParameterDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private genericParameterGroupsService: GenericParameterGroupsService,
        private _matGenericParameterPaginator: MatPaginator,
        private _matGenericParameterSort: MatSort
    ) {
        super();
        this.filteredData =
            this.genericParameterGroupsService.genericParameterList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.genericParameterGroupsService.onGenericParameterGroupsChanged,
            this._filterChange,
            this._matGenericParameterSort.sortChange,
            this._matGenericParameterPaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.genericParameterGroupsService.genericParameterList ===
                    undefined
                ) {
                    return;
                }
                if (
                    this.genericParameterGroupsService.genericParameterList ===
                    undefined
                ) {
                    return;
                }
                let data =
                    this.genericParameterGroupsService.genericParameterList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matGenericParameterPaginator.pageIndex *
                    this._matGenericParameterPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matGenericParameterPaginator.pageSize
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
            !this._matGenericParameterSort.active ||
            this._matGenericParameterSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matGenericParameterSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "GroupCode":
                    [propertyA, propertyB] = [a.GroupCode, b.GroupCode];
                    break;
                case "ParameterKey":
                    [propertyA, propertyB] = [a.ParameterKey, b.ParameterKey];
                    break;
                case "ParameterValue":
                    [propertyA, propertyB] = [
                        a.ParameterValue,
                        b.ParameterValue,
                    ];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matGenericParameterSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default GenericParameterDataSource;
