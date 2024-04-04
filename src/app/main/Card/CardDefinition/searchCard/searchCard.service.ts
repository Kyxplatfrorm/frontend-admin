import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { CardApiResponse } from "app/ui/card";

@Injectable()
export class SearchCardService implements Resolve<any> {
    cardApiResponse: CardApiResponse;
    routeParams: any;
    searchCard: any;
    card: any;
    onSearchCardChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchCardChanged = new BehaviorSubject({});
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
            Promise.all([this.FillRestApiTable(this.card)]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillRestApiTable(card): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.cardApiResponse == undefined) {
                this.cardApiResponse = new CardApiResponse();
                this.cardApiResponse.IsSucceeded = true;
                this.cardApiResponse.CardList = [];
            }
            this.onSearchCardChanged.next(this.cardApiResponse);
            resolve(this.cardApiResponse);
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
                    this.onSearchCardChanged.next(this.cardApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateCardStatus
     *
     * @param searchCard
     * @returns {Promise<any>}
     */
    UpdateCardStatus(searchCard): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Card/UpdateCardStatus`,
                    { Id: searchCard.Id, CardStatusId: searchCard.CardStatusId }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * ActivateCard
     *
     * @param searchCard
     * @returns {Promise<any>}
     */
    ActivateCard(searchCard): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Card/ActivateCard`,
                    { Id: searchCard.Id }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * ResetCvv2ReTryCount
     *
     * @param searchCard
     * @returns {Promise<any>}
     */
    ResetCvv2ReTryCount(searchCard): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Card/ResetCvv2ReTryCount`,
                    { Id: searchCard.Id }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchCardDataSource() {
        if (this.cardApiResponse != undefined) {
            this.cardApiResponse.CardList = [];
        }
    }
}
