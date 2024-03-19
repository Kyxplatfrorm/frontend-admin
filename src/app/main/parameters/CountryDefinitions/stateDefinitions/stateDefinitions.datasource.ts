import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CountryDefinitionsService } from "../countryDefinitions/countryDefinitions.service";

export class StateDefinitionsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private countryDefinitionsService: CountryDefinitionsService,
        private _matCountryDefinitionPaginator: MatPaginator,
        private _matCountryDefinitionSort: MatSort
    ) {
        super();
        this.filteredData = this.countryDefinitionsService.stateList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.countryDefinitionsService.onCountryDefinitionsChanged,
            this._filterChange,
            this._matCountryDefinitionPaginator.page,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (this.countryDefinitionsService.stateList === undefined) {
                    return;
                }
                if (this.countryDefinitionsService.stateList === undefined) {
                    return;
                }
                let data = this.countryDefinitionsService.stateList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];

                const startIndex =
                    this._matCountryDefinitionPaginator.pageIndex *
                    this._matCountryDefinitionPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matCountryDefinitionPaginator.pageSize
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

    disconnect(): void {}
}

export default StateDefinitionsDataSource;
