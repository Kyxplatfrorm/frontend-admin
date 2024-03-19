import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    SchedulerJobTypesApiResponse,
    TenantApiResponse,
} from "app/ui/schedulerInstantJobProfile";

@Injectable({ providedIn: "root" })
export class SchedulerInstantJobProfilesService {
    tenantApiResponse: TenantApiResponse;
    schedulerJobTypesApiResponse: SchedulerJobTypesApiResponse;
    onSchedulerInstantJobProfilesChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSchedulerInstantJobProfilesChanged = new BehaviorSubject({});
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
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerInstantJobProfile/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onSchedulerInstantJobProfilesChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetSchedulerJobTypes
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SchedulerJobTypesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerInstantJobProfile/GetSchedulerJobTypes`
                )
                .subscribe((response: SchedulerJobTypesApiResponse) => {
                    this.schedulerJobTypesApiResponse = response;
                    this.onSchedulerInstantJobProfilesChanged.next(
                        this.schedulerJobTypesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
