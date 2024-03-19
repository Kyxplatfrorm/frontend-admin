import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CountryService } from "./country.service";

export class CountryDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private countryservice: CountryService,
        private _matcountrypaginator: MatPaginator,
        private _matcountrysort: MatSort
    ) {
        super();
        this.filteredData = this.countryservice.countryApiResponse.CountryList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.countryservice.onCountryChanged,
            this._matcountrypaginator.page,
            this._filterChange,
            this._matcountrysort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.countryservice.countryApiResponse.CountryList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matcountrypaginator.pageIndex *
                    this._matcountrypaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matcountrypaginator.pageSize
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
            !this._matcountrysort.active ||
            this._matcountrysort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matcountrysort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CountryName":
                    [propertyA, propertyB] = [a.CountryName, b.CountryName];
                    break;
                case "CountryCode":
                    [propertyA, propertyB] = [a.CountryCode, b.CountryCode];
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
                (this._matcountrysort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default CountryDataSource;
