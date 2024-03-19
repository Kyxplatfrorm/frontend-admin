import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { FraudApiDefinitionApiResponse } from "app/ui/fraudApiDefinition";

@Injectable()
export class SearchFraudApiDefinitionsService implements Resolve<any> {
    fraudApiDefinitionApiResponse: FraudApiDefinitionApiResponse;
    routeParams: any;
    fraudApi: any;
    onFraudApiDefinitionsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onFraudApiDefinitionsChanged = new BehaviorSubject({});
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
                this.FillSearchFraudApiDefinitionsTable(this.fraudApi),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchFraudApiDefinitionsTable(fraudApi): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.fraudApiDefinitionApiResponse == undefined) {
                this.fraudApiDefinitionApiResponse =
                    new FraudApiDefinitionApiResponse();
                this.fraudApiDefinitionApiResponse.IsSucceeded = true;
                this.fraudApiDefinitionApiResponse.FraudApiDefinitionList = [];
            }
            this.onFraudApiDefinitionsChanged.next(
                this.fraudApiDefinitionApiResponse
            );
            resolve(this.fraudApiDefinitionApiResponse);
        });
    }

    /**
     * SearchFraudApiDefinition
     *
     * @returns {Promise<any>}
     */
    SearchFraudApiDefinition(fraudApi): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudApiDefinition/SearchFraudApiDefinition`,
                    {
                        ControllerName: fraudApi.ControllerName,
                        ApplicationTypeId: fraudApi.ApplicationTypeId,
                        ActionName: fraudApi.ActionName,
                        Description: fraudApi.Description,
                        SearchStartDate: fraudApi.SearchStartDate,
                        SearchEndDate: fraudApi.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.fraudApiDefinitionApiResponse = response;
                    this.onFraudApiDefinitionsChanged.next(
                        this.fraudApiDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteFraudApiDefinition
     *
     * @param fraudApi
     * @returns {Promise<any>}
     */
    DeleteFraudApiDefinition(fraudApi): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudApiDefinition/DeleteFraudApiDefinition?fraudApiDefinitionId=` +
                        fraudApi.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
