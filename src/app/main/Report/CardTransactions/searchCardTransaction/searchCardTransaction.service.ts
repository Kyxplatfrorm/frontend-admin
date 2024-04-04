import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { CardTransactionApiResponse } from "app/ui/cardTransaction";

@Injectable()
export class SearchCardTransactionService implements Resolve<any> {
    cardTransactionApiResponse: CardTransactionApiResponse;
    routeParams: any;
    cardTransaction: any;
    onSearchCardTransactionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchCardTransactionChanged = new BehaviorSubject({});
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
                this.FillCardTransactionTable(this.cardTransaction),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillCardTransactionTable(cardTransaction): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.cardTransactionApiResponse == undefined) {
                this.cardTransactionApiResponse =
                    new CardTransactionApiResponse();
                this.cardTransactionApiResponse.IsSucceeded = true;
                this.cardTransactionApiResponse.CardTransactionList = [];
            }
            this.onSearchCardTransactionChanged.next(
                this.cardTransactionApiResponse
            );
            resolve(this.cardTransactionApiResponse);
        });
    }
    /**
     * SearchCardTransaction
     *
     * @returns {Promise<any>}
     */
    SearchCardTransaction(cardTransaction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/SearchCardTransaction`,
                    {
                        TenantId: cardTransaction.TenantId,
                        CardId: cardTransaction.CardId,
                        CustomerId: cardTransaction.CustomerId,
                        CardTokenNumber: cardTransaction.CardTokenNumber,
                        CompanyId: cardTransaction.CompanyId,
                        CardFinancialId: cardTransaction.CardFinancialId,
                        AccountId: cardTransaction.AccountId,
                        ReferenceNumber: cardTransaction.ReferenceNumber,
                        CardTypeId: cardTransaction.CardTypeId,
                        CardBrandId: cardTransaction.CardBrandId,
                        TransactionCodeId: cardTransaction.TransactionCodeId,
                        TransactionEffectId:
                            cardTransaction.TransactionEffectId,
                        ResponseCode: cardTransaction.ResponseCode,
                        ErrorCode: cardTransaction.ErrorCode,
                        ApplicationId: cardTransaction.ApplicationId,
                        SessionId: cardTransaction.SessionId,
                        Mti: cardTransaction.Mti,
                        ApplicationNetwork: cardTransaction.ApplicationNetwork,
                        ProvisionTransactionType:
                            cardTransaction.ProvisionTransactionType,
                        Atc: cardTransaction.Atc,
                        ServerName: cardTransaction.ServerName,
                        EmvTransactionId: cardTransaction.EmvTransactionId,
                        SearchStartDate: cardTransaction.SearchStartDate,
                        SearchEndDate: cardTransaction.SearchEndDate,
                        TotalElapsed: cardTransaction.TotalElapsed,
                    }
                )
                .subscribe((response: any) => {
                    this.cardTransactionApiResponse = response;
                    this.onSearchCardTransactionChanged.next(
                        this.cardTransactionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
