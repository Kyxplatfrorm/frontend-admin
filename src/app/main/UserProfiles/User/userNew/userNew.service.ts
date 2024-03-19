import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { RolesApiResponse } from "app/ui/userDefinition";

@Injectable()
export class UserNewService implements Resolve<any> {
    roleApiResponse: RolesApiResponse;
    routeParams: any;
    user: any;
    onUserNewChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onUserNewChanged = new BehaviorSubject({});
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
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * CreateUser
     *
     * @param user
     * @returns {Promise<any>}
     */
    CreateUser(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/CreateUser`,
                    {
                        UserTypeId: user.UserTypeId,
                        UserName: user.UserName,
                        UserFullName: user.UserFullName,
                        HasApiKey: user.HasApiKey,
                        UserStatusId: user.UserStatusId,
                        TenantId: user.TenantId,
                        CustomerTypeId: user.CustomerTypeId,
                        CustomerId: user.CustomerId,
                        CompanyId: user.CompanyId,
                        UtcTimeOffset: user.UtcTimeOffset,
                        UserProfileId: user.UserProfileId,
                        MustChangePwd: user.MustChangePwd,
                        PasswordResetDateTime: user.PasswordResetDateTime,
                        CheckIp: user.CheckIp,
                        Email: user.Email,
                        InternationalPhoneCode: user.InternationalPhoneCode,
                        PhoneNumber: user.PhoneNumber,
                        SelectedRoleList: user.SelectedRoleList,
                        HasIpRestriction: user.HasIpRestriction,
                        PermittedIpAddressList: user.PermittedIpAddressList,
                        LoginMethodTypeId: user.LoginMethodTypeId,
                        ForceTwoFormFactorAuth: user.ForceTwoFormFactorAuth,
                        TwoFormFactorAuthTypeId: user.TwoFormFactorAuthTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetRoles
     *
     * @param userTypeId
     * @returns {Promise<any>}
     */
    GetRoles(userTypeId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<RolesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetRoles?userTypeId=` +
                        userTypeId
                )
                .subscribe((response: RolesApiResponse) => {
                    this.roleApiResponse = response;
                    this.onUserNewChanged.next(this.roleApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
