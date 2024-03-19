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
export class HsmTransactionReportService implements Resolve<any> {
    routeParams: any;
    onHsmTransactionReportChanged: BehaviorSubject<any>;
    hsmTransaction: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onHsmTransactionReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetHsmTransaction()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetHsmTransaction
     *
     * @returns {Promise<any>}
     */
    GetHsmTransaction(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onHsmTransactionReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/HsmTransaction/GetHsmTransaction?hsmTransactionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.hsmTransaction = response.HsmTransaction;
                        this.onHsmTransactionReportChanged.next(
                            this.hsmTransaction
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
