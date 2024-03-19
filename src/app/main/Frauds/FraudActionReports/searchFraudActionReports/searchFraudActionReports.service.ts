import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { FraudActionReportApiResponse } from "app/ui/fraudActionReport";

@Injectable()
export class SearchFraudActionReportsService implements Resolve<any> {
    fraudActionReportApiResponse: FraudActionReportApiResponse;
    routeParams: any;
    fraudRule: any;
    onFraudActionReportsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
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
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.FillSearchFraudActionReportsTable(this.fraudRule),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillSearchFraudActionReportsTable(fraudAction): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.fraudActionReportApiResponse == undefined) {
                this.fraudActionReportApiResponse =
                    new FraudActionReportApiResponse();
                this.fraudActionReportApiResponse.IsSucceeded = true;
                this.fraudActionReportApiResponse.FraudActionList = [];
            }
            this.onFraudActionReportsChanged.next(
                this.fraudActionReportApiResponse
            );
            resolve(this.fraudActionReportApiResponse);
        });
    }

    /**
     * SearchFraudAction
     *
     * @returns {Promise<any>}
     */
    SearchFraudActionReport(fraudAction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudActionReport/SearchFraudActionReport`,
                    {
                        TenantId: fraudAction.TenantId,
                        FraudRuleActionTypeId:
                            fraudAction.FraudRuleActionTypeId,
                        CompanyId: fraudAction.CompanyId,
                        ApplicationTypeId: fraudAction.ApplicationTypeId,
                        FraudRuleActionStatusId:
                            fraudAction.FraudRuleActionStatusId,
                        SearchStartDate: fraudAction.SearchStartDate,
                        SearchEndDate: fraudAction.SearchEndDate,
                        ReferenceNumber: fraudAction.ReferenceNumber,
                    }
                )
                .subscribe((response: any) => {
                    this.fraudActionReportApiResponse = response;
                    this.onFraudActionReportsChanged.next(
                        this.fraudActionReportApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
