import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResourceGroupsService } from "./resourceGroups.service";

export class ResourceGroupsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private resourceGroupsService: ResourceGroupsService,
        private _matResourceGroupsPaginator: MatPaginator,
        private _matResourceGroupsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.resourceGroupsService.resourceGroupsApiResponse.ResourceGroupList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.resourceGroupsService.onResourceGroupsChanged,
            this._matResourceGroupsPaginator.page,
            this._filterChange,
            this._matResourceGroupsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.resourceGroupsService.resourceGroupsApiResponse.ResourceGroupList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matResourceGroupsPaginator.pageIndex *
                    this._matResourceGroupsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matResourceGroupsPaginator.pageSize
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
            !this._matResourceGroupsSort.active ||
            this._matResourceGroupsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matResourceGroupsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "GroupCode":
                    [propertyA, propertyB] = [a.GroupCode, b.GroupCode];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
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
                (this._matResourceGroupsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ResourceGroupsDataSource;
