import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    CardBrandApiResponse,
    CardTypeApiResponse,
    SwitchApplicationApiResponse,
    SwitchSessionApiResponse,
    TransactionCodeApiResponse,
    TransactionEffectApiResponse,
} from "app/ui/card";
import { CardApiResponse } from "app/ui/card";
import { TenantApiResponse } from "app/ui/cardTransaction";

@Injectable({ providedIn: "root" })
export class CardTransactionsService {
    onCardTransactionChanged: BehaviorSubject<any>;
    cardTransaction: any;
    cardBrandApiResponse: CardBrandApiResponse;
    cardApiResponse: CardApiResponse;
    cardTypeApiResponse: CardTypeApiResponse;
    transactionCodeApiResponse: TransactionCodeApiResponse;
    transactionEffectApiResponse: TransactionEffectApiResponse;
    switchSessionApiResponse: SwitchSessionApiResponse;
    switchApplicationApiResponse: SwitchApplicationApiResponse;
    tenantApiResponse: TenantApiResponse;

    constructor(private http: HttpClient) {
        this.onCardTransactionChanged = new BehaviorSubject({});
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
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCardBrands
     *
     * @returns {Promise<any>}
     */
    GetCardBrands(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CardBrandApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetCardBrands`
                )
                .subscribe((response: CardBrandApiResponse) => {
                    this.cardBrandApiResponse = response;
                    this.onCardTransactionChanged.next(
                        this.cardBrandApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * SearchCards
     *
     * @returns {Promise<any>}
     */
    SearchCards(card): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post<CardApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/SearchCard`,
                    {
                        Id: card.Id,
                        CustomerId: card.CustomerId,
                        CompanyId: card.CompanyId,
                        CardTokenNumber: card.CardTokenNumber,
                        CustomerNumber: card.CustomerNumber,
                        CustomerName: card.CustomerName,
                        IdentityNumber: card.IdentityNumber,
                        CellPhoneNumber: card.CellPhoneNumber,
                        Email: card.Email,
                        SearchStartDate: card.SearchStartDate,
                        SearchEndDate: card.SearchEndDate,
                        CardStatusTypes: card.CardStatusTypes,
                    }
                )
                .subscribe((response: CardApiResponse) => {
                    this.cardApiResponse = response;
                    this.onCardTransactionChanged.next(this.cardApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCardTypes
     *
     * @returns {Promise<any>}
     */
    GetCardTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CardTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetCardTypes`
                )
                .subscribe((response: CardTypeApiResponse) => {
                    this.cardTypeApiResponse = response;
                    this.onCardTransactionChanged.next(
                        this.cardTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchApplicationSessions
     *
     * @returns {Promise<any>}
     */
    GetSwitchApplicationSessions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchSessionApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetSwitchApplicationSessions`
                )
                .subscribe((response: SwitchSessionApiResponse) => {
                    this.switchSessionApiResponse = response;
                    this.onCardTransactionChanged.next(
                        this.switchSessionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchApplications
     *
     * @returns {Promise<any>}
     */
    GetSwitchApplications(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchApplicationApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetSwitchApplications`
                )
                .subscribe((response: SwitchApplicationApiResponse) => {
                    this.switchApplicationApiResponse = response;
                    this.onCardTransactionChanged.next(
                        this.switchApplicationApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTransactionEffects
     *
     * @returns {Promise<any>}
     */
    GetTransactionEffects(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TransactionEffectApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetTransactionEffects`
                )
                .subscribe((response: CardTypeApiResponse) => {
                    this.transactionEffectApiResponse = response;
                    this.onCardTransactionChanged.next(
                        this.transactionEffectApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTranscationCodes
     *
     * @returns {Promise<any>}
     */
    GetTranscationCodes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TransactionCodeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetTranscationCodes`
                )
                .subscribe((response: TransactionCodeApiResponse) => {
                    this.transactionCodeApiResponse = response;
                    this.onCardTransactionChanged.next(
                        this.transactionCodeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTenants
     *
     * @returns {Promise<any>}
     */
    GetTenants(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TenantApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onCardTransactionChanged.next(this.tenantApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
