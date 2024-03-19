import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ApiPermissionProfileDetailListEntity } from "app/ui/apiPermissionProfile";

@Injectable()
export class ApiPermissionProfileService implements Resolve<any> {
    routeParams: any;
    apiPermissionProfile: any;
    selectedProfileId: number;
    onApiPermissionProfileChanged: BehaviorSubject<any>;
    apiPermissionProfileDetailList: ApiPermissionProfileDetailListEntity[];
    selectedUserTypeId: number;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApiPermissionProfileChanged = new BehaviorSubject({});
    }

    getSelectedUserTypeId() {
        return this.selectedUserTypeId;
    }

    setSelectedUserTypeId(Id: number) {
        this.selectedUserTypeId = Id;
    }

    setProfileId(Id: number) {
        if (!this.apiPermissionProfile) {
            this.apiPermissionProfile = {};
        }
        this.selectedProfileId = this.apiPermissionProfile.Id;
    }

    getProfileId() {
        return this.selectedProfileId;
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
            Promise.all([this.GetApiPermissionProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApiPermissionProfile
     *
     * @returns {Promise<any>}
     */
    GetApiPermissionProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onApiPermissionProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/GetApiPermissionProfile?apiPermissionProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.apiPermissionProfile =
                            response.ApiPermissionProfile;
                        this.apiPermissionProfileDetailList =
                            response.ApiPermissionProfileDetailList;
                        this.apiPermissionProfile.ApiPermissionProfileDetailList =
                            this.apiPermissionProfileDetailList;

                        this.onApiPermissionProfileChanged.next(
                            this.apiPermissionProfile
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateApiPermissionProfile
     *
     * @param apiPermissionProfile
     * @returns {Promise<any>}
     */
    CreateApiPermissionProfile(apiPermissionProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/CreateApiPermissionProfile`,
                    {
                        ProfileName: apiPermissionProfile.ProfileName,
                        PermissionCheckTypeId:
                            apiPermissionProfile.PermissionCheckTypeId,
                        TenantId: apiPermissionProfile.TenantId,
                        UserTypeId: apiPermissionProfile.UserTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateApiPermissionProfile
     *
     * @param apiPermissionProfile
     * @returns {Promise<any>}
     */
    UpdateApiPermissionProfile(apiPermissionProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/UpdateApiPermissionProfile`,
                    {
                        Id: apiPermissionProfile.Id,
                        ProfileName: apiPermissionProfile.ProfileName,
                        PermissionCheckTypeId:
                            apiPermissionProfile.PermissionCheckTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateApiPermissionProfileDetail
     *
     * @param apiPermissionProfile
     * @returns {Promise<any>}
     */
    CreateApiPermissionProfileDetail(apiPermissionProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/CreateApiPermissionProfileDetail`,
                    {
                        ProfileId: apiPermissionProfile.ProfileId,
                        ApiDefinitionId: apiPermissionProfile.ApiDefinitionId,
                        HasApiLimitProfile:
                            apiPermissionProfile.HasApiLimitProfile,
                        ApiLimitProfileId:
                            apiPermissionProfile.ApiLimitProfileId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateApiPermissionProfileDetail
     *
     * @param apiPermissionProfile
     * @returns {Promise<any>}
     */
    UpdateApiPermissionProfileDetail(apiPermissionProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/UpdateApiPermissionProfileDetail`,
                    {
                        Id: apiPermissionProfile.Id,
                        ApiDefinitionId: apiPermissionProfile.ApiDefinitionId,
                        HasApiLimitProfile:
                            apiPermissionProfile.HasApiLimitProfile,
                        ApiLimitProfileId:
                            apiPermissionProfile.ApiLimitProfileId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteApiPermissionProfileDetail
     *
     * @param apiPermissionProfile
     * @returns {Promise<any>}
     */
    DeleteApiPermissionProfileDetail(apiPermissionProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiPermissionProfile/DeleteApiPermissionProfileDetail?deleteApiPermissionProfileDetailId=` +
                        apiPermissionProfile.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
