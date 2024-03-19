import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    UserProfileEntity,
    UserProfilesApiResponse,
} from "app/ui/userProfiles";

@Injectable({ providedIn: "root" })
export class UserProfilesService {
    userProfilesApiResponse: UserProfilesApiResponse;
    onUserProfilesChanged: BehaviorSubject<any>;
    userProfileList: UserProfileEntity[];

    constructor(private http: HttpClient) {
        this.onUserProfilesChanged = new BehaviorSubject({});
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
            Promise.all([this.GetUserProfiles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getUserProfiles
     *
     * @returns {Promise<any>}
     */
    GetUserProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<UserProfilesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserProfile/GetUserProfiles`
                )
                .subscribe((response: UserProfilesApiResponse) => {
                    this.userProfilesApiResponse = response;
                    this.onUserProfilesChanged.next(
                        this.userProfilesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteUserProfile
     *
     * @param userprofile
     * @returns {Promise<any>}
     */
    deleteUserProfile(userprofile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/UserProfile/DeleteUserProfile?deleteId=` +
                        userprofile.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
