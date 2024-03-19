import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    SwitchConnectionApiResponse,
    SwitchConnectionLogApiResponse,
} from "app/ui/switchConnection";

@Injectable({ providedIn: "root" })
export class SwitchConnectionLogService {
    switchConnectionLogApiResponse: SwitchConnectionLogApiResponse;
    onSwitchConnectionLogChanged: BehaviorSubject<any>;
    switchConnection: any;
    routeParams: any;

    constructor(private http: HttpClient) {
        this.onSwitchConnectionLogChanged = new BehaviorSubject({});
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
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchConnectionLogBySessionId
     *
     * @param switchConnection
     * @returns {Promise<any>}
     */
    GetSwitchConnectionLogBySessionId(switchConnection): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchConnection/GetSwitchConnectionLogBySessionId`,
                    {
                        ApplicationId: switchConnection.ApplicationId,
                        SessionId: switchConnection.SessionId,
                    }
                )
                .subscribe((response: any) => {
                    this.switchConnectionLogApiResponse = response;
                    this.onSwitchConnectionLogChanged.next(
                        this.switchConnectionLogApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
