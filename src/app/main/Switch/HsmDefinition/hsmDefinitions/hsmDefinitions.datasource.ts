import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HsmDefinitionsService } from "./hsmDefinitions.service";

export class HsmDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private hsmDefinitionsService: HsmDefinitionsService,
        private _matHsmDefinitionsPaginator: MatPaginator,
        private _matHsmDefinitionsSort: MatSort
    ) {
        super();
        this.filteredData =
            this.hsmDefinitionsService.hsmDefinitionApiResponse.HsmDeviceList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.hsmDefinitionsService.onHsmDefinitionsChanged,
            this._matHsmDefinitionsPaginator.page,
            this._filterChange,
            this._matHsmDefinitionsSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.hsmDefinitionsService.hsmDefinitionApiResponse.HsmDeviceList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matHsmDefinitionsPaginator.pageIndex *
                    this._matHsmDefinitionsPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matHsmDefinitionsPaginator.pageSize
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
            !this._matHsmDefinitionsSort.active ||
            this._matHsmDefinitionsSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matHsmDefinitionsSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "HsmType":
                    [propertyA, propertyB] = [a.HsmType, b.HsmType];
                    break;
                case "HsmIpAddress":
                    [propertyA, propertyB] = [a.HsmIpAddress, b.HsmIpAddress];
                    break;
                case "PinLmkLength":
                    [propertyA, propertyB] = [a.PinLmkLength, b.PinLmkLength];
                    break;
                case "LmkType":
                    [propertyA, propertyB] = [a.LmkType, b.LmkType];
                    break;
                case "HsmPort":
                    [propertyA, propertyB] = [a.HsmPort, b.HsmPort];
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
                (this._matHsmDefinitionsSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default HsmDefinitionsDataSource;
