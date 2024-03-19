import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable()
export class NotificationReportService implements Resolve<any> {
    routeParams: any;
    onNotificationReportChanged: BehaviorSubject<any>;
    notificationReport: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onNotificationReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetNotificationReport()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetNotificationReport
     *
     * @returns {Promise<any>}
     */
    GetNotificationReport(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onNotificationReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/NotificationReport/GetNotificationReport?notificationReportId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.notificationReport = response.NotificationReport;
                        this.onNotificationReportChanged.next(
                            this.notificationReport
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateNotificationReport
     *
     * @param notificationReport
     * @returns {Promise<any>}
     */
    CreateNotificationReport(notificationReport): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationReport/CreateNotificationReport`,
                    {
                        CustomerName: notificationReport.CustomerName,
                        CompanyId: notificationReport.CompanyId,
                        SessionId: notificationReport.SessionId,
                        NotificationTypeId:
                            notificationReport.NotificationTypeId,
                        TemplateId: notificationReport.TemplateId,
                        LanguageCodeId: notificationReport.LanguageCodeId,
                        ReceiverAddress: notificationReport.ReceiverAddress,
                        Subject: notificationReport.Subject,
                        Content: notificationReport.Content,
                        SentStatusId: notificationReport.SentStatusId,
                        IsEncrypted: notificationReport.IsEncrypted,
                        MaxRetryCount: notificationReport.MaxRetryCount,
                        AttemptCount: notificationReport.AttemptCount,
                        Priority: notificationReport.Priority,
                        HasExpiryDateTime: notificationReport.HasExpiryDateTime,
                        ExpiryDateTime: notificationReport.ExpiryDateTime,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
