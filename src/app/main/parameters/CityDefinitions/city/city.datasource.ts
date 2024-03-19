import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CityService } from "./city.service";

export class CityDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private cityservice: CityService,
        private _matcitypaginator: MatPaginator,
        private _matcitysort: MatSort
    ) {
        super();
        this.filteredData = this.cityservice.cityApiResponse.CityList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.cityservice.onCityChanged,
            this._matcitypaginator.page,
            this._filterChange,
            this._matcitysort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this.cityservice.cityApiResponse.CityList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matcitypaginator.pageIndex *
                    this._matcitypaginator.pageSize;
                return data.splice(startIndex, this._matcitypaginator.pageSize);
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
        if (!this._matcitysort.active || this._matcitysort.direction === "") {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matcitysort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CountryCode":
                    [propertyA, propertyB] = [a.CountryCode, b.CountryCode];
                    break;
                // case "StateCode":
                //     [propertyA, propertyB] = [a.StateCode, b.StateCode];
                //     break;
                case "CityCode":
                    [propertyA, propertyB] = [a.CityCode, b.CityCode];
                    break;
                case "CityName":
                    [propertyA, propertyB] = [a.CityName, b.CityName];
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
                (this._matcitysort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default CityDataSource;
