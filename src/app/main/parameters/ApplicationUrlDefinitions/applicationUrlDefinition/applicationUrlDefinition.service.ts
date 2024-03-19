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
export class ApplicationUrlDefinitionService implements Resolve<any> {
    routeParams: any;
    onApplicationUrlDefinitionChanged: BehaviorSubject<any>;
    applicationUrl: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApplicationUrlDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApplicationUrlDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApplicationUrlDefinition
     *
     * @returns {Promise<any>}
     */
    GetApplicationUrlDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onApplicationUrlDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ApplicationUrlDefinition/GetApplicationUrlDefinition?applicationUrlDefinitionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.applicationUrl = response.ApplicationUrlDefinition;
                        this.onApplicationUrlDefinitionChanged.next(
                            this.applicationUrl
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateApplicationUrlDefinition
     *
     * @param applicationUrl
     * @returns {Promise<any>}
     */
    CreateApplicationUrlDefinition(applicationUrl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationUrlDefinition/CreateApplicationUrlDefinition`,
                    {
                        TenantId: applicationUrl.TenantId,
                        IsDefaultDefinition: applicationUrl.IsDefaultDefinition,
                        ApplicationTypeId: applicationUrl.ApplicationTypeId,
                        Description: applicationUrl.Description,
                        Url: applicationUrl.Url,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateApplicationUrlDefinition
     *
     * @param applicationUrl
     * @returns {Promise<any>}
     */
    UpdateApplicationUrlDefinition(applicationUrl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationUrlDefinition/UpdateApplicationUrlDefinition`,
                    {
                        Id: applicationUrl.Id,
                        TenantId: applicationUrl.TenantId,
                        IsDefaultDefinition: applicationUrl.IsDefaultDefinition,
                        ApplicationTypeId: applicationUrl.ApplicationTypeId,
                        Description: applicationUrl.Description,
                        Url: applicationUrl.Url,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
