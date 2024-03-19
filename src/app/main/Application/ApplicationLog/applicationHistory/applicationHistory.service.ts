import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ResourceGroupEntity } from "app/ui/resourceGroups";
import { LogEntity } from "app/ui/applicationLog";

@Injectable()
export class ApplicationLogHistoryService implements Resolve<any> {
    routeParams: any;
    onApplicationLogHistoryChanged: BehaviorSubject<any>;
    applicationlog: any;
    logList: LogEntity[];
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApplicationLogHistoryChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApplicationLogHistory()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetResource
     *
     * @returns {Promise<any>}
     */
    GetApplicationHistory(): Promise<any> {
        return this.applicationlog.LogList;
    }

    /**
     * GetApplicationLogHistory
     *
     * @returns {Promise<any>}
     */
    GetApplicationLogHistory(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onApplicationLogHistoryChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ApplicationLog/GetApplicationLogHistory?applicationLastLogId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.applicationlog = response.ApplicationLastLog;
                        this.logList = response.LogList;
                        this.applicationlog.LogList = this.logList;
                        this.onApplicationLogHistoryChanged.next(
                            this.applicationlog
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
