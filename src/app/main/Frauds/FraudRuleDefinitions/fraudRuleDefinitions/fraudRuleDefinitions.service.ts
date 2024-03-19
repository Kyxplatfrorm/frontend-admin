import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    FraudGroupDefinitionApiResponse,
    FraudRuleActionTypeApiResponse,
    FraudApiDefinitionApiResponse,
    FraudRuleCheckTimeTypeApiResponse,
    NotificationTypeApiResponse,
    TenantApiResponse,
} from "app/ui/fraudRuleDefinitions";

@Injectable({ providedIn: "root" })
export class FraudRuleDefinitionsService {
    fraudRuleCheckTimeTypeApiResponse: FraudRuleCheckTimeTypeApiResponse;
    fraudApiDefinitionApiResponse: FraudApiDefinitionApiResponse;
    notificationTypeApiResponse: NotificationTypeApiResponse;
    fraudRuleActionTypeApiResponse: FraudRuleActionTypeApiResponse;
    tenantApiResponse: TenantApiResponse;
    fraudGroupDefinitionApiResponse: FraudGroupDefinitionApiResponse;
    onFraudRuleDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onFraudRuleDefinitionsChanged = new BehaviorSubject({});
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
     * GetFraudGroups
     *
     * @returns {Promise<any>}
     */
    GetFraudGroups(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FraudGroupDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/GetFraudGroups`
                )
                .subscribe((response: FraudGroupDefinitionApiResponse) => {
                    this.fraudGroupDefinitionApiResponse = response;
                    this.onFraudRuleDefinitionsChanged.next(
                        this.fraudGroupDefinitionApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onFraudRuleDefinitionsChanged.next(
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
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/GetNotificationTypes`
                )
                .subscribe((response: NotificationTypeApiResponse) => {
                    this.notificationTypeApiResponse = response;
                    this.onFraudRuleDefinitionsChanged.next(
                        this.notificationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFraudRuleCheckTimeTypes
     *
     * @returns {Promise<any>}
     */
    GetFraudRuleCheckTimeTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FraudRuleCheckTimeTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/GetFraudRuleCheckTimeTypes`
                )
                .subscribe((response: FraudRuleCheckTimeTypeApiResponse) => {
                    this.fraudRuleCheckTimeTypeApiResponse = response;
                    this.onFraudRuleDefinitionsChanged.next(
                        this.fraudRuleCheckTimeTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFraudRuleActionTypes
     *
     * @returns {Promise<any>}
     */
    GetFraudRuleActionTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FraudRuleActionTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/GetFraudRuleActionTypes`
                )
                .subscribe((response: FraudRuleActionTypeApiResponse) => {
                    this.fraudRuleActionTypeApiResponse = response;
                    this.onFraudRuleDefinitionsChanged.next(
                        this.fraudRuleActionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFraudApiDefinitions
     *
     * @returns {Promise<any>}
     */
    GetFraudApiDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FraudApiDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/GetFraudApiDefinitions`
                )
                .subscribe((response: FraudApiDefinitionApiResponse) => {
                    this.fraudApiDefinitionApiResponse = response;
                    this.onFraudRuleDefinitionsChanged.next(
                        this.fraudApiDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
