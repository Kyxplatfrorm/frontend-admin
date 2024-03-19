import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MenusService } from "./menus.service";

export class MenusDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private menusService: MenusService,
        private _matMenusPaginator: MatPaginator,
        private _matMenusSort: MatSort
    ) {
        super();
        this.filteredData =
            this.menusService.menuDefinitionApiResponse.MenuList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.menusService.onMenusChanged,
            this._matMenusPaginator.page,
            this._filterChange,
            this._matMenusSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.menusService.menuDefinitionApiResponse.MenuList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matMenusPaginator.pageIndex *
                    this._matMenusPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matMenusPaginator.pageSize
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
        if (!this._matMenusSort.active || this._matMenusSort.direction === "") {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matMenusSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "MenuOrder":
                    [propertyA, propertyB] = [a.MenuOrder, b.MenuOrder];
                    break;
                case "MenuName":
                    [propertyA, propertyB] = [a.MenuName, b.MenuName];
                    break;
                case "ParentMenuName":
                    [propertyA, propertyB] = [
                        a.ParentMenuName,
                        b.ParentMenuName,
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
                (this._matMenusSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default MenusDataSource;
