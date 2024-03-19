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
export class SwitchParseErrorLogService implements Resolve<any> {
    routeParams: any;
    onSwitchParseErrorLogChanged: BehaviorSubject<any>;
    switchParseError: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSwitchParseErrorLogChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchParseErrorLog()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchParseErrorLog
     *
     * @returns {Promise<any>}
     */
    GetSwitchParseErrorLog(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSwitchParseErrorLogChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchReport/GetSwitchParseErrorLog?switchParseErrorLogId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.switchParseError = response.SwitchLog;
                        this.onSwitchParseErrorLogChanged.next(
                            this.switchParseError
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
