import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    CustomerApiResponse,
    LanguageCodeApiResponse,
    NotificationMonitoringApiResponse,
    NotificationTemplateApiResponse,
    NotificationTypeApiResponse,
    SentStatusApiResponse,
} from "app/ui/notificationMonitoring";

@Injectable({ providedIn: "root" })
export class NotificationMonitoringsService {
    notificationMonitoringApiResponse: NotificationMonitoringApiResponse;
    notificationTypeApiResponse: NotificationTypeApiResponse;
    languageCodeApiResponse: LanguageCodeApiResponse;
    sentStatusApiResponse: SentStatusApiResponse;
    notificationTemplateApiResponse: NotificationTemplateApiResponse;
    customerApiResponse: CustomerApiResponse;
    onNotificationMonitoringsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onNotificationMonitoringsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetNotificationMonitorings()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetNotificationMonitorings
     *
     * @returns {Promise<any>}
     */
    GetNotificationMonitorings(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<NotificationMonitoringApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/GetNotificationMonitorings`
                )
                .subscribe((response: NotificationMonitoringApiResponse) => {
                    this.notificationMonitoringApiResponse = response;
                    this.onNotificationMonitoringsChanged.next(
                        this.notificationMonitoringApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetNotificationTypes
     *
     * @returns {Promise<any>}
     */
    GetNotificationTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<NotificationTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/GetNotificationTypes`
                )
                .subscribe((response: NotificationTypeApiResponse) => {
                    this.notificationTypeApiResponse = response;
                    this.onNotificationMonitoringsChanged.next(
                        this.notificationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetLanguageCodes
     *
     * @returns {Promise<any>}
     */
    GetLanguageCodes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<LanguageCodeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/GetLanguageCodes`
                )
                .subscribe((response: LanguageCodeApiResponse) => {
                    this.languageCodeApiResponse = response;
                    this.onNotificationMonitoringsChanged.next(
                        this.languageCodeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSentStatus
     *
     * @returns {Promise<any>}
     */
    GetNotificationSentStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SentStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/GetNotificationSentStatus`
                )
                .subscribe((response: SentStatusApiResponse) => {
                    this.sentStatusApiResponse = response;
                    this.onNotificationMonitoringsChanged.next(
                        this.sentStatusApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetNotificationTemplates
     *
     * @returns {Promise<any>}
     */
    GetNotificationTemplates(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<NotificationTemplateApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/GetNotificationTemplates`
                )
                .subscribe((response: NotificationTemplateApiResponse) => {
                    this.notificationTemplateApiResponse = response;
                    this.onNotificationMonitoringsChanged.next(
                        this.notificationTemplateApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteNotificationMonitoring
     *
     * @param notificationMonitoring
     * @returns {Promise<any>}
     */
    DeleteNotificationMonitoring(notificationMonitoring): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationMonitoring/DeleteNotificationMonitoring?deleteNotificationMonitoringId=` +
                        notificationMonitoring.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
