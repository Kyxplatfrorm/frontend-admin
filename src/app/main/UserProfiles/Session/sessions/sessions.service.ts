import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TenantApiResponse } from "app/ui/tenant";
import { UserTypeApiResponse } from "app/ui/applicationDefinition";
import { SessionStatusApiResponse } from "app/ui/session";

@Injectable({ providedIn: "root" })
export class SessionsService {
    onSessionsChanged: BehaviorSubject<any>;
    session: any;
    tenantDefApiResponse: TenantApiResponse;
    userTypeApiResponse: UserTypeApiResponse;
    sessionStatusApiResponse: SessionStatusApiResponse;

    constructor(private http: HttpClient) {
        this.onSessionsChanged = new BehaviorSubject({});
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
                    `${environment.apiUrl}/core/coreapi/v1.0/Session/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantDefApiResponse = response;
                    this.onSessionsChanged.next(this.tenantDefApiResponse);
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
                    `${environment.apiUrl}/core/coreapi/v1.0/Session/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeApiResponse = response;
                    this.onSessionsChanged.next(this.userTypeApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSessionStatus
     *
     * @returns {Promise<any>}
     */
    GetSessionStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SessionStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Session/GetSessionStatus`
                )
                .subscribe((response: SessionStatusApiResponse) => {
                    this.sessionStatusApiResponse = response;
                    this.onSessionsChanged.next(this.sessionStatusApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
