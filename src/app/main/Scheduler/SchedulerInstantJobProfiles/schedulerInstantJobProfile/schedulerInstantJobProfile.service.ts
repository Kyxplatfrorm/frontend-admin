import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable()
export class SchedulerInstantJobProfileService implements Resolve<any> {
    routeParams: any;
    onSchedulerInstantJobProfileChanged: BehaviorSubject<any>;
    schedulerInstantJob: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSchedulerInstantJobProfileChanged = new BehaviorSubject({});
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

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetSchedulerInstantJobProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSchedulerInstantJobProfile
     *
     * @returns {Promise<any>}
     */
    GetSchedulerInstantJobProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSchedulerInstantJobProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/SchedulerInstantJobProfile/GetSchedulerInstantJobProfile?schedulerInstantJobProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.schedulerInstantJob =
                            response.SchedulerInstantJobProfile;
                        this.onSchedulerInstantJobProfileChanged.next(
                            this.schedulerInstantJob
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateSchedulerInstantJobProfile
     *
     * @param schedulerInstantJob
     * @returns {Promise<any>}
     */
    CreateSchedulerInstantJobProfile(schedulerInstantJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerInstantJobProfile/CreateSchedulerInstantJobProfile`,
                    {
                        TenantId: schedulerInstantJob.TenantId,
                        ProfileCode: schedulerInstantJob.ProfileCode,
                        IsTenantBasedJob: schedulerInstantJob.IsTenantBasedJob,
                        ServerCode: schedulerInstantJob.ServerCode,
                        Description: schedulerInstantJob.Description,
                        SchedulerJobTypeId:
                            schedulerInstantJob.SchedulerJobTypeId,
                        ApplicationPath: schedulerInstantJob.ApplicationPath,
                        ApplicationName: schedulerInstantJob.ApplicationName,
                        ApplicationParameter:
                            schedulerInstantJob.ApplicationParameter,
                        FullClassName: schedulerInstantJob.FullClassName,
                        MethodName: schedulerInstantJob.MethodName,
                        ProcedureName: schedulerInstantJob.ProcedureName,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSchedulerInstantJobProfile
     *
     * @param schedulerInstantJob
     * @returns {Promise<any>}
     */
    UpdateSchedulerInstantJobProfile(schedulerInstantJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerInstantJobProfile/UpdateSchedulerInstantJobProfile`,
                    {
                        Id: schedulerInstantJob.Id,
                        TenantId: schedulerInstantJob.TenantId,
                        ProfileCode: schedulerInstantJob.ProfileCode,
                        IsTenantBasedJob: schedulerInstantJob.IsTenantBasedJob,
                        ServerCode: schedulerInstantJob.ServerCode,
                        Description: schedulerInstantJob.Description,
                        SchedulerJobTypeId:
                            schedulerInstantJob.SchedulerJobTypeId,
                        ApplicationPath: schedulerInstantJob.ApplicationPath,
                        ApplicationName: schedulerInstantJob.ApplicationName,
                        ApplicationParameter:
                            schedulerInstantJob.ApplicationParameter,
                        FullClassName: schedulerInstantJob.FullClassName,
                        MethodName: schedulerInstantJob.MethodName,
                        ProcedureName: schedulerInstantJob.ProcedureName,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
