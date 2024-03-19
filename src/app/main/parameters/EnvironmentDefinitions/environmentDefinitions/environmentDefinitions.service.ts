import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    EnvironmentDefinitionApiResponse,
    EnvironmentTypeApiResponse,
} from "app/ui/environmentDefinition";

@Injectable({ providedIn: "root" })
export class EnvironmentDefinitionsService {
    environmentDefinitionApiResponse: EnvironmentDefinitionApiResponse;
    environmentTypeApiResponse: EnvironmentTypeApiResponse;
    onEnvironmentDefinitionsChanged: BehaviorSubject<any>;
    environmentDefinition: any;

    constructor(private http: HttpClient) {
        this.onEnvironmentDefinitionsChanged = new BehaviorSubject({});
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
     * GetEnvironmentDefinitions
     *
     * @returns {Promise<any>}
     */
    GetEnvironmentDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<EnvironmentDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/EnvironmentDefinition/GetEnvironmentDefinitions`
                )
                .subscribe((response: EnvironmentDefinitionApiResponse) => {
                    this.environmentDefinitionApiResponse = response;
                    this.environmentDefinition = response.EnvironmentDefinition;
                    this.onEnvironmentDefinitionsChanged.next(
                        this.environmentDefinition
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetEnvironmentType
     *
     * @returns {Promise<any>}
     */
    GetEnvironmentType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<EnvironmentTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/EnvironmentDefinition/GetEnvironmentType`
                )
                .subscribe((response: EnvironmentTypeApiResponse) => {
                    this.environmentTypeApiResponse = response;
                    this.onEnvironmentDefinitionsChanged.next(
                        this.environmentTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateEnvironmentDefinition
     *
     * @param environmentDefinition
     * @returns {Promise<any>}
     */
    UpdateEnvironmentDefinition(environmentDefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/EnvironmentDefinition/UpdateEnvironmentDefinition`,
                    {
                        Id: environmentDefinition.Id,
                        EnvironmentTypeId:
                            environmentDefinition.EnvironmentTypeId,
                        IsProduction: environmentDefinition.IsProduction,
                        Description: environmentDefinition.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
