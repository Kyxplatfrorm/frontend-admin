import { DataSource } from "@angular/cdk/collections";
import { SearchCardService } from "app/main/Card/CardDefinition/searchCard/searchCard.service";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

export class CardTransactionCardTokenFormDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");
    constructor(private searchCardService: SearchCardService) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchCardService.onSearchCardChanged,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.searchCardService.cardApiResponse?.CardList ===
                    undefined
                ) {
                    return;
                }
                if (
                    this.searchCardService.cardApiResponse?.CardList ===
                    undefined
                ) {
                    return;
                }
                let data =
                    this.searchCardService.cardApiResponse?.CardList.slice();

                return data.splice(0);
            })
        );
    }

    disconnect(): void {}
}

export default CardTransactionCardTokenFormDataSource;
