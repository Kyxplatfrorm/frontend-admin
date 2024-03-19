import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    RunStatusApiResponse,
    TenantApiResponse,
} from "app/ui/schedulerJobErrorReport";

@Injectable({ providedIn: "root" })
export class SchedulerJobErrorReportsService {
    tenantApiResponse: TenantApiResponse;
    runStatusApiResponse: RunStatusApiResponse;
    onSchedulerJobErrorReportsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSchedulerJobErrorReportsChanged = new BehaviorSubject({});
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
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobErrorReport/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onSchedulerJobErrorReportsChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSchedulerJobStatus
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<RunStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobErrorReport/GetSchedulerJobStatus`
                )
                .subscribe((response: RunStatusApiResponse) => {
                    this.runStatusApiResponse = response;
                    this.onSchedulerJobErrorReportsChanged.next(
                        this.runStatusApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
