import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { NotificationReportApiResponse } from "app/ui/notificationReport";

@Injectable()
export class SearchNotificationReportService implements Resolve<any> {
    notificationReportApiResponse: NotificationReportApiResponse;
    routeParams: any;
    notificationReport: any;
    onSearchNotificationReportChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchNotificationReportChanged = new BehaviorSubject({});
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
                this.FillNotificationReportTable(this.notificationReport),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillNotificationReportTable(notificationReport): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.notificationReportApiResponse == undefined) {
                this.notificationReportApiResponse =
                    new NotificationReportApiResponse();
                this.notificationReportApiResponse.IsSucceeded = true;
                this.notificationReportApiResponse.NotificationReportList = [];
            }
            this.onSearchNotificationReportChanged.next(
                this.notificationReportApiResponse
            );
            resolve(this.notificationReportApiResponse);
        });
    }

    /**
     * SearchNotificationReport
     *
     * @returns {Promise<any>}
     */
    SearchNotificationReport(notificationReport): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationReport/SearchNotificationReport`,
                    {
                        CustomerName: notificationReport.CustomerName,
                        CompanyId: notificationReport.CompanyId,
                        TenantId: notificationReport.TenantId,
                        NotificationTypeId:
                            notificationReport.NotificationTypeId,
                        TemplateId: notificationReport.TemplateId,
                        LanguageCodeId: notificationReport.LanguageCodeId,
                        ReceiverAddress: notificationReport.ReceiverAddress,
                        Subject: notificationReport.Subject,
                        SentStatusId: notificationReport.SentStatusId,
                        SearchStartDate: notificationReport.SearchStartDate,
                        SearchEndDate: notificationReport.SearchEndDate,
                        SearchStartTime: notificationReport.SearchStartTime,
                        SearchEndTime: notificationReport.SearchEndTime,
                    }
                )
                .subscribe((response: any) => {
                    this.notificationReportApiResponse = response;
                    this.onSearchNotificationReportChanged.next(
                        this.notificationReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
