import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ResourceEntity } from "app/ui/errorDefinitions";

@Injectable()
export class ResourceDefinitionService implements Resolve<any> {
    resourceparameters: ResourceEntity;
    routeParams: any;
    onErrorResourceChanged: BehaviorSubject<any>;
    resource: any;
    resourceList: ResourceEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onErrorResourceChanged = new BehaviorSubject({});
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
            Promise.all([this.getErrorDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getResourceDefinition
     *
     * @returns {Promise<any>}
     */
    getResourceDefinition(): Promise<any> {
        return this.resource.ResourceList;
    }

    /**
     * getErrorDefinition
     *
     * @returns {Promise<any>}
     */
    getErrorDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onErrorResourceChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/GetErrorDefinition?errorDefinitionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.resource = response.ErrorDefinition;
                        this.onErrorResourceChanged.next(this.resource);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * updateErrorDefinition
     *
     * @param resource
     * @returns {Promise<any>}
     */
    updateErrorDefinition(resource): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/UpdateErrorDefinition`,
                    {
                        Id: resource.Id,
                        ErrorCode: resource.ErrorCode,
                        NumericErrorCode: resource.NumericErrorCode,
                        ErrorDescription: resource.ErrorDescription,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * createErrorDefinition
     *
     * @param resource
     * @returns {Promise<any>}
     */
    createErrorDefinition(resource): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/CreateErrorDefinition`,

                    {
                        ErrorCode: resource.ErrorCode,
                        NumericErrorCode: resource.NumericErrorCode,
                        ErrorDescription: resource.ErrorDescription,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * createResourceDefinition
     *
     * @param resource
     * @returns {Promise<any>}
     */
    createResourceDefinition(resource): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/CreateResourceDefinition`,

                    {
                        ErrorId: resource.ErrorId,
                        LanguageCode: resource.LanguageCode,
                        Description: resource.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Update resource
     *
     * @param resource
     * @returns {Promise<any>}
     */
    updateResourceDefinition(resource): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/UpdateResourceDefinition`,
                    {
                        Id: resource.Id,
                        LanguageCode: resource.LanguageCode,
                        Description: resource.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete resource
     *
     * @param resource
     * @returns {Promise<any>}
     */
    deleteResourceDefinition(resource): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ErrorDefinition/DeleteResourceDefinition?deleteResourceDefinitionId=` +
                        resource.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
