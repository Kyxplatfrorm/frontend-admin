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
export class UserProfileDetailService implements Resolve<any> {
    routeParams: any;
    userprofile: any;
    onUserProfileDetailChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onUserProfileDetailChanged = new BehaviorSubject({});
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
            Promise.all([this.getUserProfileDetail()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getUserProfile
     *
     * @returns {Promise<any>}
     */
    getUserProfileDetail(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onUserProfileDetailChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/UserProfile/GetUserProfile?userProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.userprofile = response.UserProfile;
                        this.onUserProfileDetailChanged.next(this.userprofile);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * updateUserProfileDetail
     *
     * @param userprofile
     * @returns {Promise<any>}
     */
    updateUserProfileDetail(userprofile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserProfile/UpdateUserProfile`,
                    {
                        Id: userprofile.Id,
                        ForceTwoFactorAuth: userprofile.ForceTwoFactorAuth,
                        ProfileCode: userprofile.ProfileCode,
                        HasSessionTimeOut: userprofile.HasSessionTimeOut,
                        SessionTimeInMinutes: userprofile.SessionTimeInMinutes,
                        MinimumPasswordLenght:
                            userprofile.MinimumPasswordLenght,
                        PasswordNumericLenght:
                            userprofile.PasswordNumericLenght,
                        PasswordBigLetterLength:
                            userprofile.PasswordBigLetterLength,
                        PasswordSmallLetterLength:
                            userprofile.PasswordSmallLetterLength,
                        PasswordSpecialCharacterLength:
                            userprofile.PasswordSpecialCharacterLength,
                        PasswordRenewPeriod: userprofile.PasswordRenewPeriod,
                        LastPasswordCheckCount:
                            userprofile.LastPasswordCheckCount,
                        TemporarilyPasswordValidHours:
                            userprofile.TemporarilyPasswordValidHours,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * createUserProfileDetail
     *
     * @param userprofile
     * @returns {Promise<any>}
     */
    createUserProfileDetail(userprofile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserProfile/CreateUserProfile`,

                    {
                        ForceTwoFactorAuth: userprofile.ForceTwoFactorAuth,
                        ProfileCode: userprofile.ProfileCode,
                        HasSessionTimeOut: userprofile.HasSessionTimeOut,
                        SessionTimeInMinutes: userprofile.SessionTimeInMinutes,
                        MinimumPasswordLenght:
                            userprofile.MinimumPasswordLenght,
                        PasswordNumericLenght:
                            userprofile.PasswordNumericLenght,
                        PasswordBigLetterLength:
                            userprofile.PasswordBigLetterLength,
                        PasswordSmallLetterLength:
                            userprofile.PasswordSmallLetterLength,
                        PasswordSpecialCharacterLength:
                            userprofile.PasswordSpecialCharacterLength,
                        PasswordRenewPeriod: userprofile.PasswordRenewPeriod,
                        LastPasswordCheckCount:
                            userprofile.LastPasswordCheckCount,
                        TemporarilyPasswordValidHours:
                            userprofile.TemporarilyPasswordValidHours,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
