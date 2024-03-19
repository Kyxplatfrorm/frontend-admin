import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { TenantDefinitionEntity } from "app/ui/tenant";

@Injectable()
export class TenantDetailService implements Resolve<any> {
    routeParams: any;
    tenant: any;
    onTenantDetailChanged: BehaviorSubject<any>;
    tenantList: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onTenantDetailChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenant()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getTenant
     *
     * @returns {Promise<any>}
     */
    GetTenant(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onTenantDetailChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Tenant/GetTenant?tenantId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.tenant = response.TenantDefinition;
                        this.onTenantDetailChanged.next(this.tenant);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * createTenant
     *
     * @param tenant
     * @returns {Promise<any>}
     */
    CreateTenant(tenant): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Tenant/CreateTenant`,
                    {
                        Id: tenant.Id,
                        TenantName: tenant.TenantName,
                        TenantCode: tenant.TenantCode,
                        DefaultCurrencyCode: tenant.DefaultCurrencyCode,
                        TenantLogoUrl: tenant.TenantLogoUrl,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateTenant
     *
     * @param tenant
     * @returns {Promise<any>}
     */
    UpdateTenant(tenant): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Tenant/UpdateTenant`,
                    {
                        Id: tenant.Id,
                        TenantName: tenant.TenantName,
                        TenantCode: tenant.TenantCode,
                        DefaultCurrencyCode: tenant.DefaultCurrencyCode,
                        TenantLogoUrl: tenant.TenantLogoUrl,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
