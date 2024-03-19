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
export class WebHookMonitoringService implements Resolve<any> {
    routeParams: any;
    onWebHookMonitoringChanged: BehaviorSubject<any>;
    webHookMonitoring: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onWebHookMonitoringChanged = new BehaviorSubject({});
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
            Promise.all([this.GetWebHookMonitoring()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetWebHookMonitoring
     *
     * @returns {Promise<any>}
     */
    GetWebHookMonitoring(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onWebHookMonitoringChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/GetWebHookMonitoring?webHookMonitoringId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.webHookMonitoring = response.WebHookQueue;
                        this.onWebHookMonitoringChanged.next(
                            this.webHookMonitoring
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateWebHookMonitoring
     *
     * @param webHookMonitoring
     * @returns {Promise<any>}
     */
    CreateWebHookMonitoring(webHookMonitoring): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/CreateWebHookMonitoring`,
                    {
                        CompanyId: webHookMonitoring.CompanyId,
                        TenantId: webHookMonitoring.TenantId,
                        WebHookProfileId: webHookMonitoring.WebHookProfileId,
                        WebHookTypeId: webHookMonitoring.WebHookTypeId,
                        RunStatusId: webHookMonitoring.RunStatusId,
                        HttpStatusCode: webHookMonitoring.HttpStatusCode,
                        RetryCount: webHookMonitoring.RetryCount,
                        ApplicationId: webHookMonitoring.ApplicationId,
                        MachineName: webHookMonitoring.MachineName,
                        HttpPostUrl: webHookMonitoring.HttpPostUrl,
                        ResultMessage: webHookMonitoring.ResultMessage,
                        RecordType: webHookMonitoring.RecordType,
                        ReferenceNumberType:
                            webHookMonitoring.ReferenceNumberType,
                        ReferenceNumber: webHookMonitoring.ReferenceNumber,
                        WebHookPayLoad: webHookMonitoring.WebHookPayLoad,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateWebHookMonitoring
     *
     * @param webHookMonitoring
     * @returns {Promise<any>}
     */
    UpdateWebHookMonitoring(webHookMonitoring): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookMonitoring/UpdateWebHookMonitoring`,
                    {
                        Id: webHookMonitoring.Id,
                        CompanyId: webHookMonitoring.CompanyId,
                        TenantId: webHookMonitoring.TenantId,
                        WebHookProfileId: webHookMonitoring.WebHookProfileId,
                        WebHookTypeId: webHookMonitoring.WebHookTypeId,
                        RunStatusId: webHookMonitoring.RunStatusId,
                        HttpStatusCode: webHookMonitoring.HttpStatusCode,
                        RetryCount: webHookMonitoring.RetryCount,
                        ApplicationId: webHookMonitoring.ApplicationId,
                        MachineName: webHookMonitoring.MachineName,
                        HttpPostUrl: webHookMonitoring.HttpPostUrl,
                        ResultMessage: webHookMonitoring.ResultMessage,
                        RecordType: webHookMonitoring.RecordType,
                        ReferenceNumberType:
                            webHookMonitoring.ReferenceNumberType,
                        ReferenceNumber: webHookMonitoring.ReferenceNumber,
                        WebHookPayLoad: webHookMonitoring.WebHookPayLoad,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
