import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SchedulerJobErrorReportApiResponse } from "app/ui/schedulerJobErrorReport";

@Injectable()
export class SearchSchedulerJobErrorReportsService implements Resolve<any> {
    schedulerJobErrorReportApiResponse: SchedulerJobErrorReportApiResponse;
    routeParams: any;
    schedulerJobErrorReport: any;
    onSearchSchedulerJobErrorReportsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSchedulerJobErrorReportsChanged = new BehaviorSubject({});
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
                this.FillSearchSchedulerJobErrorReportsTable(
                    this.schedulerJobErrorReport
                ),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchSchedulerJobErrorReportsTable(
        schedulerJobErrorReport
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.schedulerJobErrorReportApiResponse == undefined) {
                this.schedulerJobErrorReportApiResponse =
                    new SchedulerJobErrorReportApiResponse();
                this.schedulerJobErrorReportApiResponse.IsSucceeded = true;
                this.schedulerJobErrorReportApiResponse.SchedulerJobErrorReportList =
                    [];
            }
            this.onSearchSchedulerJobErrorReportsChanged.next(
                this.schedulerJobErrorReportApiResponse
            );
            resolve(this.schedulerJobErrorReportApiResponse);
        });
    }

    /**
     * SearchSchedulerJobErrorReport
     *
     * @returns {Promise<any>}
     */
    SearchSchedulerJobErrorReport(schedulerJobErrorReport): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobErrorReport/SearchSchedulerJobErrorReport`,
                    {
                        TenantId: schedulerJobErrorReport.TenantId,
                        ServerCode: schedulerJobErrorReport.ServerCode,
                        RunStatusId: schedulerJobErrorReport.RunStatusId,
                        ErrorMessage: schedulerJobErrorReport.ErrorMessage,
                        TotalElapsed: schedulerJobErrorReport.TotalElapsed,
                        SearchStartDate:
                            schedulerJobErrorReport.SearchStartDate,
                        SearchEndDate: schedulerJobErrorReport.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.schedulerJobErrorReportApiResponse = response;
                    this.onSearchSchedulerJobErrorReportsChanged.next(
                        this.schedulerJobErrorReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
