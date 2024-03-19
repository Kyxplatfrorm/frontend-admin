import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { UrlDefinitionApiResponse } from "app/ui/urlDefinition";

@Injectable()
export class SearchApplicationUrlDefinitionsService implements Resolve<any> {
    urlDefinitionApiResponse: UrlDefinitionApiResponse;
    routeParams: any;
    applicationUrl: any;
    onApplicationUrlDefinitionsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApplicationUrlDefinitionsChanged = new BehaviorSubject({});
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
                this.FillSearchApplicationUrlDefinitionsTable(
                    this.applicationUrl
                ),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchApplicationUrlDefinitionsTable(applicationUrl): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.urlDefinitionApiResponse == undefined) {
                this.urlDefinitionApiResponse = new UrlDefinitionApiResponse();
                this.urlDefinitionApiResponse.IsSucceeded = true;
                this.urlDefinitionApiResponse.ApplicationUrlDefinitionList = [];
            }
            this.onApplicationUrlDefinitionsChanged.next(
                this.urlDefinitionApiResponse
            );
            resolve(this.urlDefinitionApiResponse);
        });
    }

    /**
     * SearchApplicationUrlDefinition
     *
     * @returns {Promise<any>}
     */
    SearchApplicationUrlDefinition(applicationUrl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationUrlDefinition/SearchApplicationUrlDefinition`,
                    {
                        TenantId: applicationUrl.TenantId,
                        ApplicationTypeId: applicationUrl.ApplicationTypeId,
                        Url: applicationUrl.Url,
                        Description: applicationUrl.Description,
                        SearchStartDate: applicationUrl.SearchStartDate,
                        SearchEndDate: applicationUrl.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.urlDefinitionApiResponse = response;
                    this.onApplicationUrlDefinitionsChanged.next(
                        this.urlDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteApplicationUrlDefinition
     *
     * @param applicationUrl
     * @returns {Promise<any>}
     */
    DeleteApplicationUrlDefinition(applicationUrl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationUrlDefinition/DeleteApplicationUrlDefinition?applicationUrlId=` +
                        applicationUrl.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
