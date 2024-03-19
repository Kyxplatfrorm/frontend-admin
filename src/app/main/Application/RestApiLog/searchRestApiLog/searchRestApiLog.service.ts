import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { RestApiLogResponse } from "app/ui/restApiLog";

@Injectable()
export class SearchRestApiLogService implements Resolve<any> {
    restApiLogResponse: RestApiLogResponse;
    routeParams: any;
    restApiLog: any;
    onSearchRestApiLogChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchRestApiLogChanged = new BehaviorSubject({});
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
            Promise.all([this.FillRestApiTable(this.restApiLog)]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillRestApiTable(restApiLog): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.restApiLogResponse == undefined) {
                this.restApiLogResponse = new RestApiLogResponse();
                this.restApiLogResponse.IsSucceeded = true;
                this.restApiLogResponse.RestApiLogList = [];
            }
            this.onSearchRestApiLogChanged.next(this.restApiLogResponse);
            resolve(this.restApiLogResponse);
        });
    }
    /**
     * SearchRestApiLog
     *
     * @returns {Promise<any>}
     */
    SearchRestApiLog(restApiLog): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/RestApiLog/SearchRestApiLog`,
                    {
                        UserName: restApiLog.UserName,
                        UserTypeId: restApiLog.UserTypeId,
                        ServerName: restApiLog.ServerName,
                        ServerType: restApiLog.ServerType,
                        HttpMethodId: restApiLog.HttpMethodId,
                        ApiName: restApiLog.ApiName,
                        ApiStatus: restApiLog.ApiStatus,
                        TotalElapsed: restApiLog.TotalElapsed,
                        HttpResponseCode: restApiLog.HttpResponseCode,
                        ApiReferenceNumber: restApiLog.ApiReferenceNumber,
                        SearchStartDate: restApiLog.SearchStartDate,
                        SearchEndDate: restApiLog.SearchEndDate,
                        SearchStartTime: restApiLog.SearchStartTime,
                        SearchEndTime: restApiLog.SearchEndTime,
                        TenantId: restApiLog.TenantId,
                        ClientIp: restApiLog.ClientIp,
                        ApiRunStatusId: restApiLog.ApiRunStatusId,
                        ControllerName: restApiLog.ControllerName,
                    }
                )
                .subscribe((response: any) => {
                    this.restApiLogResponse = response;
                    this.onSearchRestApiLogChanged.next(
                        this.restApiLogResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
