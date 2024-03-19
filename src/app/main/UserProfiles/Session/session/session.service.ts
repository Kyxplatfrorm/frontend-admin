import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SessionEntity, SessionStatusApiResponse } from "app/ui/session";

@Injectable()
export class SessionService implements Resolve<any> {
    routeParams: any;
    onSessionChanged: BehaviorSubject<any>;
    session: any;
    sessionList: SessionEntity[];

    sessionStatusChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSessionChanged = new BehaviorSubject({});
        this.sessionStatusChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSession()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSession
     *
     * @returns {Promise<any>}
     */
    GetSession(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSessionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Session/GetSession?sessionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.session = response.UserSession;
                        this.onSessionChanged.next(this.session);
                        resolve(response);
                    }, reject);
            }
        });
    }

 
}
