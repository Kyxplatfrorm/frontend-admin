import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WebHookPayLoadTemplatesService } from "./webHookPayLoadTemplates.service";

export class WebHookPayLoadTemplatesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private webHookPayLoadTemplatesService: WebHookPayLoadTemplatesService,
        private _matWebHookPayLoadTemplatesPaginator: MatPaginator,
        private _matWebHookPayLoadTemplatesSort: MatSort
    ) {
        super();
        this.filteredData =
            this.webHookPayLoadTemplatesService.webHookPayLoadTemplateApiResponse.WebHookPayloadTypeList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.webHookPayLoadTemplatesService
                .onWebHookPayLoadTemplatesChanged,
            this._matWebHookPayLoadTemplatesPaginator.page,
            this._filterChange,
            this._matWebHookPayLoadTemplatesSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.webHookPayLoadTemplatesService.webHookPayLoadTemplateApiResponse.WebHookPayloadTypeList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matWebHookPayLoadTemplatesPaginator.pageIndex *
                    this._matWebHookPayLoadTemplatesPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matWebHookPayLoadTemplatesPaginator.pageSize
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
            !this._matWebHookPayLoadTemplatesSort.active ||
            this._matWebHookPayLoadTemplatesSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matWebHookPayLoadTemplatesSort.active) {
                case "Id":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "WebHookTypeName":
                    [propertyA, propertyB] = [
                        a.WebHookTypeName,
                        b.WebHookTypeName,
                    ];
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
                (this._matWebHookPayLoadTemplatesSort.direction === "asc"
                    ? 1
                    : -1)
            );
        });
    }

    disconnect(): void {}
}

export default WebHookPayLoadTemplatesDataSource;
