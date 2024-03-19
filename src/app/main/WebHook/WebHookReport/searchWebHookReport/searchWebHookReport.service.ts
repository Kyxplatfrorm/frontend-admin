import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { WebHookReportApiResponse } from "app/ui/webHookReport";

@Injectable()
export class SearchWebHookReportService implements Resolve<any> {
    webHookReportApiResponse: WebHookReportApiResponse;
    routeParams: any;
    webHookReport: any;
    onSearchWebHookReportChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchWebHookReportChanged = new BehaviorSubject({});
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
            Promise.all([this.FillWebHookReportTable(this.webHookReport)]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
    FillWebHookReportTable(webHookReport): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.webHookReportApiResponse == undefined) {
                this.webHookReportApiResponse = new WebHookReportApiResponse();
                this.webHookReportApiResponse.IsSucceeded = true;
                this.webHookReportApiResponse.WebHookReportList = [];
            }
            this.onSearchWebHookReportChanged.next(
                this.webHookReportApiResponse
            );
            resolve(this.webHookReportApiResponse);
        });
    }

    /**
     * SearchWebHookReport
     *
     * @returns {Promise<any>}
     */
    SearchWebHookReport(webHookReport): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookReport/SearchWebHookReport`,
                    {
                        CompanyId: webHookReport.CompanyId,
                        TenantId: webHookReport.TenantId,
                        WebHookProfileId: webHookReport.WebHookProfileId,
                        WebHookTypeId: webHookReport.WebHookTypeId,
                        RunStatusId: webHookReport.RunStatusId,
                        HttpStatusCode: webHookReport.HttpStatusCode,
                        RetryCount: webHookReport.RetryCount,
                        ApplicationId: webHookReport.ApplicationId,
                        TotalElapsed: webHookReport.TotalElapsed,
                        ReferenceNumber: webHookReport.ReferenceNumber,
                        HttpPostUrl: webHookReport.HttpPostUrl,
                        SearchStartDate: webHookReport.SearchStartDate,
                        SearchEndDate: webHookReport.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.webHookReportApiResponse = response;
                    this.onSearchWebHookReportChanged.next(
                        this.webHookReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
