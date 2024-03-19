import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable()
export class FraudActionReportService implements Resolve<any> {
    routeParams: any;
    onFraudActionReportChanged: BehaviorSubject<any>;
    fraudAction: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onFraudActionReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetFraudActionReport()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetFraudAction
     *
     * @returns {Promise<any>}
     */
    GetFraudActionReport(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onFraudActionReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/FraudActionReport/GetFraudActionReport?fraudActionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.fraudAction = response.FraudAction;
                        this.onFraudActionReportChanged.next(this.fraudAction);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateFraudActionReport
     *
     * @param fraudAction
     * @returns {Promise<any>}
     */
    UpdateFraudActionReport(fraudAction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudActionReport/UpdateFraudActionReport`,
                    {
                        Id: fraudAction.Id,
                        FraudRuleActionStatusId:
                            fraudAction.FraudRuleActionStatusId,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
