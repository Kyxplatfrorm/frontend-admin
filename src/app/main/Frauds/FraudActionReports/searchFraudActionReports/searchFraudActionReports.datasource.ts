import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchFraudActionReportsService } from "./searchFraudActionReports.service";

export class SearchFraudActionReportsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchFraudActionReportsService: SearchFraudActionReportsService,
        private _matSearchFraudActionReportsPaginator: MatPaginator,
        private _matSearchFraudActionReportsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchFraudActionReportsService.fraudActionReportApiResponse.FraudActionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchFraudActionReportsService.onFraudActionReportsChanged,
            this._matSearchFraudActionReportsPaginator.page,
            this._filterChange,
            this._matSearchFraudActionReportsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchFraudActionReportsService.fraudActionReportApiResponse.FraudActionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchFraudActionReportsPaginator.pageIndex *
                    this._matSearchFraudActionReportsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchFraudActionReportsPaginator.pageSize
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
            !this._matSearchFraudActionReportsSort.active ||
            this._matSearchFraudActionReportsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchFraudActionReportsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ApplicationTypeName":
                    [propertyA, propertyB] = [
                        a.ApplicationTypeName,
                        b.ApplicationTypeName,
                    ];
                    break;

                case "FraudRuleName":
                    [propertyA, propertyB] = [a.FraudRuleName, b.FraudRuleName];
                    break;
                case "FraudApiName":
                    [propertyA, propertyB] = [a.FraudApiName, b.FraudApiName];
                    break;

                case "UserName":
                    [propertyA, propertyB] = [a.UserName, b.UserName];
                    break;
                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "FraudRuleActionTypeName":
                    [propertyA, propertyB] = [
                        a.FraudRuleActionTypeName,
                        b.FraudRuleActionTypeName,
                    ];
                    break;
                case "FraudRuleActionStatusName":
                    [propertyA, propertyB] = [
                        a.FraudRuleActionTypeName,
                        b.FraudRuleActionTypeName,
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
                (this._matSearchFraudActionReportsSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchFraudActionReportsDataSource;
