import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchTenantWebHookProfileService } from "./searchTenantWebHookProfile.service";

export class SearchTenantWebHookProfileDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchTenantWebHookProfileService: SearchTenantWebHookProfileService,
        private _matSearchTenantWebHookProfilePaginator: MatPaginator,
        private _matSearchTenantWebHookProfileSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchTenantWebHookProfileService.tenantWebHookProfileApiResponse.TenantWebHookProfileList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchTenantWebHookProfileService
                .onSearchTenantWebHookProfileChanged,
            this._matSearchTenantWebHookProfilePaginator.page,
            this._filterChange,
            this._matSearchTenantWebHookProfileSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchTenantWebHookProfileService.tenantWebHookProfileApiResponse.TenantWebHookProfileList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchTenantWebHookProfilePaginator.pageIndex *
                    this._matSearchTenantWebHookProfilePaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchTenantWebHookProfilePaginator.pageSize
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
            !this._matSearchTenantWebHookProfileSort.active ||
            this._matSearchTenantWebHookProfileSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchTenantWebHookProfileSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;

                case "TenantName":
                    [propertyA, propertyB] = [a.TenantName, b.TenantName];
                    break;
                case "IsActive":
                    [propertyA, propertyB] = [a.IsActive, b.IsActive];
                    break;

                case "WebHookTypeName":
                    [propertyA, propertyB] = [
                        a.WebHookTypeName,
                        b.WebHookTypeName,
                    ];
                    break;
                case "WebHookUrl":
                    [propertyA, propertyB] = [a.WebHookUrl, b.WebHookUrl];
                    break;
                case "WebHookApiPath":
                    [propertyA, propertyB] = [
                        a.WebHookApiPath,
                        b.WebHookApiPath,
                    ];
                    break;
                case "HttpHeaderApiKeyName":
                    [propertyA, propertyB] = [
                        a.HttpHeaderApiKeyName,
                        b.HttpHeaderApiKeyName,
                    ];
                    break;
                case "EncryptedApiKey":
                    [propertyA, propertyB] = [
                        a.EncryptedApiKey,
                        b.EncryptedApiKey,
                    ];
                    break;

                case "InsertDateTime":
                    [propertyA, propertyB] = [
                        a.InsertDateTime,
                        b.InsertDateTime,
                    ];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchTenantWebHookProfileSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchTenantWebHookProfileDataSource;
