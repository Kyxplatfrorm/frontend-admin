import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    WebHookRunStatusApiResponse,
    TenantApiResponse,
    WebHookTypeApiResponse,
} from "app/ui/webHookReport";

@Injectable({ providedIn: "root" })
export class WebHookReportsService {
    webHookRunStatusApiResponse: WebHookRunStatusApiResponse;
    webHookTypeApiResponse: WebHookTypeApiResponse;
    tenantApiResponse: TenantApiResponse;
    onWebHookReportsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onWebHookReportsChanged = new BehaviorSubject({});
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
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookReport/GetWebHookTypes`
                )
                .subscribe((response: WebHookTypeApiResponse) => {
                    this.webHookTypeApiResponse = response;
                    this.onWebHookReportsChanged.next(
                        this.webHookTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetWebHookRunStatues
     *
     * @returns {Promise<any>}
     */
    GetWebHookRunStatues(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<WebHookRunStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookReport/GetWebHookRunStatues`
                )
                .subscribe((response: WebHookRunStatusApiResponse) => {
                    this.webHookRunStatusApiResponse = response;
                    this.onWebHookReportsChanged.next(
                        this.webHookRunStatusApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onWebHookReportsChanged.next(this.tenantApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
