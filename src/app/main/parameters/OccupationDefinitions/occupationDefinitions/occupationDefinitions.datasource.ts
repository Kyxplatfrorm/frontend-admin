import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OccupationDefinitionsService } from "./occupationDefinitions.service";

export class OccupationDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private occupationdefinitionsservice: OccupationDefinitionsService,
        private _matoccupationdefinitionspaginator: MatPaginator,
        private _matoccupationdefinitionssort: MatSort
    ) {
        super();
        this.filteredData =
            this.occupationdefinitionsservice.occupationDefinitionsApiResponse.OccupationList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.occupationdefinitionsservice.onOccupationDefinitionsChanged,
            this._matoccupationdefinitionspaginator.page,
            this._filterChange,
            this._matoccupationdefinitionssort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.occupationdefinitionsservice.occupationDefinitionsApiResponse.OccupationList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matoccupationdefinitionspaginator.pageIndex *
                    this._matoccupationdefinitionspaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matoccupationdefinitionspaginator.pageSize
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
            !this._matoccupationdefinitionssort.active ||
            this._matoccupationdefinitionssort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matoccupationdefinitionssort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "OccupationCode":
                    [propertyA, propertyB] = [
                        a.OccupationCode,
                        b.OccupationCode,
                    ];
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
                (this._matoccupationdefinitionssort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default OccupationDefinitionsDataSource;
