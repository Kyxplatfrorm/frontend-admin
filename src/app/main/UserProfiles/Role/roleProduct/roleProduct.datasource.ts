import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoleProductService } from "./roleProduct.service";

export class RoleProductDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private roleProductService: RoleProductService,
        private matProductPaginator: MatPaginator,
        private matProductSort: MatSort
    ) {
        super();
        this.filteredData = this.roleProductService.productModuleList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.roleProductService.onProductChanged,
            this.matProductPaginator.page,
            this.matProductSort.sortChange,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.roleProductService.productModuleList === undefined) {
                    return;
                }
                if (this.roleProductService.productModuleList === undefined) {
                    return;
                }
                let data = this.roleProductService.productModuleList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this.matProductPaginator.pageIndex *
                    this.matProductPaginator.pageSize;

                return data.splice(
                    startIndex,
                    this.matProductPaginator.pageSize
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
            !this.matProductSort.active ||
            this.matProductSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this.matProductSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ProductName":
                    [propertyA, propertyB] = [a.ProductName, b.ProductName];
                    break;
                case "ApplicationType":
                    [propertyA, propertyB] = [
                        a.ApplicationType,
                        b.ApplicationType,
                    ];
                    break;
                case "UserType":
                    [propertyA, propertyB] = [a.UserType, b.UserType];
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
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this.matProductSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default RoleProductDataSource;
