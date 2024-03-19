import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { RestApiLogResponse } from "app/ui/restApiLog";
import { HsmTransactionReportApiResponse } from "app/ui/hsmTransactionReport";

@Injectable()
export class SearchHsmTransactionService implements Resolve<any> {
    hsmTransactionReportApiResponse: HsmTransactionReportApiResponse;
    routeParams: any;
    hsmTransaction: any;
    onSearchHsmTransactionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchHsmTransactionChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.FillHsmTransactionApiTable(this.hsmTransaction),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillHsmTransactionApiTable(hsmTransaction): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.hsmTransactionReportApiResponse == undefined) {
                this.hsmTransactionReportApiResponse =
                    new HsmTransactionReportApiResponse();
                this.hsmTransactionReportApiResponse.IsSucceeded = true;
                this.hsmTransactionReportApiResponse.HsmTransactionList = [];
            }
            this.onSearchHsmTransactionChanged.next(
                this.hsmTransactionReportApiResponse
            );
            resolve(this.hsmTransactionReportApiResponse);
        });
    }
    /**
     * SearchHsmTransaction
     *
     * @returns {Promise<any>}
     */
    SearchHsmTransaction(hsmTransaction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmTransaction/SearchHsmTransaction`,

                    {
                        CommandCode: hsmTransaction.CommandCode,
                        ResponseCode: hsmTransaction.ResponseCode,
                        HsmIpAddress: hsmTransaction.HsmIpAddress,
                        ShowFailedTransactions:
                            hsmTransaction.ShowFailedTransactions,
                        TotalElapsed: hsmTransaction.TotalElapsed,
                        SearchStartDate: hsmTransaction.SearchStartDate,
                        SearchEndDate: hsmTransaction.SearchEndDate,
                        SearchStartTime: hsmTransaction.SearchStartTime,
                        SearchEndTime: hsmTransaction.SearchEndTime,
                    }
                )
                .subscribe((response: any) => {
                    this.hsmTransactionReportApiResponse = response;
                    this.onSearchHsmTransactionChanged.next(
                        this.hsmTransactionReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchHsmTransactionDataSource() {
        if (this.hsmTransactionReportApiResponse != undefined) {
            this.hsmTransactionReportApiResponse.HsmTransactionList = [];
        }
    }
}
