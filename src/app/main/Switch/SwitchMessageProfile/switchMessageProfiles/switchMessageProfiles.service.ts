import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "@fuse/services";
import { SwitchMessageProfileApiResponse } from "app/ui/switchMessageProfiles";

@Injectable({ providedIn: "root" })
export class SwitchMessageProfilesService {
    switchMessageProfileApiResponse: SwitchMessageProfileApiResponse;
    onSwitchMessageProfilesChanged: BehaviorSubject<any>;
    routeParams: any;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.onSwitchMessageProfilesChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivaetdRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetSwitchMessageProfiles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchMessageProfiles
     *
     * @returns {Promise<any>}
     */
    GetSwitchMessageProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            const switchMessageProfileId =
                this.routeParams.id !== undefined ? this.routeParams.id : "new";

            if (switchMessageProfileId === "new") {
                this.onSwitchMessageProfilesChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get<SwitchMessageProfileApiResponse>(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchMessageProfile/GetSwitchMessageProfiles?switchMessageProfileId=${switchMessageProfileId}`
                    )
                    .subscribe((response: SwitchMessageProfileApiResponse) => {
                        this.switchMessageProfileApiResponse = response;
                        this.onSwitchMessageProfilesChanged.next(
                            this.switchMessageProfileApiResponse
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateSwitchMessageProfile
     *
     * @param switchMessageProfile
     * @returns {Promise<any>}
     */
    CreateSwitchMessageProfile(switchMessageProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchMessageProfile/CreateSwitchMessageProfile`,
                    {
                        NetworkMessageTypeId:
                            switchMessageProfile.NetworkMessageTypeId,
                        NetworkTypeId: switchMessageProfile.NetworkTypeId,
                        RequestMti: switchMessageProfile.RequestMti,
                        ResponseMti: switchMessageProfile.ResponseMti,
                        RequestMessageProfile:
                            switchMessageProfile.RequestMessageProfile,
                        ResponseMessageProfile:
                            switchMessageProfile.ResponseMessageProfile,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchMessageProfile
     *
     * @param switchMessageProfile
     * @returns {Promise<any>}
     */
    UpdateSwitchMessageProfile(switchMessageProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchMessageProfile/UpdateSwitchMessageProfile`,
                    {
                        Id: switchMessageProfile.Id,
                        NetworkMessageTypeId:
                            switchMessageProfile.NetworkMessageTypeId,
                        RequestMti: switchMessageProfile.RequestMti,
                        ResponseMti: switchMessageProfile.ResponseMti,
                        RequestMessageProfile:
                            switchMessageProfile.RequestMessageProfile,
                        ResponseMessageProfile:
                            switchMessageProfile.ResponseMessageProfile,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchMessageProfile
     *
     * @param switchMessageProfile
     * @returns {Promise<any>}
     */
    DeleteSwitchMessageProfile(switchMessageProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchMessageProfile/DeleteSwitchMessageProfile?deleteSwitchMessageProfileId=` +
                        switchMessageProfile.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
