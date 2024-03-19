import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    ApiPermissionProfilesApiResponse,
    UserStatusApiResponse,
} from "app/ui/apiUserDefinition";
import { TenantApiResponse } from "app/ui/tenant";
import { UserTypeApiResponse } from "app/ui/userDefinition";

@Injectable({ providedIn: "root" })
export class ApiUserDefinitionsService {
    onApiUserDefinitionsChanged: BehaviorSubject<any>;
    apiPermissionProfilesApiResponse: ApiPermissionProfilesApiResponse;
    tenantDefApiResponse: TenantApiResponse;
    apiUser: any;
    userStatusResponse: UserStatusApiResponse;
    userTypeResponse: UserTypeApiResponse;

    constructor(private http: HttpClient) {
        this.onApiUserDefinitionsChanged = new BehaviorSubject({});
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
     * GetUserStatus
     *
     * @returns {Promise<any>}
     */
    GetUserStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<UserStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/GetUserStatus`
                )
                .subscribe((response: UserStatusApiResponse) => {
                    this.userStatusResponse = response;
                    this.onApiUserDefinitionsChanged.next(
                        this.userStatusResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetApiPermissionProfiles
     *
     * @returns {Promise<any>}
     */
    GetApiPermissionProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApiPermissionProfilesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/GetApiPermissionProfiles`
                )
                .subscribe((response: ApiPermissionProfilesApiResponse) => {
                    this.apiPermissionProfilesApiResponse = response;
                    this.onApiUserDefinitionsChanged.next(
                        this.apiPermissionProfilesApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantDefApiResponse = response;
                    this.onApiUserDefinitionsChanged.next(
                        this.tenantDefApiResponse
                    );
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeResponse = response;
                    this.onApiUserDefinitionsChanged.next(
                        this.userTypeResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
