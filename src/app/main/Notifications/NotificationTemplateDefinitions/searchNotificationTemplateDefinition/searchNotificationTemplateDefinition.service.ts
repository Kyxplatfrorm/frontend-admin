import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { NotificationTemplateApiResponse } from "app/ui/notificationTemplateDefinition";

@Injectable()
export class SearchNotificationTemplateDefinitionService
    implements Resolve<any>
{
    notificationTemplateApiResponse: NotificationTemplateApiResponse;
    routeParams: any;
    notificationTemplate: any;
    onSearchNotificationTemplateDefinitionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchNotificationTemplateDefinitionChanged =
            new BehaviorSubject({});
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
                this.FillNotificationTemplateTable(this.notificationTemplate),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillNotificationTemplateTable(notificationTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.notificationTemplateApiResponse == undefined) {
                this.notificationTemplateApiResponse =
                    new NotificationTemplateApiResponse();
                this.notificationTemplateApiResponse.IsSucceeded = true;
                this.notificationTemplateApiResponse.NotificationTemplateList =
                    [];
            }
            this.onSearchNotificationTemplateDefinitionChanged.next(
                this.notificationTemplateApiResponse
            );
            resolve(this.notificationTemplateApiResponse);
        });
    }

    /**
     * SearchNotificationTemplateDefinition
     *
     * @returns {Promise<any>}
     */
    SearchNotificationTemplateDefinition(notificationTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/SearchNotificationTemplateDefinition`,
                    {
                        CompanyId: notificationTemplate.CompanyId,
                        TenantId: notificationTemplate.TenantId,
                        TemplateTypeId: notificationTemplate.TemplateTypeId,
                        LanguageCodeId: notificationTemplate.LanguageCodeId,
                        Subject: notificationTemplate.Subject,
                        SearchStartDate: notificationTemplate.SearchStartDate,
                        SearchEndDate: notificationTemplate.SearchEndDate,
                        SearchStartTime: notificationTemplate.SearchStartTime,
                        SearchEndTime: notificationTemplate.SearchEndTime,
                    }
                )
                .subscribe((response: any) => {
                    this.notificationTemplateApiResponse = response;
                    this.onSearchNotificationTemplateDefinitionChanged.next(
                        this.notificationTemplateApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteNotificationTemplateDefinition
     *
     * @param notificationTemplate
     * @returns {Promise<any>}
     */
    DeleteNotificationTemplateDefinition(notificationTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/NotificationTemplateDefinition/DeleteNotificationTemplateDefinition?deleteNotificationTemplateId=` +
                        notificationTemplate.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
