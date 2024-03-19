import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrencyDefinitionsService } from "./currencyDefinitions.service";

export class CurrencyDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private currencydefinitionsservice: CurrencyDefinitionsService,
        private _matcurrencydefpaginator: MatPaginator,
        private _matcurrencydefsort: MatSort
    ) {
        super();
        this.filteredData =
            this.currencydefinitionsservice.currencyDefApiResponse.CurrencyList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.currencydefinitionsservice.onCurrencyDefChanged,
            this._matcurrencydefpaginator.page,
            this._filterChange,
            this._matcurrencydefsort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.currencydefinitionsservice.currencyDefApiResponse.CurrencyList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matcurrencydefpaginator.pageIndex *
                    this._matcurrencydefpaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matcurrencydefpaginator.pageSize
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
            !this._matcurrencydefsort.active ||
            this._matcurrencydefsort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matcurrencydefsort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CurrencyCode":
                    [propertyA, propertyB] = [a.CurrencyCode, b.CurrencyCode];
                    break;
                case "CurrencyCodeNumeric":
                    [propertyA, propertyB] = [
                        a.CurrencyCodeNumeric,
                        b.CurrencyCodeNumeric,
                    ];
                    break;
                case "CountryName":
                    [propertyA, propertyB] = [a.CountryName, b.CountryName];
                    break;
                case "CurrencyName":
                    [propertyA, propertyB] = [a.CurrencyName, b.CurrencyName];
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
                (this._matcurrencydefsort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default CurrencyDefinitionsDataSource;
