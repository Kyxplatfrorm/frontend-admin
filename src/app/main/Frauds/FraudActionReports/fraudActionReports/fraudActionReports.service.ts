import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    ApplicationTypeApiResponse,
    FraudRuleActionStatuesApiResponse,
    FraudRuleActionTypeApiResponse,
    TenantApiResponse,
} from "app/ui/fraudActionReport";

@Injectable({ providedIn: "root" })
export class FraudActionReportsService {
    applicationTypeApiResponse: ApplicationTypeApiResponse;
    fraudRuleActionTypeApiResponse: FraudRuleActionTypeApiResponse;
    fraudRuleActionStatuesApiResponse: FraudRuleActionStatuesApiResponse;
    tenantApiResponse: TenantApiResponse;
    onFraudActionReportsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onFraudActionReportsChanged = new BehaviorSubject({});
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
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApplicationTypes
     *
     * @returns {Promise<any>}
     */
    GetApplicationTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudActionReport/GetApplicationTypes`
                )
                .subscribe((response: ApplicationTypeApiResponse) => {
                    this.applicationTypeApiResponse = response;
                    this.onFraudActionReportsChanged.next(
                        this.applicationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFraudRuleActionStatues
     *
     * @returns {Promise<any>}
     */
    GetFraudRuleActionStatues(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FraudRuleActionStatuesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudActionReport/GetFraudRuleActionStatues`
                )
                .subscribe((response: FraudRuleActionStatuesApiResponse) => {
                    this.fraudRuleActionStatuesApiResponse = response;
                    this.onFraudActionReportsChanged.next(
                        this.fraudRuleActionStatuesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFraudRuleActionTypes
     *
     * @returns {Promise<any>}
     */
    GetFraudRuleActionTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FraudRuleActionTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudActionReport/GetFraudRuleActionTypes`
                )
                .subscribe((response: FraudRuleActionTypeApiResponse) => {
                    this.fraudRuleActionTypeApiResponse = response;
                    this.onFraudActionReportsChanged.next(
                        this.fraudRuleActionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTenants
     *
     * @returns {Promise<any>}
     */
    GetTenants(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TenantApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudActionReport/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onFraudActionReportsChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
