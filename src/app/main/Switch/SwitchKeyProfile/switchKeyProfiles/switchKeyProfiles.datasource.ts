import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchKeyProfilesService } from "./switchKeyProfiles.service";

export class SwitchKeyProfilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchKeyProfilesService: SwitchKeyProfilesService,
        private _matSwitchKeyProfilesPaginator: MatPaginator,
        private _matSwitchKeyProfilesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.switchKeyProfilesService.switchKeyProfileApiResponse.ProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchKeyProfilesService.onSwitchProfilesChanged,
            this._matSwitchKeyProfilesPaginator.page,
            this._filterChange,
            this._matSwitchKeyProfilesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.switchKeyProfilesService.switchKeyProfileApiResponse.ProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchKeyProfilesPaginator.pageIndex *
                    this._matSwitchKeyProfilesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchKeyProfilesPaginator.pageSize
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
            !this._matSwitchKeyProfilesSort.active ||
            this._matSwitchKeyProfilesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matSwitchKeyProfilesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "ProfileName":
                    [propertyA, propertyB] = [a.ProfileName, b.ProfileName];
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
                (this._matSwitchKeyProfilesSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchKeyProfilesDataSource;
