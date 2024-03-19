import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HsmServiceDefinitionsService } from "./hsmServiceDefinitions.service";

export class HsmServiceDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private hsmServiceDefinitionsService: HsmServiceDefinitionsService,
        private _matHsmServiceDefinitionPaginator: MatPaginator,
        private _matHsmServiceDefinitionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.hsmServiceDefinitionsService.hsmServiceDefinitionApiResponse.ApplicationList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.hsmServiceDefinitionsService.onHsmServiceChanged,
            this._matHsmServiceDefinitionPaginator.page,
            this._filterChange,
            this._matHsmServiceDefinitionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.hsmServiceDefinitionsService.hsmServiceDefinitionApiResponse.ApplicationList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matHsmServiceDefinitionPaginator.pageIndex *
                    this._matHsmServiceDefinitionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matHsmServiceDefinitionPaginator.pageSize
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
            !this._matHsmServiceDefinitionSort.active ||
            this._matHsmServiceDefinitionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matHsmServiceDefinitionSort.active) {
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
                (this._matHsmServiceDefinitionSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default HsmServiceDefinitionsDataSource;
