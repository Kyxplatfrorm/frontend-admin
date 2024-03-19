import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchNotificationTemplateDefinitionService } from "./searchNotificationTemplateDefinition.service";

export class SearchNotificationTemplateDefinitionDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchNotificationTemplateDefinitionService: SearchNotificationTemplateDefinitionService,
        private _matSearchNotificationTemplateDefinitionPaginator: MatPaginator,
        private _matSearchNotificationTemplateDefinitionSort: MatSort
    ) {
        super();
        this.filteredData =
            this.searchNotificationTemplateDefinitionService.notificationTemplateApiResponse.NotificationTemplateList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchNotificationTemplateDefinitionService
                .onSearchNotificationTemplateDefinitionChanged,
            this._matSearchNotificationTemplateDefinitionPaginator.page,
            this._filterChange,
            this._matSearchNotificationTemplateDefinitionSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchNotificationTemplateDefinitionService.notificationTemplateApiResponse.NotificationTemplateList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchNotificationTemplateDefinitionPaginator
                        .pageIndex *
                    this._matSearchNotificationTemplateDefinitionPaginator
                        .pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchNotificationTemplateDefinitionPaginator
                        .pageSize
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
            !this._matSearchNotificationTemplateDefinitionSort.active ||
            this._matSearchNotificationTemplateDefinitionSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchNotificationTemplateDefinitionSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;

                case "TemplateTypeName":
                    [propertyA, propertyB] = [
                        a.TemplateTypeName,
                        b.TemplateTypeName,
                    ];
                    break;
                case "LanguageCodeName":
                    [propertyA, propertyB] = [
                        a.LanguageCodeName,
                        b.LanguageCodeName,
                    ];
                    break;

                case "Subject":
                    [propertyA, propertyB] = [a.Subject, b.Subject];
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
                (this._matSearchNotificationTemplateDefinitionSort.direction ===
                "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchNotificationTemplateDefinitionDataSource;
