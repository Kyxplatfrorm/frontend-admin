import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SchedulerJobDefinitionApiResponse } from "app/ui/schedulerJobDefinition";

@Injectable()
export class SearchSchedulerJobDefinitionService implements Resolve<any> {
    schedulerJobDefinitionApiResponse: SchedulerJobDefinitionApiResponse;
    routeParams: any;
    schedulerJob: any;
    onSchedulerJobDefinitionChanged: BehaviorSubject<any>;

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

        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.FillSearchSchedulerJobDefinitionTable(this.schedulerJob),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchSchedulerJobDefinitionTable(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.schedulerJobDefinitionApiResponse == undefined) {
                this.schedulerJobDefinitionApiResponse =
                    new SchedulerJobDefinitionApiResponse();
                this.schedulerJobDefinitionApiResponse.IsSucceeded = true;
                this.schedulerJobDefinitionApiResponse.SchedulerJobDefinitionList =
                    [];
            }
            this.onSchedulerJobDefinitionChanged.next(
                this.schedulerJobDefinitionApiResponse
            );
            resolve(this.schedulerJobDefinitionApiResponse);
        });
    }

    /**
     * SearchSchedulerJobDefinition
     *
     * @returns {Promise<any>}
     */
    SearchSchedulerJobDefinition(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/SearchSchedulerJobDefinition`,
                    {
                        ServerCode: schedulerJob.ServerCode,
                        TenantId: schedulerJob.TenantId,
                        RecurringTypeId: schedulerJob.RecurringTypeId,
                        RecurringLevelId: schedulerJob.RecurringLevelId,
                        LastRunStatusId: schedulerJob.LastRunStatusId,
                        SearchStartDate: schedulerJob.SearchStartDate,
                        SearchEndDate: schedulerJob.SearchEndDate,
                        SearchStartTime: schedulerJob.SearchStartTime,
                        SearchEndTime: schedulerJob.SearchEndTime,
                        Description: schedulerJob.Description,
                    }
                )
                .subscribe((response: any) => {
                    this.schedulerJobDefinitionApiResponse = response;
                    this.onSchedulerJobDefinitionChanged.next(
                        this.schedulerJobDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSchedulerJobDefinition
     *
     * @param schedulerJob
     * @returns {Promise<any>}
     */
    DeleteSchedulerJobDefinition(schedulerJob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobDefinition/DeleteSchedulerJobDefinition?deleteSchedulerJobDefinitionId=` +
                        schedulerJob.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
