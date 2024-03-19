import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ApplicationLogApiResponse } from "app/ui/applicationLog";

@Injectable({ providedIn: "root" })
export class ApplicationLogService {
    applicationLogApiResponse: ApplicationLogApiResponse;
    onApplicationLogChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onApplicationLogChanged = new BehaviorSubject({});
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
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetApplicationLogs()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApplicationLogs
     *
     * @returns {Promise<any>}
     */
    GetApplicationLogs(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationLogApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationLog/GetApplicationLogs`
                )
                .subscribe((response: ApplicationLogApiResponse) => {
                    this.applicationLogApiResponse = response;
                    this.onApplicationLogChanged.next(
                        this.onApplicationLogChanged
                    );
                    resolve(response);
                }, reject);
        });
    }
}
