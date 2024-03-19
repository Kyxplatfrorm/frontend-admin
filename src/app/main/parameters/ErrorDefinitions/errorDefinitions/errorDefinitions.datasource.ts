import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ErrorDefinitionsService } from "./errorDefinitions.service";

export class ErrorDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private errordefinitionsservice: ErrorDefinitionsService,
        private _matErrorDefinitionsPaginator: MatPaginator,
        private _matErrorDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.errordefinitionsservice.errorDefinitionsApiResponse.ErrorDefinitionList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.errordefinitionsservice.onErrorDefinitionsChanged,
            this._matErrorDefinitionsPaginator.page,
            this._filterChange,
            this._matErrorDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.errordefinitionsservice.errorDefinitionsApiResponse.ErrorDefinitionList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matErrorDefinitionsPaginator.pageIndex *
                    this._matErrorDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matErrorDefinitionsPaginator.pageSize
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
            !this._matErrorDefinitionsSort.active ||
            this._matErrorDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matErrorDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ErrorCode":
                    [propertyA, propertyB] = [a.ErrorCode, b.ErrorCode];
                    break;
                case "NumericErrorCode":
                    [propertyA, propertyB] = [
                        a.NumericErrorCode,
                        b.NumericErrorCode,
                    ];
                    break;
                case "ErrorDescription":
                    [propertyA, propertyB] = [
                        a.ErrorDescription,
                        b.ErrorDescription,
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
                (this._matErrorDefinitionsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ErrorDefinitionsDataSource;
