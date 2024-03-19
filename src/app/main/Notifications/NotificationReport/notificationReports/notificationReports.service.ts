import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    CustomerApiResponse,
    LanguageCodeApiResponse,
    NotificationTemplateApiResponse,
    NotificationTypeApiResponse,
    SentStatusApiResponse,
} from "app/ui/notificationReport";

@Injectable({ providedIn: "root" })
export class NotificationReportsService {
    notificationTypeApiResponse: NotificationTypeApiResponse;
    languageCodeApiResponse: LanguageCodeApiResponse;
    sentStatusApiResponse: SentStatusApiResponse;
    notificationTemplateApiResponse: NotificationTemplateApiResponse;
    customerApiResponse: CustomerApiResponse;
    onNotificationReportsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onNotificationReportsChanged = new BehaviorSubject({});
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
     * GetNotificationTypes
     *
     * @returns {Promise<any>}
     */
    GetNotificationTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<NotificationTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationReport/GetNotificationTypes`
                )
                .subscribe((response: NotificationTypeApiResponse) => {
                    this.notificationTypeApiResponse = response;
                    this.onNotificationReportsChanged.next(
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
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationReport/GetLanguageCodes`
                )
                .subscribe((response: LanguageCodeApiResponse) => {
                    this.languageCodeApiResponse = response;
                    this.onNotificationReportsChanged.next(
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
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationReport/GetNotificationSentStatus`
                )
                .subscribe((response: SentStatusApiResponse) => {
                    this.sentStatusApiResponse = response;
                    this.onNotificationReportsChanged.next(
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
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationReport/GetNotificationTemplates`
                )
                .subscribe((response: NotificationTemplateApiResponse) => {
                    this.notificationTemplateApiResponse = response;
                    this.onNotificationReportsChanged.next(
                        this.notificationTemplateApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
