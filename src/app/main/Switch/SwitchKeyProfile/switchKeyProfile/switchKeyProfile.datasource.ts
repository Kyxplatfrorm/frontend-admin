import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SwitchKeyProfileService } from "./switchKeyProfile.service";

export class SwitchKeyProfileDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private switchKeyProfileService: SwitchKeyProfileService,
        private _matSwitchKeyProfilePaginator: MatPaginator,
        private _matSwitchKeyProfileSort: MatSort
    ) {
        super();
        this.filteredData = this.switchKeyProfileService.detailList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.switchKeyProfileService.onSwitchKeyProfileChanged,
            this._filterChange,
            this._matSwitchKeyProfileSort.sortChange,
            this._matSwitchKeyProfilePaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.switchKeyProfileService.detailList === undefined) {
                    return;
                }
                if (this.switchKeyProfileService.detailList === undefined) {
                    return;
                }
                let data = this.switchKeyProfileService.detailList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSwitchKeyProfilePaginator.pageIndex *
                    this._matSwitchKeyProfilePaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSwitchKeyProfilePaginator.pageSize
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
            !this._matSwitchKeyProfileSort.active ||
            this._matSwitchKeyProfileSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSwitchKeyProfileSort.active) {
                case "ProfileId":
                    [propertyA, propertyB] = [a.ProfileId, b.ProfileId];
                    break;
                case "KeyIndex":
                    [propertyA, propertyB] = [a.KeyIndex, b.KeyIndex];
                    break;
                case "KeyVariant":
                    [propertyA, propertyB] = [a.KeyVariant, b.KeyVariant];
                    break;

                case "KeyType":
                    [propertyA, propertyB] = [a.KeyType, b.KeyType];
                    break;
                case "KeyValue":
                    [propertyA, propertyB] = [a.KeyValue, b.KeyValue];
                    break;
                case "KeyCheckValue":
                    [propertyA, propertyB] = [a.KeyCheckValue, b.KeyCheckValue];
                    break;

                case "TemporaryKeyValue":
                    [propertyA, propertyB] = [
                        a.TemporaryKeyValue,
                        b.TemporaryKeyValue,
                    ];
                    break;
                case "TemporaryKeyCheckValue":
                    [propertyA, propertyB] = [
                        a.TemporaryKeyCheckValue,
                        b.TemporaryKeyCheckValue,
                    ];
                    break;
                case "KeyLmkType":
                    [propertyA, propertyB] = [a.KeyLmkType, b.KeyLmkType];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSwitchKeyProfileSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SwitchKeyProfileDataSource;
