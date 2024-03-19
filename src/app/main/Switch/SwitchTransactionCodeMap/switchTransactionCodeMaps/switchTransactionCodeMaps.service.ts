import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    SwitchCardNetworkApiResponse,
    SwitchTransactionEntryTypesApiResponse,
    TransactionCodesApiResponse,
} from "app/ui/switchTransactionCodeMap";

@Injectable({ providedIn: "root" })
export class SwitchTransactionCodeMapsService {
    switchCardNetworkApiResponse: SwitchCardNetworkApiResponse;
    switchTransactionEntryTypesApiResponse: SwitchTransactionEntryTypesApiResponse;
    transactionCodesApiResponse: TransactionCodesApiResponse;
    onSwitchTransactionCodeMapsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSwitchTransactionCodeMapsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetSwitchCardNetworks()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchCardNetworks
     *
     * @returns {Promise<any>}
     */
    GetSwitchCardNetworks(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchCardNetworkApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchTransactionCodeMap/GetSwitchCardNetworks`
                )
                .subscribe((response: SwitchCardNetworkApiResponse) => {
                    this.switchCardNetworkApiResponse = response;
                    this.onSwitchTransactionCodeMapsChanged.next(
                        this.switchCardNetworkApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchTransactionEntryTypes
     *
     * @returns {Promise<any>}
     */
    GetSwitchTransactionEntryTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchTransactionEntryTypesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchTransactionCodeMap/GetSwitchTransactionEntryTypes`
                )
                .subscribe(
                    (response: SwitchTransactionEntryTypesApiResponse) => {
                        this.switchTransactionEntryTypesApiResponse = response;
                        this.onSwitchTransactionCodeMapsChanged.next(
                            this.switchTransactionEntryTypesApiResponse
                        );
                        resolve(response);
                    },
                    reject
                );
        });
    }

    /**
     * GetTransactionCodes
     *
     * @returns {Promise<any>}
     */
    GetTransactionCodes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TransactionCodesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchTransactionCodeMap/GetTransactionCodes`
                )
                .subscribe((response: TransactionCodesApiResponse) => {
                    this.transactionCodesApiResponse = response;
                    this.onSwitchTransactionCodeMapsChanged.next(
                        this.transactionCodesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
