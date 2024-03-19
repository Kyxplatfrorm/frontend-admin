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
import { SessionApiResponse, SessionEntity } from "app/ui/session";
import { Console } from "console";

@Injectable()
export class SearchSessionService implements Resolve<any> {
    sessionResponse: SessionApiResponse;
    routeParams: any;
    session: any;
    onSearchSessionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSessionChanged = new BehaviorSubject({});
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
            Promise.all([this.FillSessionTable(this.session)]).then(() => {
                resolve();
            }, reject);
        });
    }

    FillSessionTable(session): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.sessionResponse == undefined) {
                this.sessionResponse = new SessionApiResponse();
                this.sessionResponse.IsSucceeded = true;
                this.sessionResponse.SessionList = [];
            }
            this.onSearchSessionChanged.next(this.sessionResponse);
            resolve(this.sessionResponse);
        });
    }
    /**
     * SearchSession
     *
     * @returns {Promise<any>}
     */
    SearchSession(session): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Session/SearchSession`,

                    session
                )
                .subscribe((response: any) => {
                    this.sessionResponse = response;
                    this.onSearchSessionChanged.next(this.sessionResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSessionStatus
     *
     * @param session
     * @returns {Promise<any>}
     */
    UpdateSessionStatus(session): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Session/UpdateSessionStatus`,

                    session
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchSessionDataSource() {
        if (this.sessionResponse != undefined) {
            this.sessionResponse.SessionList = [];
        }
    }
}
