import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    WebHookRunStatusApiResponse,
    TenantApiResponse,
    WebHookMonitoringApiResponse,
    WebHookTypeApiResponse,
} from "app/ui/webHookMonitoring";

@Injectable({ providedIn: "root" })
export class WebHookMonitoringsService {
    webHookMonitoringApiResponse: WebHookMonitoringApiResponse;
    tenantApiResponse: TenantApiResponse;
    webHookTypeApiResponse: WebHookTypeApiResponse;
    webHookRunStatusApiResponse: WebHookRunStatusApiResponse;
    onWebHookMonitoringsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onWebHookMonitoringsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetWebHookMonitorings()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetWebHookMonitorings
     *
     * @returns {Promise<any>}
     */
    GetWebHookMonitorings(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<WebHookMonitoringApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/GetWebHookMonitorings`
                )
                .subscribe((response: WebHookMonitoringApiResponse) => {
                    this.webHookMonitoringApiResponse = response;
                    this.onWebHookMonitoringsChanged.next(
                        this.webHookMonitoringApiResponse
                    );
                    resolve(response);
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
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/GetWebHookTypes`
                )
                .subscribe((response: WebHookTypeApiResponse) => {
                    this.webHookTypeApiResponse = response;
                    this.onWebHookMonitoringsChanged.next(
                        this.webHookTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetApiRunStatues
     *
     * @returns {Promise<any>}
     */
    GetWebHookRunStatues(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<WebHookRunStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/GetWebHookRunStatues`
                )
                .subscribe((response: WebHookRunStatusApiResponse) => {
                    this.webHookRunStatusApiResponse = response;
                    this.onWebHookMonitoringsChanged.next(
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
                    this.onWebHookMonitoringsChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteWebHookMonitoring
     *
     * @param webHookMonitoring
     * @returns {Promise<any>}
     */
    DeleteWebHookMonitoring(webHookMonitoring): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/DeleteWebHookMonitoring?deleteWebHookMonitoringId=` +
                        webHookMonitoring.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
