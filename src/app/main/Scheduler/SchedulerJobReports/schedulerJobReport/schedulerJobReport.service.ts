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
export class SchedulerJobReportService implements Resolve<any> {
    routeParams: any;
    onSchedulerJobReportChanged: BehaviorSubject<any>;
    schedulerJobReport: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSchedulerJobReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSchedulerJobReport()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSchedulerJobReport
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobReport(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSchedulerJobReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobReport/GetSchedulerJobReport?schedulerJobReportId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.schedulerJobReport =
                            response.SchedulerJobReport;
                        this.onSchedulerJobReportChanged.next(
                            this.schedulerJobReport
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
