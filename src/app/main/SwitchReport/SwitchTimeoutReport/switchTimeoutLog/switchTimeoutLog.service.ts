import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SwitchTimeoutLogApiResponse } from "app/ui/switchReport";

@Injectable()
export class SwitchTimeoutLogService implements Resolve<any> {
    routeParams: any;
    onSwitchTimeoutLogChanged: BehaviorSubject<any>;
    switchTimeout: any;
    switchTimeoutLogApiResponse: SwitchTimeoutLogApiResponse;
    messageParseDetail: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSwitchTimeoutLogChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchTimeoutLog()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchTimeoutLog
     *
     * @returns {Promise<any>}
     */
    GetSwitchTimeoutLog(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSwitchTimeoutLogChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/GetSwitchTimeoutLog?switchTimeoutLogId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.switchTimeout = response.SwitchLog;
                        this.messageParseDetail = response.MessageParseDetail;
                        this.onSwitchTimeoutLogChanged.next(this.switchTimeout);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
