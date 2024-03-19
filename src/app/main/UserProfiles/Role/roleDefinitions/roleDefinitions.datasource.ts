import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoleDefinitionsService } from "./roleDefinitions.service";

export class RoleDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private roleDefinitionsService: RoleDefinitionsService,
        private _matRoleDefinitionsPaginator: MatPaginator,
        private _matRoleDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.roleDefinitionsService.roleApiResponse.RoleList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.roleDefinitionsService.onRoleDefinitionsChanged,
            this._matRoleDefinitionsPaginator.page,
            this._filterChange,
            this._matRoleDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.roleDefinitionsService.roleApiResponse.RoleList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matRoleDefinitionsPaginator.pageIndex *
                    this._matRoleDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matRoleDefinitionsPaginator.pageSize
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
            !this._matRoleDefinitionsSort.active ||
            this._matRoleDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matRoleDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "RoleName":
                    [propertyA, propertyB] = [a.RoleName, b.RoleName];
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
                (this._matRoleDefinitionsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default RoleDefinitionsDataSource;
