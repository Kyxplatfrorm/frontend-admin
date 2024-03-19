import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    SwitchCardNetworkApiResponse,
    SwitchNetworkMessageTypeApiResponse,
} from "app/ui/switchMessageProfiles";

@Injectable({ providedIn: "root" })
export class SwitchCardNetworksService {
    switchCardNetworkApiResponse: SwitchCardNetworkApiResponse;
    switchNetworkMessageTypeApiResponse: SwitchNetworkMessageTypeApiResponse;
    onSwitchCardNetworksChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSwitchCardNetworksChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchCardNetworks()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchCardNetworks
     *
     * @returns {Promise<any>}
     */
    GetSwitchCardNetworks(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchCardNetworkApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchMessageProfile/GetSwitchCardNetworks`
                )
                .subscribe((response: SwitchCardNetworkApiResponse) => {
                    this.switchCardNetworkApiResponse = response;
                    this.onSwitchCardNetworksChanged.next(
                        this.switchCardNetworkApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchNetworkMessageTypes
     *
     * @returns {Promise<any>}
     */
    GetSwitchNetworkMessageTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchNetworkMessageTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchMessageProfile/GetSwitchNetworkMessageTypes`
                )
                .subscribe((response: SwitchNetworkMessageTypeApiResponse) => {
                    this.switchNetworkMessageTypeApiResponse = response;
                    this.onSwitchCardNetworksChanged.next(
                        this.switchNetworkMessageTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
