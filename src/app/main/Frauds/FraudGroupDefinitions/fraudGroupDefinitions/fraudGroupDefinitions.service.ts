import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { FraudGroupDefinitionApiResponse } from "app/ui/fraudGroupDefinition";

@Injectable({ providedIn: "root" })
export class FraudGroupDefinitionsService {
    fraudGroupDefinitionApiResponse: FraudGroupDefinitionApiResponse;
    onFraudGroupDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onFraudGroupDefinitionsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetFraudGroupDefinitions()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetFraudGroupDefinitions
     *
     * @returns {Promise<any>}
     */
    GetFraudGroupDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FraudGroupDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudGroupDefinition/GetFraudGroupDefinitions`
                )
                .subscribe((response: FraudGroupDefinitionApiResponse) => {
                    this.fraudGroupDefinitionApiResponse = response;
                    this.onFraudGroupDefinitionsChanged.next(
                        this.fraudGroupDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteFraudGroupDefinition
     *
     * @param fraudGroup
     * @returns {Promise<any>}
     */
    DeleteFraudGroupDefinition(fraudGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudGroupDefinition/DeleteFraudGroupDefinition?fraudGroupDefinitionId=` +
                        fraudGroup.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
