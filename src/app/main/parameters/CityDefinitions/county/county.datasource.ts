import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CountyService } from "./county.service";

export class CountyDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private countyservice: CountyService,
        private matCountyaginator: MatPaginator,
        private matCountysort: MatSort
    ) {
        super();
        this.filteredData = this.countyservice.countyList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.countyservice.onCountyChanged,
            this.matCountyaginator.page,
            this.matCountysort.sortChange,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.countyservice.countyList === undefined) {
                    return;
                }
                if (this.countyservice.countyList === undefined) {
                    return;
                }
                let data = this.countyservice.countyList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this.matCountyaginator.pageIndex *
                    this.matCountyaginator.pageSize;

                return data.splice(startIndex, this.matCountyaginator.pageSize);
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
        if (!this.matCountysort.active || this.matCountysort.direction === "") {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this.matCountysort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CountryCode":
                    [propertyA, propertyB] = [a.CountryCode, b.CountryCode];
                    break;
                case "StateCode":
                    [propertyA, propertyB] = [a.StateCode, b.StateCode];
                    break;
                case "CityCode":
                    [propertyA, propertyB] = [a.CityCode, b.CityCode];
                    break;
                case "CountyName":
                    [propertyA, propertyB] = [a.CityName, b.CityName];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this.matCountysort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default CountyDataSource;
