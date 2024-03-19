import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { FraudRuleApiRelationEntity } from "app/ui/fraudRuleDefinitions";

@Injectable()
export class FraudRuleDefinitionService implements Resolve<any> {
    routeParams: any;
    onFraudRuleDefinitionChanged: BehaviorSubject<any>;
    fraudRule: any;
    fraudRuleApiRelation: FraudRuleApiRelationEntity[];
    selectedId: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onFraudRuleDefinitionChanged = new BehaviorSubject({});
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
        this.selectedId = this.routeParams.id;

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetFraudRuleDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetFraudRuleDefinition
     *
     * @returns {Promise<any>}
     */
    GetFraudRuleDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onFraudRuleDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/GetFraudRuleDefinition?fraudRuleId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.fraudRule = response.FraudRuleDefinition;
                        if (response.FraudRuleApiRelation) {
                            this.fraudRuleApiRelation =
                                response.FraudRuleApiRelation;
                            this.fraudRule.FraudRuleApiRelation =
                                this.fraudRuleApiRelation;
                        }
                        this.onFraudRuleDefinitionChanged.next(this.fraudRule);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateFraudRuleDefinition
     *
     * @param fraudRule
     * @returns {Promise<any>}
     */
    CreateFraudRuleDefinition(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/CreateFraudRuleDefinition`,
                    {
                        TenantId: fraudRule.TenantId,
                        Description: fraudRule.Description,
                        IsBuiltInDefinition: fraudRule.IsBuiltInDefinition,
                        IsActive: fraudRule.IsActive,
                        FraudGroupId: fraudRule.FraudGroupId,
                        HasFraudQuery: fraudRule.HasFraudQuery,
                        FraudQuery: fraudRule.FraudQuery,
                        FraudRuleActionTypeId: fraudRule.FraudRuleActionTypeId,
                        FraudRuleCheckTimeTypeId:
                            fraudRule.FraudRuleCheckTimeTypeId,
                        FraudRuleCheckTime: fraudRule.FraudRuleCheckTime,
                        FraudRuleCheckCount: fraudRule.FraudRuleCheckCount,
                        FraudRuleCheckAmount: fraudRule.FraudRuleCheckAmount,
                        LogFraudRule: fraudRule.LogFraudRule,
                        ErrorCode: fraudRule.ErrorCode,
                        ErrorDescription: fraudRule.ErrorDescription,
                        SendNotification: fraudRule.SendNotification,
                        NotificationTypeId: fraudRule.NotificationTypeId,
                        NotificationTemplateCode:
                            fraudRule.NotificationTemplateCode,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateFraudRuleApiRelation
     *
     * @param fraudRule
     * @returns {Promise<any>}
     */
    CreateFraudRuleApiRelation(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/CreateFraudRuleApiRelation`,
                    {
                        FraudApiId: fraudRule.FraudApiId,
                        FraudRuleId: fraudRule.FraudRuleId,
                        Priority: fraudRule.Priority,
                        IsActive: fraudRule.IsActive,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateFraudRuleDefinition
     *
     * @param fraudRule
     * @returns {Promise<any>}
     */
    UpdateFraudRuleDefinition(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/UpdateFraudRuleDefinition`,
                    {
                        Id: fraudRule.Id,
                        TenantId: fraudRule.TenantId,
                        Description: fraudRule.Description,
                        IsBuiltInDefinition: fraudRule.IsBuiltInDefinition,
                        IsActive: fraudRule.IsActive,
                        FraudGroupId: fraudRule.FraudGroupId,
                        HasFraudQuery: fraudRule.HasFraudQuery,
                        FraudQuery: fraudRule.FraudQuery,
                        FraudRuleActionTypeId: fraudRule.FraudRuleActionTypeId,
                        FraudRuleCheckTimeTypeId:
                            fraudRule.FraudRuleCheckTimeTypeId,
                        FraudRuleCheckTime: fraudRule.FraudRuleCheckTime,
                        FraudRuleCheckCount: fraudRule.FraudRuleCheckCount,
                        FraudRuleCheckAmount: fraudRule.FraudRuleCheckAmount,
                        LogFraudRule: fraudRule.LogFraudRule,
                        ErrorCode: fraudRule.ErrorCode,
                        ErrorDescription: fraudRule.ErrorDescription,
                        SendNotification: fraudRule.SendNotification,
                        NotificationTypeId: fraudRule.NotificationTypeId,
                        NotificationTemplateCode:
                            fraudRule.NotificationTemplateCode,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateFraudRuleApiRelation
     *
     * @param fraudRule
     * @returns {Promise<any>}
     */
    UpdateFraudRuleApiRelation(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/UpdateFraudRuleApiRelation`,
                    {
                        Id: fraudRule.Id,
                        FraudRuleId: fraudRule.FraudRuleId,
                        FraudApiId: fraudRule.FraudApiId,
                        Priority: fraudRule.Priority,
                        IsActive: fraudRule.IsActive,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteFraudRuleApiRelation
     *
     * @param fraudRule
     * @returns {Promise<any>}
     */
    DeleteFraudRuleApiRelation(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/DeleteFraudRuleApiRelation?deleteFraudRuleApiRelationId=` +
                        fraudRule.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
