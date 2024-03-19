import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { UserApiResponse } from "app/ui/userDefinition";

@Injectable()
export class SearchUserService implements Resolve<any> {
    userResponse: UserApiResponse;
    routeParams: any;
    user: any;
    onSearchUserChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchUserChanged = new BehaviorSubject({});
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
            Promise.all([this.FillUserTable(this.user)]).then(() => {
                resolve();
            }, reject);
        });
    }

    FillUserTable(user): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.userResponse == undefined) {
                this.userResponse = new UserApiResponse();
                this.userResponse.UserList = [];
            }
            this.onSearchUserChanged.next(this.userResponse);
            resolve(this.userResponse);
        });
    }
    /**
     * SearchUser
     *
     * @returns {Promise<any>}
     */
    SearchUser(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post<UserApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/SearchUser`,
                    {
                        Email: user.Email,
                        PhoneNumber: user.PhoneNumber,
                        HasApiKey: user.HasApiKey,
                        UserTypeId: user.UserTypeId,
                        UserName: user.UserName,
                        UserFullName: user.UserFullName,
                        SelectedUserStatus: user.SelectedUserStatus,
                        TenantId: user.TenantId,
                        CustomerTypeId: user.CustomerTypeId,
                        CustomerId: user.CustomerId,
                        InsertBeginDateTime: user.InsertBeginDateTime,
                        InsertEndDateTime: user.InsertEndDateTime,
                        UpdateBeginDateTime: user.UpdateBeginDateTime,
                        UpdateEndDateTime: user.UpdateEndDateTime,
                        CompanyId: user.CompanyId,
                    }
                )
                .subscribe((response: UserApiResponse) => {
                    this.userResponse = response;
                    this.onSearchUserChanged.next(this.userResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * SetPassword
     *
     * @param user
     * @returns {Promise<any>}
     */
    SetPassword(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/SetPassword`,

                    {
                        UserId: user.UserId,
                        NewPassword: user.NewPassword,
                        NewPassword2: user.NewPassword2,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * ResetPasswordRetryCount
     *
     * @param user
     * @returns {Promise<any>}
     */
    ResetPasswordRetryCount(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/ResetPasswordRetryCount?resetPasswordRetryCountUserId=` +
                        user.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * ResetPassword
     *
     * @param user
     * @returns {Promise<any>}
     */
    ResetPassword(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/ResetPassword?resetPasswordUserId=` +
                        user.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteUser
     *
     * @param user
     * @returns {Promise<any>}
     */
    DeleteUser(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserDefinition/DeleteUser?deleteUserId=` +
                        user.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
