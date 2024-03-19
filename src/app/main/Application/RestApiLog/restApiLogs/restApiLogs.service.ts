import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    TenantApiResponse,
    ApiRunStatusApiResponse,
    HttpMethodApiResponse,
} from "app/ui/restApiLog";
import { UserTypeApiResponse } from "app/ui/userDefinition";

@Injectable({ providedIn: "root" })
export class RestApiLogsService {
    tenantApiResponse: TenantApiResponse;
    apiRunStatusApiResponse: ApiRunStatusApiResponse;
    httpMethodApiResponse: HttpMethodApiResponse;
    userTypeResponse: UserTypeApiResponse;
    onRestApiLogsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onRestApiLogsChanged = new BehaviorSubject({});
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
     * GetTenants
     *
     * @returns {Promise<any>}
     */
    GetTenants(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TenantApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/RestApiLog/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onRestApiLogsChanged.next(this.tenantApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetUserTypes
     *
     * @returns {Promise<any>}
     */
    GetUserTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<UserTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/RestApiLog/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeResponse = response;
                    this.onRestApiLogsChanged.next(this.userTypeResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetApiRunStatues
     *
     * @returns {Promise<any>}
     */
    GetApiRunStatues(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApiRunStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/RestApiLog/GetApiRunStatues`
                )
                .subscribe((response: ApiRunStatusApiResponse) => {
                    this.apiRunStatusApiResponse = response;
                    this.onRestApiLogsChanged.next(
                        this.apiRunStatusApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetHttpMethods
     *
     * @returns {Promise<any>}
     */
    GetHttpMethods(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HttpMethodApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/RestApiLog/GetHttpMethods`
                )
                .subscribe((response: HttpMethodApiResponse) => {
                    this.httpMethodApiResponse = response;
                    this.onRestApiLogsChanged.next(this.httpMethodApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
