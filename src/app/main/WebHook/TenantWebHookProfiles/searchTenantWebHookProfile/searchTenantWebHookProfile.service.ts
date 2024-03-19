import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { TenantWebHookProfileApiResponse } from "app/ui/tenantWebHookProfile";

@Injectable()
export class SearchTenantWebHookProfileService implements Resolve<any> {
    tenantWebHookProfileApiResponse: TenantWebHookProfileApiResponse;
    routeParams: any;
    tenantWebHook: any;
    onSearchTenantWebHookProfileChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchTenantWebHookProfileChanged = new BehaviorSubject({});
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
                this.FillTenantWebHookProfileTable(this.tenantWebHook),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillTenantWebHookProfileTable(tenantWebHook): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.tenantWebHookProfileApiResponse == undefined) {
                this.tenantWebHookProfileApiResponse =
                    new TenantWebHookProfileApiResponse();
                this.tenantWebHookProfileApiResponse.IsSucceeded = true;
                this.tenantWebHookProfileApiResponse.TenantWebHookProfileList =
                    [];
            }
            this.onSearchTenantWebHookProfileChanged.next(
                this.tenantWebHookProfileApiResponse
            );
            resolve(this.tenantWebHookProfileApiResponse);
        });
    }

    /**
     * SearchTenantWebHookProfile
     *
     * @returns {Promise<any>}
     */
    SearchTenantWebHookProfile(tenantWebHook): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantWebHookProfile/SearchTenantWebHookProfile`,
                    {
                        WebHookTypeId: tenantWebHook.WebHookTypeId,
                        TenantId: tenantWebHook.TenantId,
                        WebHookUrl: tenantWebHook.WebHookUrl,
                        WebHookApiPath: tenantWebHook.WebHookApiPath,
                        HttpHeaderApiKeyName:
                            tenantWebHook.HttpHeaderApiKeyName,
                        EncryptedApiKey: tenantWebHook.EncryptedApiKey,
                        SearchStartDate: tenantWebHook.SearchStartDate,
                        SearchEndDate: tenantWebHook.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.tenantWebHookProfileApiResponse = response;
                    this.onSearchTenantWebHookProfileChanged.next(
                        this.tenantWebHookProfileApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteTenantWebHookProfile
     *
     * @param tenantWebHook
     * @returns {Promise<any>}
     */
    DeleteTenantWebHookProfile(tenantWebHook): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantWebHookProfile/DeleteTenantWebHookProfile?deleteTenantWebHookProfileId=` +
                        tenantWebHook.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
