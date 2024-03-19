import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    TenantApiResponse,
    WebHookTypeApiResponse,
} from "app/ui/tenantWebHookProfile";

@Injectable({ providedIn: "root" })
export class TenantWebHookProfilesService {
    tenantApiResponse: TenantApiResponse;
    webHookTypeApiResponse: WebHookTypeApiResponse;
    onTenantWebHookProfilesChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onTenantWebHookProfilesChanged = new BehaviorSubject({});
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
     * GetWebHookTypes
     *
     * @returns {Promise<any>}
     */
    GetWebHookTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<WebHookTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantWebHookProfile/GetWebHookTypes`
                )
                .subscribe((response: WebHookTypeApiResponse) => {
                    this.webHookTypeApiResponse = response;
                    this.onTenantWebHookProfilesChanged.next(
                        this.webHookTypeApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantWebHookProfile/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onTenantWebHookProfilesChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
