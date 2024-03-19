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
export class WebHookReportService implements Resolve<any> {
    routeParams: any;
    onWebHookReportChanged: BehaviorSubject<any>;
    webHookReport: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onWebHookReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetWebHookReport()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetWebHookReport
     *
     * @returns {Promise<any>}
     */
    GetWebHookReport(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onWebHookReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/WebHookReport/GetWebHookReport?WebHookReportId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.webHookReport = response.WebHookReport;
                        this.onWebHookReportChanged.next(this.webHookReport);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
