import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SchedulerInstantJobProfileApiResponse } from "app/ui/schedulerInstantJobProfile";

@Injectable()
export class SearchSchedulerInstantJobProfilesService implements Resolve<any> {
    schedulerInstantJobProfileApiResponse: SchedulerInstantJobProfileApiResponse;
    routeParams: any;
    schedulerInstant: any;
    onSearchSchedulerInstantJobProfilesChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSchedulerInstantJobProfilesChanged = new BehaviorSubject(
            {}
        );
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
                this.FillSearchSchedulerInstantJobProfilesTable(
                    this.schedulerInstant
                ),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchSchedulerInstantJobProfilesTable(schedulerInstant): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.schedulerInstantJobProfileApiResponse == undefined) {
                this.schedulerInstantJobProfileApiResponse =
                    new SchedulerInstantJobProfileApiResponse();
                this.schedulerInstantJobProfileApiResponse.IsSucceeded = true;
                this.schedulerInstantJobProfileApiResponse.SchedulerInstantJobProfileList =
                    [];
            }
            this.onSearchSchedulerInstantJobProfilesChanged.next(
                this.schedulerInstantJobProfileApiResponse
            );
            resolve(this.schedulerInstantJobProfileApiResponse);
        });
    }

    /**
     * SearchSchedulerInstantJobProfile
     *
     * @returns {Promise<any>}
     */
    SearchSchedulerInstantJobProfile(schedulerInstant): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerInstantJobProfile/SearchSchedulerInstantJobProfile`,
                    {
                        TenantId: schedulerInstant.TenantId,
                        ApplicationName: schedulerInstant.ApplicationName,
                        ProfileCode: schedulerInstant.ProfileCode,
                        ServerCode: schedulerInstant.ServerCode,
                        Description: schedulerInstant.Description,
                        SchedulerJobTypeId: schedulerInstant.SchedulerJobTypeId,
                        SearchStartDate: schedulerInstant.SearchStartDate,
                        SearchEndDate: schedulerInstant.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.schedulerInstantJobProfileApiResponse = response;
                    this.onSearchSchedulerInstantJobProfilesChanged.next(
                        this.schedulerInstantJobProfileApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSchedulerInstantJobProfile
     *
     * @param schedulerInstant
     * @returns {Promise<any>}
     */
    DeleteSchedulerInstantJobProfile(schedulerInstant): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerInstantJobProfile/DeleteSchedulerInstantJobProfile?instantJobProfileId=` +
                        schedulerInstant.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
