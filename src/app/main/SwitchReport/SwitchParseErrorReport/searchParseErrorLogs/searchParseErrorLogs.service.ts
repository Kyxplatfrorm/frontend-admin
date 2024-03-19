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
import {
    SwitchApplicationSessionApiResponse,
    SwitchApplicationsApiResponse,
    SwitchParseErrorLogApiResponse,
} from "app/ui/switchReport";

@Injectable()
export class SearchSwitchParseErrorLogsService implements Resolve<any> {
    switchParseErrorLogApiResponse: SwitchParseErrorLogApiResponse;
    switchApplicationSessionApiResponse: SwitchApplicationSessionApiResponse;
    switchApplicationsApiResponse: SwitchApplicationsApiResponse;
    routeParams: any;
    switchParseError: any;
    onSearchSwitchParseErrorLogsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSwitchParseErrorLogsChanged = new BehaviorSubject({});
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
                this.FillSwitchParseErrorLogsTable(this.switchParseError),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSwitchParseErrorLogsTable(switchParseError): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.switchParseErrorLogApiResponse == undefined) {
                this.switchParseErrorLogApiResponse =
                    new SwitchParseErrorLogApiResponse();
                this.switchParseErrorLogApiResponse.IsSucceeded = true;
                this.switchParseErrorLogApiResponse.SwitchLogList = [];
            }
            this.onSearchSwitchParseErrorLogsChanged.next(
                this.switchParseErrorLogApiResponse
            );
            resolve(this.switchParseErrorLogApiResponse);
        });
    }
    /**
     * SearchSwitchParseErrorLog
     *
     * @returns {Promise<any>}
     */
    SearchSwitchParseErrorLog(switchParseError): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/SearchSwitchParseErrorLog`,
                    {
                        ApplicationType: switchParseError.ApplicationType,
                        ApplicationId: switchParseError.ApplicationId,
                        SessionId: switchParseError.SessionId,
                        ServerName: switchParseError.ServerName,
                        RemoteIpAddress: switchParseError.RemoteIpAddress,
                        RemotePort: switchParseError.RemotePort,
                        LocalIpAddress: switchParseError.LocalIpAddress,
                        LocalPort: switchParseError.LocalPort,
                        SearchStartDate: switchParseError.SearchStartDate,
                        SearchEndDate: switchParseError.SearchEndDate,
                        SearchStartTime: switchParseError.SearchStartTime,
                        SearchEndTime: switchParseError.SearchEndTime,
                    }
                )
                .subscribe((response: any) => {
                    this.switchParseErrorLogApiResponse = response;
                    this.onSearchSwitchParseErrorLogsChanged.next(
                        this.switchParseErrorLogApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchApplications
     *
     * @returns {Promise<any>}
     */
    GetSwitchApplications(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchApplicationsApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/GetSwitchApplications`
                )
                .subscribe((response: SwitchApplicationsApiResponse) => {
                    this.switchApplicationsApiResponse = response;
                    this.onSearchSwitchParseErrorLogsChanged.next(
                        this.switchApplicationsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchApplicationSessions
     *
     * @returns {Promise<any>}
     */
    GetSwitchApplicationSessions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchApplicationSessionApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/GetSwitchApplicationSessions`
                )
                .subscribe((response: SwitchApplicationSessionApiResponse) => {
                    this.switchApplicationSessionApiResponse = response;
                    this.onSearchSwitchParseErrorLogsChanged.next(
                        this.switchApplicationSessionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchSwitchParseErrorLogDataSource() {
        if (this.switchParseErrorLogApiResponse != undefined) {
            this.switchParseErrorLogApiResponse.SwitchLogList = [];
        }
    }
}
