import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApplicationDefinitionsService } from "./applicationDefinitions.service";

export class ApplicationDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private applicationDefinitionsService: ApplicationDefinitionsService,
        private _matAppDefinitionsPaginator: MatPaginator,
        private _matAppDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.applicationDefinitionsService.applicationDefinitionsApiResponse.ApplicationList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.applicationDefinitionsService.onAppDefinitionsChanged,
            this._matAppDefinitionsPaginator.page,
            this._filterChange,
            this._matAppDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.applicationDefinitionsService.applicationDefinitionsApiResponse.ApplicationList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matAppDefinitionsPaginator.pageIndex *
                    this._matAppDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matAppDefinitionsPaginator.pageSize
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
            !this._matAppDefinitionsSort.active ||
            this._matAppDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matAppDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ServiceName":
                    [propertyA, propertyB] = [a.ServiceName, b.ServiceName];
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
                (this._matAppDefinitionsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default ApplicationDefinitionsDataSource;