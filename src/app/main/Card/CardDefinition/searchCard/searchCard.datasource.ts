import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchCardService } from "./searchCard.service";

export class SearchCardDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private searchCardService: SearchCardService,
        private _matSearchCardPaginator: MatPaginator,
        private _matSearchCardSort: MatSort
    ) {
        super();
        this.filteredData = this.searchCardService.cardApiResponse.CardList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchCardService.onSearchCardChanged,
            this._matSearchCardPaginator.page,
            this._filterChange,
            this._matSearchCardSort.sortChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data =
                    this.searchCardService.cardApiResponse.CardList.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matSearchCardPaginator.pageIndex *
                    this._matSearchCardPaginator.pageSize;
                return data.splice(
                    startIndex,
                    this._matSearchCardPaginator.pageSize
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
            !this._matSearchCardSort.active ||
            this._matSearchCardSort.direction === ""
        ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";
            switch (this._matSearchCardSort.active) {
                case "Id ":
                    [propertyA, propertyB] = [a.Id, b.Id];
                    break;
                case "CardBrand ":
                    [propertyA, propertyB] = [a.CardBrand, b.CardBrand];
                    break;
                case "CardTokenNumber":
                    [propertyA, propertyB] = [
                        a.CardTokenNumber,
                        b.CardTokenNumber,
                    ];
                    break;
                case "CardHolderName":
                    [propertyA, propertyB] = [
                        a.CardHolderName,
                        b.CardHolderName,
                    ];
                    break;
                case "ProductName":
                    [propertyA, propertyB] = [a.ProductName, b.ProductName];
                    break;
                case "CardStatus ":
                    [propertyA, propertyB] = [a.CardStatus, b.CardStatus];
                    break;
                case "FullCellPhoneNumber":
                    [propertyA, propertyB] = [
                        a.FullCellPhoneNumber,
                        b.FullCellPhoneNumber,
                    ];
                    break;
                case "Email":
                    [propertyA, propertyB] = [a.Email, b.Email];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSearchCardSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}

export default SearchCardDataSource;
