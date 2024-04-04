import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchCustomerService } from "./searchCustomer.service";

export class SearchCustomerDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchCustomerService: SearchCustomerService,
        private _matSearchCustomerPaginator: MatPaginator,
        private _matSearchCustomerSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchCustomerService.customerApiResponse.CustomerList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchCustomerService.onSearchCustomerChanged,
            this._matSearchCustomerPaginator.page,
            this._filterChange,
            this._matSearchCustomerSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchCustomerService.customerApiResponse.CustomerList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchCustomerPaginator.pageIndex *
                    this._matSearchCustomerPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchCustomerPaginator.pageSize
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
            !this._matSearchCustomerSort.active ||
            this._matSearchCustomerSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchCustomerSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CustomerFullName ":
                    [propertyA, propertyB] = [
                        a.CustomerFullName,
                        b.CustomerFullName,
                    ];
                    break;
                case "CustomerType":
                    [propertyA, propertyB] = [a.CustomerType, b.CustomerType];
                    break;

                case "CustomerStatus":
                    [propertyA, propertyB] = [
                        a.CustomerStatus,
                        b.CustomerStatus,
                    ];
                    break;
                case "CustomerSegment":
                    [propertyA, propertyB] = [
                        a.CustomerSegment,
                        b.CustomerSegment,
                    ];
                    break;
                case "CustomerNumber ":
                    [propertyA, propertyB] = [
                        a.CustomerNumber,
                        b.CustomerNumber,
                    ];
                    break;
                case "FullCellPhoneNumber ":
                    [propertyA, propertyB] = [
                        a.FullCellPhoneNumber,
                        b.FullCellPhoneNumber,
                    ];
                    break;
                case "InsertDateTime ":
                    [propertyA, propertyB] = [
                        a.InsertDateTime,
                        b.InsertDateTime,
                    ];
                    break;
                case "UpdateDateTime ":
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
                (this._matSearchCustomerSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchCustomerDataSource;
