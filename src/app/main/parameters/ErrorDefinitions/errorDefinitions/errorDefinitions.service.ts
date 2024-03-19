import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import {
    ErrorDefinitionApiResponse,
    ResourceEntity,
} from "app/ui/errorDefinitions";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ErrorDefinitionsService {
    errorDefinitionsApiResponse: ErrorDefinitionApiResponse;
    onErrorDefinitionsChanged: BehaviorSubject<any>;
    resource: any;
    constructor(private http: HttpClient) {
        this.onErrorDefinitionsChanged = new BehaviorSubject({});
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
            Promise.all([this.getErrorsDefinitions()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get ErrorDefinitions
     *
     * @returns {Promise<any>}
     */
    getErrorsDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ErrorDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/GetErrorDefinitions`
                )
                .subscribe((response: ErrorDefinitionApiResponse) => {
                    this.errorDefinitionsApiResponse = response;
                    this.onErrorDefinitionsChanged.next(
                        this.errorDefinitionsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteErrorDefinitions
     *
     * @param resource
     * @returns {Promise<any>}
     */
    deleteErrorDefinition(resource): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/DeleteErrorDefinition?deleteErrorDefinitionId=` +
                        resource.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
