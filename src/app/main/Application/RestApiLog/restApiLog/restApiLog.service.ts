import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { RestApiLogEntity } from "app/ui/restApiLog";

@Injectable()
export class RestApiLogService implements Resolve<any> {
    routeParams: any;
    onRestApiLogChanged: BehaviorSubject<any>;
    restApiLog: any;
    restApiLogList: RestApiLogEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onRestApiLogChanged = new BehaviorSubject({});
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
            Promise.all([this.GetRestApiLog()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetRestApiLog
     *
     * @returns {Promise<any>}
     */
    GetRestApiLog(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onRestApiLogChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/RestApiLog/GetRestApiLog?restApiLogId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.restApiLog = response.RestApiLog;
                        this.onRestApiLogChanged.next(this.restApiLog);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
