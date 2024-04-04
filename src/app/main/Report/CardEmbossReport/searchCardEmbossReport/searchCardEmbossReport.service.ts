import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { CardEmbossReportApiResponse } from "app/ui/cardEmbossReport";

@Injectable()
export class SearchCardEmbossReportService implements Resolve<any> {
    cardEmbossReportApiResponse: CardEmbossReportApiResponse;
    routeParams: any;
    cardEmbossReport: any;
    onSearchCardEmbossReportChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchCardEmbossReportChanged = new BehaviorSubject({});
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
                this.FillCardEmbossReportTable(this.cardEmbossReport),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    FillCardEmbossReportTable(cardEmbossReport): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.cardEmbossReportApiResponse == undefined) {
                this.cardEmbossReportApiResponse =
                    new CardEmbossReportApiResponse();
                this.cardEmbossReportApiResponse.IsSucceeded = true;
                this.cardEmbossReportApiResponse.CardEmbossReportList = [];
            }
            this.onSearchCardEmbossReportChanged.next(
                this.cardEmbossReportApiResponse
            );
            resolve(this.cardEmbossReportApiResponse);
        });
    }
    /**
     * SearchCardEmbossReport
     *
     * @returns {Promise<any>}
     */
    SearchCardEmbossReport(cardEmbossReport): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardEmbossReport/SearchCardEmbossReport`,
                    {
                        CardId: cardEmbossReport.CardId,
                        TenantId: cardEmbossReport.TenantId,
                        CustomerId: cardEmbossReport.CustomerId,
                        CardTokenNumber: cardEmbossReport.CardTokenNumber,
                        CardIssuingReasonType:
                            cardEmbossReport.CardIssuingReasonType,
                        EmbossStatus: cardEmbossReport.EmbossStatus,
                        FileName: cardEmbossReport.FileName,
                        SearchStartDate: cardEmbossReport.SearchStartDate,
                        SearchEndDate: cardEmbossReport.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.cardEmbossReportApiResponse = response;
                    this.onSearchCardEmbossReportChanged.next(
                        this.cardEmbossReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
