import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    ApiDefinitionApiResponse,
    ApiLimitProfileApiResponse,
    ApiPermissionApiResponse,
    CompanyRestrictionProfileApiResponse,
} from "app/ui/apiPermissionProfile";
import { TenantApiResponse } from "app/ui/tenant";
import { UserTypeApiResponse } from "app/ui/userDefinition";

@Injectable({ providedIn: "root" })
export class ApiPermissionProfilesService {
    apiPermissionApiResponse: ApiPermissionApiResponse;
    apiDefinitionApiResponse: ApiDefinitionApiResponse;
    apiLimitProfileApiResponse: ApiLimitProfileApiResponse;
    companyRestrictionProfileApiResponse: CompanyRestrictionProfileApiResponse;
    userTypeApiResponse: UserTypeApiResponse;
    tenantApiResponse: TenantApiResponse;
    onApiPermissionProfilesChanged: BehaviorSubject<any>;
    apiPermissionProfile: any;

    constructor(private http: HttpClient) {
        this.onApiPermissionProfilesChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApiPermissionProfiles()]).then(() => {
                resolve();
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
                .get<ApiPermissionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/GetApiPermissionProfiles`
                )
                .subscribe((response: ApiPermissionApiResponse) => {
                    this.apiPermissionApiResponse = response;
                    this.onApiPermissionProfilesChanged.next(
                        this.apiPermissionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetApiDefinitions
     *
     * @param userTypeId
     * @returns {Promise<any>}
     */
    GetApiDefinitions(userTypeId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApiDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/GetApiDefinitions?userTypeId=` +
                        userTypeId
                )
                .subscribe((response: ApiDefinitionApiResponse) => {
                    this.apiDefinitionApiResponse = response;
                    this.onApiPermissionProfilesChanged.next(
                        this.apiDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetApiLimitProfiles
     *
     * @returns {Promise<any>}
     */
    GetApiLimitProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApiLimitProfileApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/GetApiLimitProfiles`
                )
                .subscribe((response: ApiLimitProfileApiResponse) => {
                    this.apiLimitProfileApiResponse = response;
                    this.onApiPermissionProfilesChanged.next(
                        this.apiLimitProfileApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCompanyRestrictionProfiles
     *
     * @returns {Promise<any>}
     */
    GetCompanyRestrictionProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CompanyRestrictionProfileApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/GetRestrictionCheckTypes`
                )
                .subscribe((response: CompanyRestrictionProfileApiResponse) => {
                    this.companyRestrictionProfileApiResponse = response;
                    this.onApiPermissionProfilesChanged.next(
                        this.companyRestrictionProfileApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onApiPermissionProfilesChanged.next(
                        this.tenantApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeApiResponse = response;
                    this.onApiPermissionProfilesChanged.next(
                        this.userTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteApiPermissionProfile
     *
     * @param apiPermissionProfile
     * @returns {Promise<any>}
     */
    DeleteApiPermissionProfile(apiPermissionProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/DeleteApiPermissionProfile?deleteApiPermissionProfileId=` +
                        apiPermissionProfile.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
