import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { CardMemoReportApiResponse } from "app/ui/cardMemoReport";

@Injectable()
export class SearchCardMemoReportService implements Resolve<any> {
    cardMemoReportApiResponse: CardMemoReportApiResponse;
    routeParams: any;
    cardMemoReport: any;
    onSearchCardMemoReportChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchCardMemoReportChanged = new BehaviorSubject({});
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
                this.FillCardMemoReportTable(this.cardMemoReport),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    FillCardMemoReportTable(cardMemoReport): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.cardMemoReportApiResponse == undefined) {
                this.cardMemoReportApiResponse =
                    new CardMemoReportApiResponse();
                this.cardMemoReportApiResponse.IsSucceeded = true;
                this.cardMemoReportApiResponse.CardMemoReportList = [];
            }
            this.onSearchCardMemoReportChanged.next(
                this.cardMemoReportApiResponse
            );
            resolve(this.cardMemoReportApiResponse);
        });
    }
    /**
     * SearchCardMemoReport
     *
     * @returns {Promise<any>}
     */
    SearchCardMemoReport(cardMemoReport): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/SearchCardMemoReport`,
                    {
                        ApplicationTypeId: cardMemoReport.ApplicationTypeId,
                        TenantId: cardMemoReport.TenantId,
                        CustomerId: cardMemoReport.CustomerId,
                        MemoChannelTypeId: cardMemoReport.MemoChannelTypeId,
                        MemoKeyTypeId: cardMemoReport.MemoKeyTypeId,
                        MemoTypeId: cardMemoReport.MemoTypeId,
                        MemoCodeId: cardMemoReport.MemoCodeId,
                        Description: cardMemoReport.Description,
                        SearchStartDate: cardMemoReport.SearchStartDate,
                        SearchEndDate: cardMemoReport.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.cardMemoReportApiResponse = response;
                    this.onSearchCardMemoReportChanged.next(
                        this.cardMemoReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
