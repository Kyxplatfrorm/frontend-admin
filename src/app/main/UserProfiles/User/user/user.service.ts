import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ApiKeyEntity, RolesApiResponse } from "app/ui/userDefinition";
import { RoleEntity } from "app/ui/roleDefinition";
import { AuthenticationMenuTreeApiResponse } from "app/ui/authentication";

@Injectable()
export class UserService implements Resolve<any> {
    routeParams: any;
    user: any;
    onUserChanged: BehaviorSubject<any>;
    onRoleChanged: BehaviorSubject<any>;
    onMenuTreeAuthChanged: BehaviorSubject<any>;
    apiKeyList: ApiKeyEntity[];
    roleList: RoleEntity[];
    selectedRoleList: number[];
    permittedIpAddressList: string[];
    menuTreeAuthenticationResponse: AuthenticationMenuTreeApiResponse;
    roleApiResponse: RolesApiResponse;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onUserChanged = new BehaviorSubject({});
        this.onMenuTreeAuthChanged = new BehaviorSubject({});
        this.onRoleChanged = new BehaviorSubject({});
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
            Promise.all([this.GetUser()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetUser
     *
     * @returns {Promise<any>}
     */
    GetUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onUserChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/GetUser?userId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.user = response.UserDefinition;
                        this.onUserChanged.next(this.user);
                        resolve(response);
                    }, reject);
            }
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
                    this.onRoleChanged.next(this.roleApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateUser
     *
     * @param user
     * @returns {Promise<any>}
     */
    UpdateUser(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/UpdateUser`,
                    {
                        Id: user.Id,
                        Email: user.Email,
                        InternationalPhoneCode: user.InternationalPhoneCode,
                        PhoneNumber: user.PhoneNumber,
                        UserName: user.UserName,
                        UserTypeId: user.UserTypeId,
                        UserFullName: user.UserFullName,
                        HasApiKey: user.HasApiKey,
                        UserStatusId: user.UserStatusId,
                        TenantId: user.TenantId,
                        CustomerTypeId: user.CustomerTypeId,
                        CustomerId: user.CustomerId,
                        UtcTimeOffset: user.UtcTimeOffset,
                        UserProfileId: user.UserProfileId,
                        MustChangePwd: user.MustChangePwd,
                        WrongAttemptCount: user.WrongAttemptCount,
                        PasswordResetDateTime: user.PasswordResetDateTime,
                        CheckIp: user.CheckIp,
                        SelectedRoleList: user.SelectedRoleList,
                        PermittedIpAddressList: user.PermittedIpAddressList,
                        HasIpRestriction: user.HasIpRestriction,
                        LoginMethodTypeId: user.LoginMethodTypeId,
                        ForceTwoFormFactorAuth: user.ForceTwoFormFactorAuth,
                        TwoFormFactorAuthTypeId: user.TwoFormFactorAuthTypeId,
                        CompanyId: user.CompanyId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * SelectedRoleList
     *
     * @returns {Promise<any>}
     */
    GetSelectedRoleList(): Promise<any> {
        return this.user.SelectedRoleList;
    }

    /**
     * GetUserMenuTree
     *
     * @returns {Promise<any>}
     */
    GetUserMenuTree(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<AuthenticationMenuTreeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Authentication/GetUserMenuTree`
                )
                .subscribe((response: AuthenticationMenuTreeApiResponse) => {
                    this.menuTreeAuthenticationResponse = response;
                    this.onMenuTreeAuthChanged.next(
                        this.menuTreeAuthenticationResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
