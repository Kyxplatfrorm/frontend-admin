import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { FraudRuleDefinitionApiResponse } from "app/ui/fraudRuleDefinitions";

@Injectable()
export class SearchFraudRuleDefinitionsService implements Resolve<any> {
    fraudRuleDefinitionApiResponse: FraudRuleDefinitionApiResponse;
    routeParams: any;
    fraudRule: any;
    onFraudRuleDefinitionsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
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
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.FillSearchFraudRuleDefinitionsTable(this.fraudRule),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchFraudRuleDefinitionsTable(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.fraudRuleDefinitionApiResponse == undefined) {
                this.fraudRuleDefinitionApiResponse =
                    new FraudRuleDefinitionApiResponse();
                this.fraudRuleDefinitionApiResponse.IsSucceeded = true;
                this.fraudRuleDefinitionApiResponse.FraudRuleDefinitionList =
                    [];
            }
            this.onFraudRuleDefinitionsChanged.next(
                this.fraudRuleDefinitionApiResponse
            );
            resolve(this.fraudRuleDefinitionApiResponse);
        });
    }

    /**
     * SearchFraudRuleDefinition
     *
     * @returns {Promise<any>}
     */
    SearchFraudRuleDefinition(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/SearchFraudRuleDefinition`,
                    {
                        TenantId: fraudRule.TenantId,
                        FraudRuleActionTypeId: fraudRule.FraudRuleActionTypeId,
                        FraudRuleCheckTimeTypeId:
                            fraudRule.FraudRuleCheckTimeTypeId,
                        FraudGroupId: fraudRule.FraudGroupId,
                        Description: fraudRule.Description,
                        SearchStartDate: fraudRule.SearchStartDate,
                        SearchEndDate: fraudRule.SearchEndDate,
                        NotificationTypeId: fraudRule.NotificationTypeId,
                    }
                )
                .subscribe((response: any) => {
                    this.fraudRuleDefinitionApiResponse = response;
                    this.onFraudRuleDefinitionsChanged.next(
                        this.fraudRuleDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteFraudRuleDefinition
     *
     * @param fraudRule
     * @returns {Promise<any>}
     */
    DeleteFraudRuleDefinition(fraudRule): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudRuleDefinition/DeleteFraudRuleDefinition?fraudRuleDefinitionId=` +
                        fraudRule.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
