import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SchedulerJobReportApiResponse } from "app/ui/schedulerJobReport";

@Injectable()
export class SearchSchedulerJobReportsService implements Resolve<any> {
    schedulerJobReportApiResponse: SchedulerJobReportApiResponse;
    routeParams: any;
    schedulerJobReport: any;
    onSearchSchedulerJobReportsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSchedulerJobReportsChanged = new BehaviorSubject({});
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
                this.FillSearchSchedulerJobReportsTable(
                    this.schedulerJobReport
                ),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchSchedulerJobReportsTable(schedulerJobReport): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.schedulerJobReportApiResponse == undefined) {
                this.schedulerJobReportApiResponse =
                    new SchedulerJobReportApiResponse();
                this.schedulerJobReportApiResponse.IsSucceeded = true;
                this.schedulerJobReportApiResponse.SchedulerJobQueueList = [];
            }
            this.onSearchSchedulerJobReportsChanged.next(
                this.schedulerJobReportApiResponse
            );
            resolve(this.schedulerJobReportApiResponse);
        });
    }

    /**
     * SearchSchedulerJobReports
     *
     * @returns {Promise<any>}
     */
    SearchSchedulerJobReports(schedulerJobReport): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobReport/SearchSchedulerJobReport`,
                    {
                        TenantId: schedulerJobReport.TenantId,
                        ApplicationId: schedulerJobReport.ApplicationId,
                        TotalElapsed: schedulerJobReport.TotalElapsed,
                        SchedulerJobId: schedulerJobReport.SchedulerJobId,
                        RecurringTypeId: schedulerJobReport.RecurringTypeId,
                        RunStatusId: schedulerJobReport.RunStatusId,
                        SchedulerJobTypeId:
                            schedulerJobReport.SchedulerJobTypeId,
                        OrderId: schedulerJobReport.OrderId,
                        SearchStartDate: schedulerJobReport.SearchStartDate,
                        SearchEndDate: schedulerJobReport.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.schedulerJobReportApiResponse = response;
                    this.onSearchSchedulerJobReportsChanged.next(
                        this.schedulerJobReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
