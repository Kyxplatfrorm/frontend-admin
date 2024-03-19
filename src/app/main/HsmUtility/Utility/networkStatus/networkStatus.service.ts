import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { NetworkStatusApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class NetworkStatusService {
    networkStatusApiResponse: NetworkStatusApiResponse;
    onNetworkStatusChanged: BehaviorSubject<any>;
    networkStatus: any;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onNetworkStatusChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * NetworkStatus
     *
     * @param networkStatus
     * @returns {Promise<any>}
     */
    NetworkStatus(networkStatus): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/NetworkStatus`,

                    {
                        LmkType: networkStatus.LmkType,
                    }
                )
                .subscribe((response: any) => {
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.networkStatus = resolve(response);
                }, reject);
        });
    }
}
