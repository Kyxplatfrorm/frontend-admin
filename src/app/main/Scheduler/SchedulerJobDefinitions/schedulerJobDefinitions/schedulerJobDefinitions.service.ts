import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    RecurringWeekDaysApiResponse,
    SchedulerJobDefinitionsApiResponse,
    SchedulerJobParameterTypeApiResponse,
    SchedulerJobStatusApiResponse,
    SchedulerJobTypeApiResponse,
    SchedulerRecurringLevelApiResponse,
    SchedulerRecurringTypeApiResponse,
    TenantApiResponse,
} from "app/ui/schedulerJobDefinition";

@Injectable({ providedIn: "root" })
export class SchedulerJobDefinitionsService {
    schedulerJobTypeApiResponse: SchedulerJobTypeApiResponse;
    recurringWeekDaysApiResponse: RecurringWeekDaysApiResponse;
    schedulerJobDefinitionsApiResponse: SchedulerJobDefinitionsApiResponse;
    tenantApiResponse: TenantApiResponse;
    schedulerJobParameterTypeApiResponse: SchedulerJobParameterTypeApiResponse;
    schedulerJobStatusApiResponse: SchedulerJobStatusApiResponse;
    schedulerRecurringLevelApiResponse: SchedulerRecurringLevelApiResponse;
    schedulerRecurringTypeApiResponse: SchedulerRecurringTypeApiResponse;
    onSchedulerJobDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSchedulerJobDefinitionsChanged = new BehaviorSubject({});
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
     * GetSchedulerJobDefinitions
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SchedulerJobDefinitionsApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetSchedulerJobDefinitions`
                )
                .subscribe((response: SchedulerJobDefinitionsApiResponse) => {
                    this.schedulerJobDefinitionsApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.schedulerJobDefinitionsApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetRecurringWeekDays
     *
     * @returns {Promise<any>}
     */
    GetRecurringWeekDays(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<RecurringWeekDaysApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetRecurringWeekDays`
                )
                .subscribe((response: RecurringWeekDaysApiResponse) => {
                    this.recurringWeekDaysApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.recurringWeekDaysApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetSchedulerJobTypes`
                )
                .subscribe((response: SchedulerJobTypeApiResponse) => {
                    this.schedulerJobTypeApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.schedulerJobTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSchedulerJobParameterTypes
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobParameterTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SchedulerJobParameterTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetSchedulerJobParameterTypes`
                )
                .subscribe((response: SchedulerJobParameterTypeApiResponse) => {
                    this.schedulerJobParameterTypeApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.schedulerJobParameterTypeApiResponse
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
                .get<SchedulerJobStatusApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetSchedulerJobStatus`
                )
                .subscribe((response: SchedulerJobStatusApiResponse) => {
                    this.schedulerJobStatusApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.schedulerJobStatusApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSchedulerRecurringLevels
     *
     * @returns {Promise<any>}
     */
    GetSchedulerRecurringLevels(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SchedulerRecurringLevelApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetSchedulerRecurringLevels`
                )
                .subscribe((response: SchedulerRecurringLevelApiResponse) => {
                    this.schedulerRecurringLevelApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.schedulerRecurringLevelApiResponse
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
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetSchedulerRecurringTypes`
                )
                .subscribe((response: SchedulerRecurringTypeApiResponse) => {
                    this.schedulerRecurringTypeApiResponse = response;
                    this.onSchedulerJobDefinitionsChanged.next(
                        this.schedulerRecurringTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
