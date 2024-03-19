import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResourceGroupService } from "./resourceGroup.service";

export class ResourceGroupDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private resourceGroupService: ResourceGroupService,
        private _matResourceGroupPaginator: MatPaginator,
        private _matResourceGroupSort: MatSort
    ) {
        super();
        this.filteredData = this.resourceGroupService.resourceList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.resourceGroupService.onResourceGroupChanged,
            this._matResourceGroupPaginator.page,
            this._matResourceGroupSort.sortChange,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.resourceGroupService.resourceList === undefined) {
                    return;
                }
                if (this.resourceGroupService.resourceList === undefined) {
                    return;
                }
                let data = this.resourceGroupService.resourceList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matResourceGroupPaginator.pageIndex *
                    this._matResourceGroupPaginator.pageSize;

                return data.splice(
                    startIndex,
                    this._matResourceGroupPaginator.pageSize
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
            !this._matResourceGroupSort.active ||
            this._matResourceGroupSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matResourceGroupSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ResourceCode":
                    [propertyA, propertyB] = [a.ResourceCode, b.ResourceCode];
                    break;
                case "ResourceGroupCode":
                    [propertyA, propertyB] = [
                        a.ResourceGroupCode,
                        b.ResourceGroupCode,
                    ];
                    break;
                case "LanguageCode":
                    [propertyA, propertyB] = [a.LanguageCode, b.LanguageCode];
                    break;
                case "Description":
                    [propertyA, propertyB] = [a.Description, b.Description];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matResourceGroupSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ResourceGroupDataSource;
