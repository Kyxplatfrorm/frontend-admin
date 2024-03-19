import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchMessageProfilesService } from "./switchMessageProfiles.service";

export class SwitchMessageProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchMessageProfilesService: SwitchMessageProfilesService,
        private _matSwitchMessageProfilesPaginator: MatPaginator,
        private _matSwitchMessageProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchMessageProfilesService.switchMessageProfileApiResponse.SwitchMessageProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchMessageProfilesService.onSwitchMessageProfilesChanged,
            this._matSwitchMessageProfilesPaginator.page,
            this._filterChange,
            this._matSwitchMessageProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchMessageProfilesService.switchMessageProfileApiResponse.SwitchMessageProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchMessageProfilesPaginator.pageIndex *
                    this._matSwitchMessageProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchMessageProfilesPaginator.pageSize
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
            !this._matSwitchMessageProfilesSort.active ||
            this._matSwitchMessageProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSwitchMessageProfilesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "NetworkTypeName":
                    [propertyA, propertyB] = [
                        a.NetworkTypeName,
                        b.NetworkTypeName,
                    ];
                    break;
                case "NetworkMessageTypeName":
                    [propertyA, propertyB] = [
                        a.NetworkMessageTypeName,
                        b.NetworkMessageTypeName,
                    ];
                    break;

                case "RequestMti":
                    [propertyA, propertyB] = [a.RequestMti, b.RequestMti];
                    break;
                case "ResponseMti":
                    [propertyA, propertyB] = [a.ResponseMti, b.ResponseMti];
                    break;
                case "RequestMessageProfile":
                    [propertyA, propertyB] = [
                        a.RequestMessageProfile,
                        b.RequestMessageProfile,
                    ];
                    break;
                case "ResponseMessageProfile":
                    [propertyA, propertyB] = [
                        a.ResponseMessageProfile,
                        b.ResponseMessageProfile,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSwitchMessageProfilesSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchMessageProfilesDataSource;
