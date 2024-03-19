import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CountryDefinitionsService } from "./countryDefinitions.service";

export class CountryDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private countrydefinitionsservice: CountryDefinitionsService,
        private _matcountrydefinitionspaginator: MatPaginator,
        private _matcountrydefinitionssort: MatSort
    ) {
        super();
        this.filteredData =
            this.countrydefinitionsservice.countryDefinitionsApiResponse.CountryList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.countrydefinitionsservice.onCountryDefinitionsChanged,
            this._matcountrydefinitionspaginator.page,
            this._filterChange,
            this._matcountrydefinitionssort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.countrydefinitionsservice.countryDefinitionsApiResponse.CountryList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matcountrydefinitionspaginator.pageIndex *
                    this._matcountrydefinitionspaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matcountrydefinitionspaginator.pageSize
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
            !this._matcountrydefinitionssort.active ||
            this._matcountrydefinitionssort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matcountrydefinitionssort.active) {
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
                (this._matcountrydefinitionssort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default CountryDefinitionsDataSource;
