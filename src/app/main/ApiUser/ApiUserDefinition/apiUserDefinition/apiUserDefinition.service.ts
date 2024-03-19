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
export class ApiUserDefinitionService implements Resolve<any> {
    routeParams: any;
    apiUser: any;
    onApiUserDefinitionChanged: BehaviorSubject<any>;
    permittedIpAddressList: string[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApiUserDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApiUser()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApiUser
     *
     * @returns {Promise<any>}
     */
    GetApiUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onApiUserDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/GetApiUser?userId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.apiUser = response.UserDefinition;
                        this.onApiUserDefinitionChanged.next(this.apiUser);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateApiUser
     *
     * @param apiUser
     * @returns {Promise<any>}
     */
    CreateApiUser(apiUser): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/CreateApiUser`,

                    {
                        UserName: apiUser.UserName,
                        UserFullName: apiUser.UserFullName,
                        UserStatusId: apiUser.UserStatusId,
                        Email: apiUser.Email,
                        CustomerType: apiUser.CustomerType,
                        CustomerId: apiUser.CustomerId,
                        CompanyId: apiUser.CompanyId,
                        HasIpRestriction: apiUser.HasIpRestriction,
                        PermittedIpAddressList: apiUser.PermittedIpAddressList,
                        HasApiPermissionProfile:
                            apiUser.HasApiPermissionProfile,
                        ApiPermissionProfileId: apiUser.ApiPermissionProfileId,
                        HasExpiryDate: apiUser.HasExpiryDate,
                        StartDateTime: apiUser.StartDateTime,
                        EndDateTime: apiUser.EndDateTime,
                        TenantId: apiUser.TenantId,
                        UserTypeId: apiUser.UserTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateApiUser
     *
     * @param apiUser
     * @returns {Promise<any>}
     */
    UpdateApiUser(apiUser): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/UpdateApiUser`,

                    {
                        Id: apiUser.Id,
                        UserName: apiUser.UserName,
                        UserFullName: apiUser.UserFullName,
                        UserStatusId: apiUser.UserStatusId,
                        Email: apiUser.Email,
                        CustomerType: apiUser.CustomerType,
                        CompanyName: apiUser.CompanyName,
                        CustomerId: apiUser.CustomerId,
                        CompanyId: apiUser.CompanyId,
                        CompanyPosId: apiUser.CompanyPosId,
                        HasIpRestriction: apiUser.HasIpRestriction,
                        PermittedIpAddressList: apiUser.PermittedIpAddressList,
                        HasApiPermissionProfile:
                            apiUser.HasApiPermissionProfile,
                        ApiPermissionProfileId: apiUser.ApiPermissionProfileId,
                        HasExpiryDate: apiUser.HasExpiryDate,
                        StartDateTime: apiUser.StartDateTime,
                        EndDateTime: apiUser.EndDateTime,
                        TenantId: apiUser.TenantId,
                        UserTypeId: apiUser.UserTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
