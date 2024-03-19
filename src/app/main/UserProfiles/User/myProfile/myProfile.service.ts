import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiKeyEntity } from "app/ui/userDefinition";
import { environment } from "environments/environment";
import { CurrentUserApiResponse } from "app/ui/currentUser";

@Injectable()
export class MyProfileService implements Resolve<any> {
    currentUserApiResponse: CurrentUserApiResponse;
    routeParams: any;
    myProfile: any;
    onMyProfileChanged: BehaviorSubject<any>;
    apiKeyList: ApiKeyEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onMyProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.FillCurrentUserTable(this.myProfile)]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    FillCurrentUserTable(myProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.currentUserApiResponse == undefined) {
                this.currentUserApiResponse = new CurrentUserApiResponse();
                this.currentUserApiResponse.CurrentUser = [];
            }
            this.onMyProfileChanged.next(this.currentUserApiResponse);
            resolve(this.currentUserApiResponse);
        });
    }

    /**
     * GetCurrentUser
     *
     * @returns {Promise<any>}
     */
    GetCurrentUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CurrentUserApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/CurrentUser/GetCurrentUser`
                )
                .subscribe((response: CurrentUserApiResponse) => {
                    this.myProfile = response.CurrentUser;
                    this.onMyProfileChanged.next(this.myProfile);
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetApiKey
     *
     * @returns {Promise<any>}
     */
    GetApiKey(): Promise<any> {
        return this.myProfile.ApiKeyList;
    }

    /**
     * UpdateCurrentUser
     *
     * @param myProfile
     * @returns {Promise<any>}
     */
    UpdateCurrentUser(myProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/User/UpdateCurrentUser`,

                    {
                        UserFullName: myProfile.UserFullName,
                        Email: myProfile.Email,
                        InternationalPhoneCode:
                            myProfile.InternationalPhoneCode,
                        PhoneNumber: myProfile.PhoneNumber,
                        UtcTimeOffset: myProfile.UtcTimeOffset,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * ChangeCurrentUserPassword
     *
     * @param myProfile
     * @returns {Promise<any>}
     */
    ChangeCurrentUserPassword(myProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/User/ChangeCurrentUserPassword`,
                    {
                        OldPassword: myProfile.OldPassword,
                        NewPassword: myProfile.NewPassword,
                        NewPassword2: myProfile.NewPassword2,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
