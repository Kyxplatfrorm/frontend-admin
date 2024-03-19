import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import {
    LimitCardTransactionGroupApiResponse,
    LimitCurrencyListApiResponse,
    TenantApiResponse,
} from "app/ui/tenantLimitProfile";

@Injectable({ providedIn: "root" })
export class TenantLimitProfilesService {
    tenantApiResponse: TenantApiResponse;
    limitCardTransactionGroupApiResponse: LimitCardTransactionGroupApiResponse;
    limitCurrencyListApiResponse: LimitCurrencyListApiResponse;
    onTenantLimitProfileChanged: BehaviorSubject<any>;
    routeParams: any;

    constructor(private http: HttpClient) {
        this.onTenantLimitProfileChanged = new BehaviorSubject({});
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
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onTenantLimitProfileChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCardTransactionGroup
     *
     * @returns {Promise<any>}
     */
    GetCardTransactionGroup(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<LimitCardTransactionGroupApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/GetCardTransactionGroup`
                )
                .subscribe((response: LimitCardTransactionGroupApiResponse) => {
                    this.limitCardTransactionGroupApiResponse = response;
                    this.onTenantLimitProfileChanged.next(
                        this.limitCardTransactionGroupApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCurrencyList
     *
     * @param tenantLimit
     * @returns {Promise<any>}
     */
    GetCurrencyList(tenantId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/GetCurrencyList?tenantLimitProfileForCurrencyTenantId=` +
                        tenantId
                )
                .subscribe((response: any) => {
                    this.limitCurrencyListApiResponse = response;
                    this.onTenantLimitProfileChanged.next(
                        this.limitCurrencyListApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
