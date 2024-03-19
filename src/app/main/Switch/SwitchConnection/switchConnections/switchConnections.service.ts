import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    SwitchConnectionLogApiResponse,
    SwitchConnectionsApiResponse,
} from "app/ui/switchConnection";

@Injectable({ providedIn: "root" })
export class SwitchConnectionsService {
    switchConnectionsApiResponse: SwitchConnectionsApiResponse;
    onSwitchConnectionsChanged: BehaviorSubject<any>;
    switchConnection: any;

    constructor(private http: HttpClient) {
        this.onSwitchConnectionsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchApplications()]).then(() => {
                resolve();
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
                .get<SwitchConnectionsApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchConnection/GetSwitchApplications`
                )
                .subscribe((response: SwitchConnectionsApiResponse) => {
                    this.switchConnectionsApiResponse = response;
                    this.onSwitchConnectionsChanged.next(
                        this.switchConnectionsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
