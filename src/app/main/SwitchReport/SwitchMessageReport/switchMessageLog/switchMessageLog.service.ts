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
export class SwitchMessageLogService implements Resolve<any> {
    routeParams: any;
    onSwitchMessageLogChanged: BehaviorSubject<any>;
    switchMessage: any;
    messageParseDetail: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSwitchMessageLogChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchMessageLogById()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchMessageLogById
     *
     * @returns {Promise<any>}
     */
    GetSwitchMessageLogById(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSwitchMessageLogChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/GetSwitchMessageLogById?switchMessageLogId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.switchMessage = response.SwitchLog;
                        this.messageParseDetail = response.MessageParseDetail;
                        this.onSwitchMessageLogChanged.next(this.switchMessage);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
