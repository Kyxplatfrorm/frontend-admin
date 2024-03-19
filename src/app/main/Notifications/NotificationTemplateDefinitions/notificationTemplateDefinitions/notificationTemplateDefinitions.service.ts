import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    LanguageCodeApiResponse,
    NotificationTemplateApiResponse,
    NotificationTypeApiResponse,
    TemplateTypeApiResponse,
    TenantApiResponse,
} from "app/ui/notificationTemplateDefinition";

@Injectable({ providedIn: "root" })
export class NotificationTemplateDefinitionsService {
    notificationTemplateApiResponse: NotificationTemplateApiResponse;
    tenantApiResponse: TenantApiResponse;
    notificationTypeApiResponse: NotificationTypeApiResponse;
    languageCodeApiResponse: LanguageCodeApiResponse;
    templateTypeApiResponse: TemplateTypeApiResponse;
    onNotificationTemplateDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onNotificationTemplateDefinitionsChanged = new BehaviorSubject({});
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
                    this.onNotificationTemplateDefinitionsChanged.next(
                        this.languageCodeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTemplateTypes
     *
     * @returns {Promise<any>}
     */
    GetTemplateTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TemplateTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/GetTemplateTypes`
                )
                .subscribe((response: TemplateTypeApiResponse) => {
                    this.templateTypeApiResponse = response;
                    this.onNotificationTemplateDefinitionsChanged.next(
                        this.templateTypeApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onNotificationTemplateDefinitionsChanged.next(
                        this.tenantApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/GetNotificationTypes`
                )
                .subscribe((response: NotificationTypeApiResponse) => {
                    this.notificationTypeApiResponse = response;
                    this.onNotificationTemplateDefinitionsChanged.next(
                        this.notificationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
