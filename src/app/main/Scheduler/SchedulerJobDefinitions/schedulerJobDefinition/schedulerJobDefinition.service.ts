import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SchedulerJobDetailEntity } from "app/ui/schedulerJobDefinition";

@Injectable()
export class SchedulerJobDefinitionService implements Resolve<any> {
    routeParams: any;
    onSchedulerJobDefinitionChanged: BehaviorSubject<any>;
    schedulerJob: any;
    schedulerJobDetailList: SchedulerJobDetailEntity[];
    selectedId: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSchedulerJobDefinitionChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;
        this.selectedId = this.routeParams.id;

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetSchedulerJobDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSchedulerJobDefinition
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSchedulerJobDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/GetSchedulerJobDefinition?schedulerJobDefinitionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.schedulerJob = response.SchedulerJobDefinition;
                        if (response.SchedulerJobDetail) {
                            this.schedulerJobDetailList =
                                response.SchedulerJobDetail;
                            this.schedulerJob.SchedulerJobDetail =
                                this.schedulerJobDetailList;
                        }
                        this.onSchedulerJobDefinitionChanged.next(
                            this.schedulerJob
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateSchedulerJobDefinition
     *
     * @param schedulerJob
     * @returns {Promise<any>}
     */
    CreateSchedulerJobDefinition(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/CreateSchedulerJobDefinition`,
                    {
                        IsTenantBasedJob: schedulerJob.IsTenantBasedJob,
                        IsActive: schedulerJob.IsActive,
                        ServerCode: schedulerJob.ServerCode,
                        TenantId: schedulerJob.TenantId,
                        Description: schedulerJob.Description,
                        StartDateTime: schedulerJob.StartDateTime,
                        EndDateTime: schedulerJob.EndDateTime,
                        StartTime: schedulerJob.StartTime,
                        EndTime: schedulerJob.EndTime,
                        RecurringTypeId: schedulerJob.RecurringTypeId,
                        RecurringLevelId: schedulerJob.RecurringLevelId,
                        RecurringEvery: schedulerJob.RecurringEvery,
                        RecurringWeekDayList: schedulerJob.RecurringWeekDayList,
                        RecurringDailyTimes: schedulerJob.RecurringDailyTimes,
                        RunIfFails: schedulerJob.RunIfFails,
                        EstimatedExecutionTime:
                            schedulerJob.EstimatedExecutionTime,
                        HasMultiStep: schedulerJob.HasMultiStep,
                        LastRunStatusId: schedulerJob.LastRunStatusId,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateSchedulerJobDefinitionDetail
     *
     * @param schedulerJob
     * @returns {Promise<any>}
     */
    CreateSchedulerJobDefinitionDetail(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/CreateSchedulerJobDefinitionDetail`,
                    {
                        IsActive: schedulerJob.IsActive,
                        SchedulerJobId: schedulerJob.SchedulerJobId,
                        OrderId: schedulerJob.OrderId,
                        Description: schedulerJob.Description,
                        SchedulerJobTypeId: schedulerJob.SchedulerJobTypeId,
                        ApplicationPath: schedulerJob.ApplicationPath,
                        ApplicationName: schedulerJob.ApplicationName,
                        ApplicationParameter: schedulerJob.ApplicationParameter,
                        FullClassName: schedulerJob.FullClassName,
                        MethodName: schedulerJob.MethodName,
                        ProcedureName: schedulerJob.ProcedureName,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSchedulerJobDefinition
     *
     * @param schedulerJob
     * @returns {Promise<any>}
     */
    UpdateSchedulerJobDefinition(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/UpdateSchedulerJobDefinition`,
                    {
                        Id: schedulerJob.Id,
                        IsTenantBasedJob: schedulerJob.IsTenantBasedJob,
                        IsActive: schedulerJob.IsActive,
                        TenantId: schedulerJob.TenantId,
                        ServerCode: schedulerJob.ServerCode,
                        Description: schedulerJob.Description,
                        StartTime: schedulerJob.StartTime,
                        EndTime: schedulerJob.EndTime,
                        RecurringTypeId: schedulerJob.RecurringTypeId,
                        RecurringLevelId: schedulerJob.RecurringLevelId,
                        RecurringEvery: schedulerJob.RecurringEvery,
                        RecurringWeekDayList: schedulerJob.RecurringWeekDayList,
                        RecurringDailyTimes: schedulerJob.RecurringDailyTimes,
                        RunIfFails: schedulerJob.RunIfFails,
                        EstimatedExecutionTime:
                            schedulerJob.EstimatedExecutionTime,
                        HasMultiStep: schedulerJob.HasMultiStep,
                        LastRunStatusId: schedulerJob.LastRunStatusId,
                        StartDateTime: schedulerJob.StartDateTime,
                        EndDateTime: schedulerJob.EndDateTime,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSchedulerJobDefinitionDetail
     *
     * @param schedulerJob
     * @returns {Promise<any>}
     */
    UpdateSchedulerJobDefinitionDetail(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/UpdateSchedulerJobDefinitionDetail`,
                    {
                        Id: schedulerJob.Id,
                        TenantId: schedulerJob.TenantId,
                        IsTenantBasedJob: schedulerJob.IsTenantBasedJob,
                        IsActive: schedulerJob.IsActive,
                        OrderId: schedulerJob.OrderId,
                        Description: schedulerJob.Description,
                        SchedulerJobTypeId: schedulerJob.SchedulerJobTypeId,
                        ApplicationPath: schedulerJob.ApplicationPath,
                        ApplicationName: schedulerJob.ApplicationName,
                        ApplicationParameter: schedulerJob.ApplicationParameter,
                        FullClassName: schedulerJob.FullClassName,
                        MethodName: schedulerJob.MethodName,
                        ProcedureName: schedulerJob.ProcedureName,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSchedulerJobDefinitionDetail
     *
     * @param schedulerJob
     * @returns {Promise<any>}
     */
    DeleteSchedulerJobDefinitionDetail(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/DeleteSchedulerJobDefinitionDetail?deleteSchedulerJobDefinitionDetailId=` +
                        schedulerJob.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
