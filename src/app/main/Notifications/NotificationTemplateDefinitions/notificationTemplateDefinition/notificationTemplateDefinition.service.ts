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
export class NotificationTemplateDefinitionService implements Resolve<any> {
    routeParams: any;
    onNotificationTemplateDefinitionChanged: BehaviorSubject<any>;
    notificationTemplate: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onNotificationTemplateDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetNotificationTemplateDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetNotificationTemplateDefinition
     *
     * @returns {Promise<any>}
     */
    GetNotificationTemplateDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onNotificationTemplateDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/GetNotificationTemplateDefinition?notificationTemplateId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.notificationTemplate =
                            response.NotificationTemplate;
                        this.onNotificationTemplateDefinitionChanged.next(
                            this.notificationTemplate
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateNotificationTemplateDefinition
     *
     * @param notificationTemplate
     * @returns {Promise<any>}
     */
    CreateNotificationTemplateDefinition(notificationTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/CreateNotificationTemplateDefinition`,
                    {
                        IsDefaultTemplate:
                            notificationTemplate.IsDefaultTemplate,
                        CompanyId: notificationTemplate.CompanyId,
                        TenantId: notificationTemplate.TenantId,
                        IsCompanyTemplate:
                            notificationTemplate.IsCompanyTemplate,
                        TemplateCode: notificationTemplate.TemplateCode,
                        TemplateTypeId: notificationTemplate.TemplateTypeId,
                        LanguageCodeId: notificationTemplate.LanguageCodeId,
                        Subject: notificationTemplate.Subject,
                        Content: notificationTemplate.Content,
                        ExpirySecondCount:
                            notificationTemplate.ExpirySecondCount,
                        IsEncrypted: notificationTemplate.IsEncrypted,
                        HasExpiryDateTime:
                            notificationTemplate.HasExpiryDateTime,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateNotificationTemplateDefinition
     *
     * @param notificationTemplate
     * @returns {Promise<any>}
     */
    UpdateNotificationTemplateDefinition(notificationTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/UpdateNotificationTemplateDefinition`,
                    {
                        Id: notificationTemplate.Id,
                        IsDefaultTemplate:
                            notificationTemplate.IsDefaultTemplate,
                        CompanyId: notificationTemplate.CompanyId,
                        TenantId: notificationTemplate.TenantId,
                        IsCompanyTemplate:
                            notificationTemplate.IsCompanyTemplate,
                        TemplateCode: notificationTemplate.TemplateCode,
                        TemplateTypeId: notificationTemplate.TemplateTypeId,
                        LanguageCodeId: notificationTemplate.LanguageCodeId,
                        Subject: notificationTemplate.Subject,
                        Content: notificationTemplate.Content,
                        ExpirySecondCount:
                            notificationTemplate.ExpirySecondCount,
                        IsEncrypted: notificationTemplate.IsEncrypted,
                        HasExpiryDateTime:
                            notificationTemplate.HasExpiryDateTime,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
