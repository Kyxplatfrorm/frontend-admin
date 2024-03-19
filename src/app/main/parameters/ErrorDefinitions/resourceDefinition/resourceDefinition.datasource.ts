import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResourceDefinitionService } from "./resourceDefinition.service";

export class ResourceDefinitionsDataSource extends DataSource<any> {
    [x: string]: any;
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private resourceDefinitionService: ResourceDefinitionService,
        private matResourceDefPaginator: MatPaginator,
        private matResourceDefSort: MatSort
    ) {
        super();
        this.filteredData = this.resourceDefinitionService.resourceList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.resourceDefinitionService.onErrorResourceChanged,
            this.matResourceDefPaginator.page,
            this.matResourceDefSort.sortChange,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.resourceDefinitionService.resourceList === undefined) {
                    return;
                }
                if (this.resourceDefinitionService.resourceList === undefined) {
                    return;
                }
                let data = this.resourceDefinitionService.resourceList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this.matResourceDefPaginator.pageIndex *
                    this.matResourceDefPaginator.pageSize;

                return data.splice(
                    startIndex,
                    this.matResourceDefPaginator.pageSize
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
            !this.matResourceDefSort.active ||
            this.matResourceDefSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this.matResourceDefSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "LanguageCode":
                    [propertyA, propertyB] = [a.LanguageCode, b.LanguageCode];
                    break;
                case "ResourceCode":
                    [propertyA, propertyB] = [a.ResourceCode, b.ResourceCode];
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
                (this.matResourceDefSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ResourceDefinitionsDataSource;
