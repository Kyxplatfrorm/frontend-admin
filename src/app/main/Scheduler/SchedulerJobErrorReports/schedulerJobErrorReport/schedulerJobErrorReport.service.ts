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
export class SchedulerJobErrorReportService implements Resolve<any> {
    routeParams: any;
    onSchedulerJobErrorReportChanged: BehaviorSubject<any>;
    schedulerJobErrorReport: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSchedulerJobErrorReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSchedulerJobErrorReport()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSchedulerJobErrorReport
     *
     * @returns {Promise<any>}
     */
    GetSchedulerJobErrorReport(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSchedulerJobErrorReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/SchedulerJobErrorReport/GetSchedulerJobErrorReport?schedulerJobErrorReportId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.schedulerJobErrorReport =
                            response.SchedulerJobErrorReport;
                        this.onSchedulerJobErrorReportChanged.next(
                            this.schedulerJobErrorReport
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
