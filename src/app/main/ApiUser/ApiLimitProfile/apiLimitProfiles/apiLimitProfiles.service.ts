import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    ApiLimitProfileApiResponse,
    ValidDaysApiResponse,
} from "app/ui/apiLimitProfile";
import { TenantApiResponse } from "app/ui/tenant";

@Injectable({ providedIn: "root" })
export class ApiLimitProfilesService {
    apiLimitProfileApiResponse: ApiLimitProfileApiResponse;
    tenantApiResponse: TenantApiResponse;
    validDaysApiResponse: ValidDaysApiResponse;
    onApiLimitProfilesChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onApiLimitProfilesChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApiLimitProfiles()]).then(() => {
                resolve();
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiLimitProfile/GetApiLimitProfiles`
                )
                .subscribe((response: ApiLimitProfileApiResponse) => {
                    this.apiLimitProfileApiResponse = response;
                    this.onApiLimitProfilesChanged.next(
                        this.apiLimitProfileApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetValidDays
     *
     * @returns {Promise<any>}
     */
    GetValidDays(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ValidDaysApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiLimitProfile/GetValidDays`
                )
                .subscribe((response: ValidDaysApiResponse) => {
                    this.validDaysApiResponse = response;
                    this.onApiLimitProfilesChanged.next(
                        this.validDaysApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiLimitProfile/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onApiLimitProfilesChanged.next(this.tenantApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteApiLimitProfile
     *
     * @param apiLimitProfile
     * @returns {Promise<any>}
     */
    DeleteApiLimitProfile(apiLimitProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiLimitProfile/DeleteApiLimitProfile?deleteApiLimitProfileId=` +
                        apiLimitProfile.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
