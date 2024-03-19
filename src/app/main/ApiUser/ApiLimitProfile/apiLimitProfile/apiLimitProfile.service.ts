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
export class ApiLimitProfileService implements Resolve<any> {
    routeParams: any;
    apiLimitProfile: any;
    onApiLimitProfileChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApiLimitProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApiLimitProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApiLimitProfile
     *
     * @returns {Promise<any>}
     */
    GetApiLimitProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onApiLimitProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ApiLimitProfile/GetApiLimitProfile?apiLimitProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.apiLimitProfile = response.ApiLimitProfile;
                        this.onApiLimitProfileChanged.next(
                            this.apiLimitProfile
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateApiLimitProfile
     *
     * @param apiLimitProfile
     * @returns {Promise<any>}
     */
    CreateApiLimitProfile(apiLimitProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiLimitProfile/CreateApiLimitProfile`,
                    {
                        ProfileName: apiLimitProfile.ProfileName,
                        HasValidDays: apiLimitProfile.HasValidDays,
                        ValidDayList: apiLimitProfile.ValidDayList,
                        HasValidHours: apiLimitProfile.HasValidHours,
                        ValidStartTime: apiLimitProfile.ValidStartTime,
                        ValidEndTime: apiLimitProfile.ValidEndTime,
                        HasDailyMaxExecutionCount:
                            apiLimitProfile.HasDailyMaxExecutionCount,
                        DailyMaxExecutionCount:
                            apiLimitProfile.DailyMaxExecutionCount,
                        HasMaxTpsCount: apiLimitProfile.HasMaxTpsCount,
                        MaxTpsCount: apiLimitProfile.MaxTpsCount,
                        TenantId: apiLimitProfile.TenantId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateApiLimitProfile
     *
     * @param apiLimitProfile
     * @returns {Promise<any>}
     */
    UpdateApiLimitProfile(apiLimitProfile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiLimitProfile/UpdateApiLimitProfile`,
                    {
                        Id: this.apiLimitProfile.Id,
                        ProfileName: apiLimitProfile.ProfileName,
                        HasValidDays: apiLimitProfile.HasValidDays,
                        ValidDayList: apiLimitProfile.ValidDayList,
                        HasValidHours: apiLimitProfile.HasValidHours,
                        ValidStartTime: apiLimitProfile.ValidStartTime,
                        ValidEndTime: apiLimitProfile.ValidEndTime,
                        HasDailyMaxExecutionCount:
                            apiLimitProfile.HasDailyMaxExecutionCount,
                        DailyMaxExecutionCount:
                            apiLimitProfile.DailyMaxExecutionCount,
                        HasMaxTpsCount: apiLimitProfile.HasMaxTpsCount,
                        MaxTpsCount: apiLimitProfile.MaxTpsCount,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
