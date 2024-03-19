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
export class FraudGroupDefinitionService implements Resolve<any> {
    routeParams: any;
    onFraudGroupDefinitionChanged: BehaviorSubject<any>;
    fraudGroup: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onFraudGroupDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetFraudGroupDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetFraudGroupDefinition
     *
     * @returns {Promise<any>}
     */
    GetFraudGroupDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onFraudGroupDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/FraudGroupDefinition/GetFraudGroupDefinition?fraudGroupId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.fraudGroup = response.FraudGroupDefinition;
                        this.onFraudGroupDefinitionChanged.next(
                            this.fraudGroup
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateFraudGroupDefinition
     *
     * @param fraudGroup
     * @returns {Promise<any>}
     */
    UpdateFraudGroupDefinition(fraudGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudGroupDefinition/UpdateFraudGroupDefinition`,
                    {
                        Id: fraudGroup.Id,
                        IsBuiltInDefinition: fraudGroup.IsBuiltInDefinition,
                        Description: fraudGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateFraudGroupDefinition
     *
     * @param fraudGroup
     * @returns {Promise<any>}
     */
    CreateFraudGroupDefinition(fraudGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudGroupDefinition/CreateFraudGroupDefinition`,
                    {
                        IsBuiltInDefinition: fraudGroup.IsBuiltInDefinition,
                        Description: fraudGroup.Description,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
