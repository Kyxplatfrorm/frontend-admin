import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GenericConfigGroupsService } from "./genericConfigGroups.service";

export class GenericConfigGroupsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private genericConfigGroupsService: GenericConfigGroupsService,
        private _matGenericConfigGroupsPaginator: MatPaginator,
        private _matGenericConfigGroupsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.genericConfigGroupsService.genericConfigGroupApiResponse.GenericConfigGroupList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.genericConfigGroupsService.onGenericConfigGroupChanged,
            this._matGenericConfigGroupsPaginator.page,
            this._filterChange,
            this._matGenericConfigGroupsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.genericConfigGroupsService.genericConfigGroupApiResponse.GenericConfigGroupList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matGenericConfigGroupsPaginator.pageIndex *
                    this._matGenericConfigGroupsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matGenericConfigGroupsPaginator.pageSize
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
            !this._matGenericConfigGroupsSort.active ||
            this._matGenericConfigGroupsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matGenericConfigGroupsSort.active) {
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
                (this._matGenericConfigGroupsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default GenericConfigGroupsDataSource;
