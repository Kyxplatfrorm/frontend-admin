import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CardTransactionService } from "../cardTransaction/cardTransaction.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseUtils } from "@fuse/utils";

export class SwitchMessageDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");
    constructor(
        private cardTransactionService: CardTransactionService,
        private _matSwitchMessagePaginator: MatPaginator,
        private _matSwitchMessageSort: MatSort
    ) {
        super();
        this.filteredData = this.cardTransactionService.switchMessagesList;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.cardTransactionService.onCardTransactionChanged,
            this._filterChange,
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                if (!this.cardTransactionService.switchMessagesList) {
                    return [];
                }
                let data =
                    this.cardTransactionService.switchMessagesList.slice();
                data = this.filterData(data);

                return data;
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

export default SwitchMessageDataSource;
