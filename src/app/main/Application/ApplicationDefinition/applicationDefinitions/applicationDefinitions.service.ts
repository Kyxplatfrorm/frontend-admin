import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ApplicationProfilesApiResponse } from "app/ui/applicationProfiles";
import {
    ApplicationDefinitionApiResponse,
    ApplicationTypeApiResponse,
    UserTypeApiResponse,
} from "app/ui/applicationDefinition";

@Injectable({ providedIn: "root" })
export class ApplicationDefinitionsService {
    applicationDefinitionsApiResponse: ApplicationDefinitionApiResponse;
    applicationTypeApiResponse: ApplicationTypeApiResponse;
    applicationProfilesApiResponse: ApplicationProfilesApiResponse;
    userTypeApiResponse: UserTypeApiResponse;
    onAppDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onAppDefinitionsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApplicationDefinitions()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApplicationDefinitions
     *
     * @returns {Promise<any>}
     */
    GetApplicationDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/GetApplicationDefinitions`
                )
                .subscribe((response: ApplicationDefinitionApiResponse) => {
                    this.applicationDefinitionsApiResponse = response;
                    this.onAppDefinitionsChanged.next(
                        this.applicationDefinitionsApiResponse
                    );
                    resolve(response);
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
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/GetApplicationTypes`
                )
                .subscribe((response: ApplicationTypeApiResponse) => {
                    this.applicationTypeApiResponse = response;
                    this.onAppDefinitionsChanged.next(
                        this.applicationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetUserTypes
     *
     * @returns {Promise<any>}
     */
    GetUserTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<UserTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeApiResponse = response;
                    this.onAppDefinitionsChanged.next(this.userTypeApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get AppProfiles
     *
     * @returns {Promise<any>}
     */
    GetAppProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationProfilesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/GetApplicationProfiles`
                )
                .subscribe((response: ApplicationProfilesApiResponse) => {
                    this.applicationProfilesApiResponse = response;
                    this.onAppDefinitionsChanged.next(
                        this.applicationProfilesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteApplicationDefinition
     *
     * @param aplicationdefinition
     * @returns {Promise<any>}
     */
    DeleteApplicationDefinition(aplicationdefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/DeleteApplicationDefinition?deleteApplicationDefinitionId=` +
                        aplicationdefinition.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
