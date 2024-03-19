import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    SchedulerJobStatusApiResponse,
    SchedulerJobTypeApiResponse,
    SchedulerRecurringTypeApiResponse,
} from "app/ui/schedulerJobReport";

@Injectable({ providedIn: "root" })
export class SchedulerJobReportsService {
    schedulerJobStatusApiResponse: SchedulerJobStatusApiResponse;
    schedulerJobTypeApiResponse: SchedulerJobTypeApiResponse;
    schedulerRecurringTypeApiResponse: SchedulerRecurringTypeApiResponse;
    onSchedulerJobReportsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSchedulerJobReportsChanged = new BehaviorSubject({});
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
     * GetSchedulerJobStatus
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SchedulerJobStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobReport/GetSchedulerJobStatus`
                )
                .subscribe((response: SchedulerJobStatusApiResponse) => {
                    this.schedulerJobStatusApiResponse = response;
                    this.onSchedulerJobReportsChanged.next(
                        this.schedulerJobStatusApiResponse
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
                .get<SchedulerJobTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobReport/GetSchedulerJobTypes`
                )
                .subscribe((response: SchedulerJobTypeApiResponse) => {
                    this.schedulerJobTypeApiResponse = response;
                    this.onSchedulerJobReportsChanged.next(
                        this.schedulerJobTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSchedulerRecurringTypes
     *
     * @returns {Promise<any>}
     */
    GetSchedulerRecurringTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SchedulerRecurringTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobReport/GetSchedulerRecurringTypes`
                )
                .subscribe((response: SchedulerRecurringTypeApiResponse) => {
                    this.schedulerRecurringTypeApiResponse = response;
                    this.onSchedulerJobReportsChanged.next(
                        this.schedulerRecurringTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
