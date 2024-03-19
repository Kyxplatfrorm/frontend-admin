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
export class TenantWebHookProfileService implements Resolve<any> {
    routeParams: any;
    onTenantWebHookProfileChanged: BehaviorSubject<any>;
    tenantWebHook: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onTenantWebHookProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenantWebHookProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetTenantWebHookProfile
     *
     * @returns {Promise<any>}
     */
    GetTenantWebHookProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onTenantWebHookProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/TenantWebHookProfile/GetTenantWebHookProfile?tenantWebHookProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.tenantWebHook = response.TenantWebHookProfile;
                        this.onTenantWebHookProfileChanged.next(
                            this.tenantWebHook
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateTenantWebHookProfile
     *
     * @param tenantWebHook
     * @returns {Promise<any>}
     */
    CreateTenantWebHookProfile(tenantWebHook): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantWebHookProfile/CreateTenantWebHookProfile`,
                    {
                        TenantId: tenantWebHook.TenantId,
                        WebHookTypeId: tenantWebHook.WebHookTypeId,
                        IsActive: tenantWebHook.IsActive,
                        WebHookUrl: tenantWebHook.WebHookUrl,
                        WebHookApiPath: tenantWebHook.WebHookApiPath,
                        HttpHeaderApiKeyName:
                            tenantWebHook.HttpHeaderApiKeyName,
                        EncryptedApiKey: tenantWebHook.EncryptedApiKey,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateTenantWebHookProfile
     *
     * @param tenantWebHook
     * @returns {Promise<any>}
     */
    UpdateTenantWebHookProfile(tenantWebHook): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantWebHookProfile/UpdateTenantWebHookProfile`,
                    {
                        Id: tenantWebHook.Id,
                        TenantId: tenantWebHook.TenantId,
                        WebHookTypeId: tenantWebHook.WebHookTypeId,
                        IsActive: tenantWebHook.IsActive,
                        WebHookUrl: tenantWebHook.WebHookUrl,
                        WebHookApiPath: tenantWebHook.WebHookApiPath,
                        HttpHeaderApiKeyName:
                            tenantWebHook.HttpHeaderApiKeyName,
                        EncryptedApiKey: tenantWebHook.EncryptedApiKey,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
