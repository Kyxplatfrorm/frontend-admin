import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    ApplicationTypeApiResponse,
    TenantApiResponse,
} from "app/ui/urlDefinition";

@Injectable({ providedIn: "root" })
export class ApplicationUrlDefinitionsService {
    applicationTypeApiResponse: ApplicationTypeApiResponse;
    tenantApiResponse: TenantApiResponse;
    onApplicationUrlDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onApplicationUrlDefinitionsChanged = new BehaviorSubject({});
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationUrlDefinition/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onApplicationUrlDefinitionsChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetApplicationTypes
     *
     * @returns {Promise<any>}
     */
    GetApplicationTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationUrlDefinition/GetApplicationTypes`
                )
                .subscribe((response: ApplicationTypeApiResponse) => {
                    this.applicationTypeApiResponse = response;
                    this.onApplicationUrlDefinitionsChanged.next(
                        this.applicationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
