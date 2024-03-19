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
export class FraudApiDefinitionService implements Resolve<any> {
    routeParams: any;
    onFraudApiDefinitionChanged: BehaviorSubject<any>;
    fraudApi: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onFraudApiDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetFraudApiDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetFraudApiDefinition
     *
     * @returns {Promise<any>}
     */
    GetFraudApiDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onFraudApiDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/FraudApiDefinition/GetFraudApiDefinition?fraudApiId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.fraudApi = response.FraudApiDefinition;
                        this.onFraudApiDefinitionChanged.next(this.fraudApi);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateFraudApiDefinition
     *
     * @param fraudApi
     * @returns {Promise<any>}
     */
    CreateFraudApiDefinition(fraudApi): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudApiDefinition/CreateFraudApiDefinition`,
                    {
                        ControllerName: fraudApi.ControllerName,
                        ActionName: fraudApi.ActionName,
                        ApplicationTypeId: fraudApi.ApplicationTypeId,
                        Description: fraudApi.Description,
                        HasFraudRule: fraudApi.HasFraudRule,
                        LogApiCallCounts: fraudApi.LogApiCallCounts,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateFraudApiDefinition
     *
     * @param applicationUrl
     * @returns {Promise<any>}
     */
    UpdateFraudApiDefinition(fraudApi): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudApiDefinition/UpdateFraudApiDefinition`,
                    {
                        Id: fraudApi.Id,
                        ControllerName: fraudApi.ControllerName,
                        ActionName: fraudApi.ActionName,
                        ApplicationTypeId: fraudApi.ApplicationTypeId,
                        Description: fraudApi.Description,
                        HasFraudRule: fraudApi.HasFraudRule,
                        LogApiCallCounts: fraudApi.LogApiCallCounts,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
