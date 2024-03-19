import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SubMenuService } from "./subMenu.service";

export class SubMenuDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private subMenuService: SubMenuService,
        private matSubMenuPaginator: MatPaginator,
        private matSubMenuSort: MatSort
    ) {
        super();
        this.filteredData = this.subMenuService.subMenuList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.subMenuService.onSubMenuChanged,
            this.matSubMenuPaginator.page,
            this.matSubMenuSort.sortChange,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.subMenuService.subMenuList === undefined) {
                    return;
                }
                if (this.subMenuService.subMenuList === undefined) {
                    return;
                }
                let data = this.subMenuService.subMenuList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this.matSubMenuPaginator.pageIndex *
                    this.matSubMenuPaginator.pageSize;

                return data.splice(
                    startIndex,
                    this.matSubMenuPaginator.pageSize
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
            !this.matSubMenuSort.active ||
            this.matSubMenuSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this.matSubMenuSort.active) {
                case "TranslateKey":
                    [propertyA, propertyB] = [a.TranslateKey, b.TranslateKey];
                    break;
                case "MenuIcon":
                    [propertyA, propertyB] = [a.MenuIcon, b.MenuIcon];
                    break;
                case "MenuUrl":
                    [propertyA, propertyB] = [a.MenuUrl, b.MenuUrl];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this.matSubMenuSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SubMenuDataSource;
