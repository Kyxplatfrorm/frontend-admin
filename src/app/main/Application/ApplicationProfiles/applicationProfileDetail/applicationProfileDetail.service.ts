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
export class ApplicationProfileDetailService implements Resolve<any> {
    routeParams: any;
    applicationprofile: any;
    onApplicationProfileDetailChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApplicationProfileDetailChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApplicationProfileDetail()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApplicationProfileDetail
     *
     * @returns {Promise<any>}
     */
    GetApplicationProfileDetail(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onApplicationProfileDetailChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ApplicationProfile/GetApplicationProfile?applicationProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.applicationprofile = response.ApplicationProfile;
                        this.onApplicationProfileDetailChanged.next(
                            this.applicationprofile
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * updateAppProfileDetail
     *
     * @param applicationprofile
     * @returns {Promise<any>}
     */
    UpdateAppProfileDetail(applicationprofile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationProfile/UpdateApplicationProfile`,
                    {
                        Id: applicationprofile.Id,
                        SqlLogTimeoutThreshold:
                            applicationprofile.SqlLogTimeoutThreshold,
                        DisableOperationLogging:
                            applicationprofile.DisableOperationLogging,
                        TimeZoneInMinute: applicationprofile.TimeZoneInMinute,
                        CommandTimeout: applicationprofile.CommandTimeout,
                        HasCommandTimeout: applicationprofile.HasCommandTimeout,
                        DisableMonitoring: applicationprofile.DisableMonitoring,
                        DisableRestLog: applicationprofile.DisableRestLog,
                        SpaHostingPath: applicationprofile.SpaHostingPath,
                        EnableSpaHosting: applicationprofile.EnableSpaHosting,
                        SwaggerBasePath: applicationprofile.SwaggerBasePath,
                        MaskJsonRequest: applicationprofile.MaskJsonRequest,
                        EnableSwaggerLogin:
                            applicationprofile.EnableSwaggerLogin,
                        EnableSwagger: applicationprofile.EnableSwagger,
                        LoadExternalWebApi:
                            applicationprofile.LoadExternalWebApi,
                        ChangeHttpStatusCode:
                            applicationprofile.ChangeHttpStatusCode,
                        ProfileName: applicationprofile.ProfileName,
                        LogHttpGetApiCalls:
                            applicationprofile.LogHttpGetApiCalls,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * createAppProfileDetail
     *
     * @param applicationprofile
     * @returns {Promise<any>}
     */
    CreateAppProfileDetail(applicationprofile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationProfile/CreateApplicationProfile`,

                    {
                        SqlLogTimeoutThreshold:
                            applicationprofile.SqlLogTimeoutThreshold,
                        DisableOperationLogging:
                            applicationprofile.DisableOperationLogging,
                        TimeZoneInMinute: applicationprofile.TimeZoneInMinute,
                        CommandTimeout: applicationprofile.CommandTimeout,
                        HasCommandTimeout: applicationprofile.HasCommandTimeout,
                        MaskJsonRequest: applicationprofile.MaskJsonRequest,
                        DisableMonitoring: applicationprofile.DisableMonitoring,
                        DisableRestLog: applicationprofile.DisableRestLog,
                        SpaHostingPath: applicationprofile.SpaHostingPath,
                        EnableSpaHosting: applicationprofile.EnableSpaHosting,
                        SwaggerBasePath: applicationprofile.SwaggerBasePath,
                        EnableSwaggerLogin:
                            applicationprofile.EnableSwaggerLogin,
                        EnableSwagger: applicationprofile.EnableSwagger,
                        LoadExternalWebApi:
                            applicationprofile.LoadExternalWebApi,
                        ChangeHttpStatusCode:
                            applicationprofile.ChangeHttpStatusCode,
                        ProfileName: applicationprofile.ProfileName,
                        LogHttpGetApiCalls:
                            applicationprofile.LogHttpGetApiCalls,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
