import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    RestrictionCheckTypeApiResponse,
    RestrictionTypeApiResponse,
    TenantApiResponse,
} from "app/ui/tenantRestrictionProfile";

@Injectable({ providedIn: "root" })
export class TenantRestrictionProfilesService {
    tenantApiResponse: TenantApiResponse;
    restrictionCheckTypeApiResponse: RestrictionCheckTypeApiResponse;
    restrictionTypeApiResponse: RestrictionTypeApiResponse;
    onTenantRestrictionProfileChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onTenantRestrictionProfileChanged = new BehaviorSubject({});
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
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onTenantRestrictionProfileChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetRestrictionCheckType
     *
     * @returns {Promise<any>}
     */
    GetRestrictionCheckType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<RestrictionCheckTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/GetRestrictionCheckType`
                )
                .subscribe((response: RestrictionCheckTypeApiResponse) => {
                    this.restrictionCheckTypeApiResponse = response;
                    this.onTenantRestrictionProfileChanged.next(
                        this.restrictionCheckTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetRestrictionType
     *
     * @returns {Promise<any>}
     */
    GetRestrictionType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<RestrictionTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/GetRestrictionType`
                )
                .subscribe((response: RestrictionTypeApiResponse) => {
                    this.restrictionTypeApiResponse = response;
                    this.onTenantRestrictionProfileChanged.next(
                        this.restrictionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
