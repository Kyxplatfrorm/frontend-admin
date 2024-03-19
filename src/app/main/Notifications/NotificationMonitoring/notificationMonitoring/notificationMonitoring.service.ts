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
export class NotificationMonitoringService implements Resolve<any> {
    routeParams: any;
    onNotificationMonitoringChanged: BehaviorSubject<any>;
    notificationMonitoring: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onNotificationMonitoringChanged = new BehaviorSubject({});
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
            Promise.all([this.GetNotificationMonitoring()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetNotificationMonitoring
     *
     * @returns {Promise<any>}
     */
    GetNotificationMonitoring(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onNotificationMonitoringChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/GetNotificationMonitoring?notificationMonitoringId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.notificationMonitoring =
                            response.NotificationMonitoring;
                        this.onNotificationMonitoringChanged.next(
                            this.notificationMonitoring
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateNotificationMonitoring
     *
     * @param notificationMonitoring
     * @returns {Promise<any>}
     */
    CreateNotificationMonitoring(notificationMonitoring): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/CreateNotificationMonitoring`,
                    {
                        CustomerName: notificationMonitoring.CustomerName,
                        CompanyId: notificationMonitoring.CompanyId,
                        SessionId: notificationMonitoring.SessionId,
                        NotificationTypeId:
                            notificationMonitoring.NotificationTypeId,
                        TemplateId: notificationMonitoring.TemplateId,
                        LanguageCodeId: notificationMonitoring.LanguageCodeId,
                        ReceiverAddress: notificationMonitoring.ReceiverAddress,
                        Subject: notificationMonitoring.Subject,
                        Content: notificationMonitoring.Content,
                        SentStatusId: notificationMonitoring.SentStatusId,
                        IsEncrypted: notificationMonitoring.IsEncrypted,
                        MaxRetryCount: notificationMonitoring.MaxRetryCount,
                        AttemptCount: notificationMonitoring.AttemptCount,
                        Priority: notificationMonitoring.Priority,
                        HasExpiryDateTime:
                            notificationMonitoring.HasExpiryDateTime,
                        ExpiryDateTime: notificationMonitoring.ExpiryDateTime,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateNotificationMonitoring
     *
     * @param notificationMonitoring
     * @returns {Promise<any>}
     */
    UpdateNotificationMonitoring(notificationMonitoring): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/UpdateNotificationMonitoring`,
                    {
                        Id: notificationMonitoring.Id,
                        CustomerName: notificationMonitoring.CustomerName,
                        CompanyId: notificationMonitoring.CompanyId,
                        SessionId: notificationMonitoring.SessionId,
                        NotificationTypeId:
                            notificationMonitoring.NotificationTypeId,
                        TemplateId: notificationMonitoring.TemplateId,
                        LanguageCodeId: notificationMonitoring.LanguageCodeId,
                        ReceiverAddress: notificationMonitoring.ReceiverAddress,
                        Subject: notificationMonitoring.Subject,
                        Content: notificationMonitoring.Content,
                        SentStatusId: notificationMonitoring.SentStatusId,
                        IsEncrypted: notificationMonitoring.IsEncrypted,
                        MaxRetryCount: notificationMonitoring.MaxRetryCount,
                        AttemptCount: notificationMonitoring.AttemptCount,
                        Priority: notificationMonitoring.Priority,
                        HasExpiryDateTime:
                            notificationMonitoring.HasExpiryDateTime,
                        ExpiryDateTime: notificationMonitoring.ExpiryDateTime,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
