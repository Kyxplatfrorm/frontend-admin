import { DataSource } from "@angular/cdk/collections";
import { SearchCustomerService } from "app/main/Customer/CustomerDefinition/searchCustomer/searchCustomer.service";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

export class CustomerCardFormDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");
    constructor(private searchCustomerService: SearchCustomerService) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.searchCustomerService.onSearchCustomerChanged,
            this._filterChange,
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                if (
                    this.searchCustomerService.customerApiResponse
                        ?.CustomerList === undefined
                ) {
                    return;
                }
                if (
                    this.searchCustomerService.customerApiResponse
                        ?.CustomerList === undefined
                ) {
                    return;
                }
                let data =
                    this.searchCustomerService.customerApiResponse?.CustomerList.slice();

                return data.splice(0);
            })
        );
    }

    disconnect(): void {}
}

export default CustomerCardFormDataSource;
