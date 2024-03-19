import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";

import {
    SwitchApplicationSessionApiResponse,
    SwitchApplicationsApiResponse,
    SwitchTimeoutLogApiResponse,
} from "app/ui/switchReport";

@Injectable()
export class SearchSwitchTimeoutLogService implements Resolve<any> {
    switchTimeoutLogApiResponse: SwitchTimeoutLogApiResponse;
    switchApplicationSessionApiResponse: SwitchApplicationSessionApiResponse;
    switchApplicationsApiResponse: SwitchApplicationsApiResponse;
    routeParams: any;
    switchTimeout: any;
    onSearchSwitchTimeoutLogChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSwitchTimeoutLogChanged = new BehaviorSubject({});
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
                this.FillSwitchTimeoutLogTable(this.switchTimeout),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSwitchTimeoutLogTable(switchTimeout): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.switchTimeoutLogApiResponse == undefined) {
                this.switchTimeoutLogApiResponse =
                    new SwitchTimeoutLogApiResponse();
                this.switchTimeoutLogApiResponse.IsSucceeded = true;
                this.switchTimeoutLogApiResponse.SwitchLogList = [];
            }
            this.onSearchSwitchTimeoutLogChanged.next(
                this.switchTimeoutLogApiResponse
            );
            resolve(this.switchTimeoutLogApiResponse);
        });
    }
    /**
     * SearchSwitchTimeoutLog
     *
     * @returns {Promise<any>}
     */
    SearchSwitchTimeoutLog(switchTimeout): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/SearchSwitchTimeoutLog`,
                    {
                        ApplicationType: switchTimeout.ApplicationType,
                        ApplicationId: switchTimeout.ApplicationId,
                        SessionId: switchTimeout.SessionId,
                        ServerName: switchTimeout.ServerName,
                        RemoteIpAddress: switchTimeout.RemoteIpAddress,
                        RemotePort: switchTimeout.RemotePort,
                        LocalIpAddress: switchTimeout.LocalIpAddress,
                        LocalPort: switchTimeout.LocalPort,
                        SearchStartDate: switchTimeout.SearchStartDate,
                        SearchEndDate: switchTimeout.SearchEndDate,
                        SearchStartTime: switchTimeout.SearchStartTime,
                        SearchEndTime: switchTimeout.SearchEndTime,
                        CardTokenNumber: switchTimeout.CardTokenNumber,
                        MerchantCode: switchTimeout.MerchantCode,
                        TerminalId: switchTimeout.TerminalId,
                        Mti: switchTimeout.Mti,
                        Rrn: switchTimeout.Rrn,
                        AuthorizationCode: switchTimeout.AuthorizationCode,
                    }
                )
                .subscribe((response: any) => {
                    this.switchTimeoutLogApiResponse = response;
                    this.onSearchSwitchTimeoutLogChanged.next(
                        this.switchTimeoutLogApiResponse
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
                    this.onSearchSwitchTimeoutLogChanged.next(
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
                    this.onSearchSwitchTimeoutLogChanged.next(
                        this.switchApplicationSessionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchSwitchTimeoutLogDataSource() {
        if (this.switchTimeoutLogApiResponse != undefined) {
            this.switchTimeoutLogApiResponse.SwitchLogList = [];
        }
    }
}
