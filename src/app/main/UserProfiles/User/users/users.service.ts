import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    CustomerTypeApiResponse,
    LoginMethodTypeApiResponse,
    TwoFormFactorAuthTypeApiResponse,
    UserStatusApiResponse,
    UserTypeApiResponse,
} from "app/ui/userDefinition";
import { TenantApiResponse } from "app/ui/tenant";
import { UserProfilesApiResponse } from "app/ui/userProfiles";

@Injectable({ providedIn: "root" })
export class UsersService {
    onUsersChanged: BehaviorSubject<any>;
    user: any;
    customerTypeResponse: CustomerTypeApiResponse;
    loginMethodTypeApiResponse: LoginMethodTypeApiResponse;
    twoFormFactorAuthTypeApiResponse: TwoFormFactorAuthTypeApiResponse;
    userStatusResponse: UserStatusApiResponse;
    userTypeResponse: UserTypeApiResponse;
    tenantDefApiResponse: TenantApiResponse;
    userProfilesApiResponse: UserProfilesApiResponse;

    constructor(private http: HttpClient) {
        this.onUsersChanged = new BehaviorSubject({});
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
     * GetCustomerType
     *
     * @returns {Promise<any>}
     */
    GetCustomerType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CustomerTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetCustomerType`
                )
                .subscribe((response: CustomerTypeApiResponse) => {
                    this.customerTypeResponse = response;
                    this.onUsersChanged.next(this.customerTypeResponse);
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
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeResponse = response;
                    this.onUsersChanged.next(this.userTypeResponse);
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
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantDefApiResponse = response;
                    this.onUsersChanged.next(this.tenantDefApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * getUserProfiles
     *
     * @returns {Promise<any>}
     */
    GetUserProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<UserProfilesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetUserProfiles`
                )
                .subscribe((response: UserProfilesApiResponse) => {
                    this.userProfilesApiResponse = response;
                    this.onUsersChanged.next(this.userProfilesApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTwoFormFactorAuthType
     *
     * @returns {Promise<any>}
     */
    GetTwoFormFactorAuthType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TwoFormFactorAuthTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetTwoFormFactorAuthType`
                )
                .subscribe((response: TwoFormFactorAuthTypeApiResponse) => {
                    this.twoFormFactorAuthTypeApiResponse = response;
                    this.onUsersChanged.next(
                        this.twoFormFactorAuthTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetLoginMethodType
     *
     * @returns {Promise<any>}
     */
    GetLoginMethodType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<LoginMethodTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetLoginMethodType`
                )
                .subscribe((response: LoginMethodTypeApiResponse) => {
                    this.loginMethodTypeApiResponse = response;
                    this.onUsersChanged.next(this.loginMethodTypeApiResponse);
                    resolve(response);
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
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetUserStatus`
                )
                .subscribe((response: UserStatusApiResponse) => {
                    this.userStatusResponse = response;
                    this.onUsersChanged.next(this.userStatusResponse);
                    resolve(response);
                }, reject);
        });
    }
}
