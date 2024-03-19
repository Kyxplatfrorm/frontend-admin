import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TenantApiResponse } from "app/ui/tenantCurrencyProfile";
import { Tenant } from "../../TenantDefinitions/tenantDetail/tenantDetail.model";

@Injectable({ providedIn: "root" })
export class TenantCurrencyService {
    tenantApiResponse: TenantApiResponse;
    onTenantChanged: BehaviorSubject<any>;
    tenantId: number;

    constructor(private http: HttpClient) {
        this.onTenantChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenants()]).then(() => {
                resolve();
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
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCurrencyProfile/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onTenantChanged.next(this.tenantApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
