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
    SwitchMessageLogApiResponse,
} from "app/ui/switchReport";

@Injectable()
export class SearchSwitchMessageLogService implements Resolve<any> {
    switchMessageLogApiResponse: SwitchMessageLogApiResponse;
    switchApplicationSessionApiResponse: SwitchApplicationSessionApiResponse;
    switchApplicationsApiResponse: SwitchApplicationsApiResponse;
    routeParams: any;
    switchMessage: any;
    onSearchSwitchMessageLogChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSwitchMessageLogChanged = new BehaviorSubject({});
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
                this.FillSwitchMessageLogTable(this.switchMessage),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSwitchMessageLogTable(switchMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.switchMessageLogApiResponse == undefined) {
                this.switchMessageLogApiResponse =
                    new SwitchMessageLogApiResponse();
                this.switchMessageLogApiResponse.IsSucceeded = true;
                this.switchMessageLogApiResponse.SwitchLogList = [];
            }
            this.onSearchSwitchMessageLogChanged.next(
                this.switchMessageLogApiResponse
            );
            resolve(this.switchMessageLogApiResponse);
        });
    }
    /**
     * SearchSwitchMessageLog
     *
     * @returns {Promise<any>}
     */
    SearchSwitchMessageLog(switchMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/SearchSwitchMessageLog`,
                    {
                        ApplicationType: switchMessage.ApplicationType,
                        ApplicationId: switchMessage.ApplicationId,
                        SessionId: switchMessage.SessionId,
                        ServerName: switchMessage.ServerName,
                        RemoteIpAddress: switchMessage.RemoteIpAddress,
                        RemotePort: switchMessage.RemotePort,
                        LocalIpAddress: switchMessage.LocalIpAddress,
                        LocalPort: switchMessage.LocalPort,
                        SearchStartDate: switchMessage.SearchStartDate,
                        SearchEndDate: switchMessage.SearchEndDate,
                        SearchStartTime: switchMessage.SearchStartTime,
                        SearchEndTime: switchMessage.SearchEndTime,
                        CardTokenNumber: switchMessage.CardTokenNumber,
                        MerchantCode: switchMessage.MerchantCode,
                        TerminalId: switchMessage.TerminalId,
                        Mti: switchMessage.Mti,
                        Rrn: switchMessage.Rrn,
                        AuthorizationCode: switchMessage.AuthorizationCode,
                    }
                )
                .subscribe((response: any) => {
                    this.switchMessageLogApiResponse = response;
                    this.onSearchSwitchMessageLogChanged.next(
                        this.switchMessageLogApiResponse
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
                    this.onSearchSwitchMessageLogChanged.next(
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
                    this.onSearchSwitchMessageLogChanged.next(
                        this.switchApplicationSessionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchSwitchMessageLogDataSource() {
        if (this.switchMessageLogApiResponse != undefined) {
            this.switchMessageLogApiResponse.SwitchLogList = [];
        }
    }
}
