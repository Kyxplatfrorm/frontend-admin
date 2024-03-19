import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { TenantLimitProfileDetailEntity } from "app/ui/tenantLimitProfile";

@Injectable()
export class TenantLimitProfileService implements Resolve<any> {
    routeParams: any;
    tenantLimit: any;
    onTenantLimitProfileChanged: BehaviorSubject<any>;
    tenantLimitProfileDetailList: TenantLimitProfileDetailEntity[];
    selectedProfileId: number;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onTenantLimitProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenantLimitProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * TenantLimitProfileDetail
     *
     * @returns {Promise<any>}
     */
    TenantLimitProfileDetail(): Promise<any> {
        return this.tenantLimit.TenantLimitProfileDetailList;
    }

    /**
     * GetTenantLimitProfile
     *
     * @returns {Promise<any>}
     */
    GetTenantLimitProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onTenantLimitProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/GetTenantLimitProfile?tenantLimitProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.tenantLimit = response.TenantLimitProfile;
                        this.tenantLimitProfileDetailList =
                            response.TenantLimitProfileDetailList;
                        this.tenantLimit.TenantLimitProfileDetailList =
                            this.tenantLimitProfileDetailList;
                        this.selectedProfileId = this.tenantLimit.Id;

                        this.onTenantLimitProfileChanged.next(this.tenantLimit);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateTenantLimitProfile
     *
     * @param tenantLimit
     * @returns {Promise<any>}
     */
    UpdateTenantLimitProfile(tenantLimit): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/UpdateTenantLimitProfile`,
                    {
                        Id: tenantLimit.Id,
                        TenanId: tenantLimit.TenanId,
                        CurrencyId: tenantLimit.CurrencyId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateTenantLimitProfileDetail
     *
     * @param tenantLimit
     * @returns {Promise<any>}
     */
    CreateTenantLimitProfileDetail(tenantLimit): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/CreateTenantLimitProfileDetail`,
                    {
                        ProfileId: tenantLimit.ProfileId,
                        TransactionGroupId: tenantLimit.TransactionGroupId,
                        HasOneTimeMaxAmount: tenantLimit.HasOneTimeMaxAmount,
                        OneTimeMaxAmount: tenantLimit.OneTimeMaxAmount,
                        HasDailyLimitAmount: tenantLimit.HasDailyLimitAmount,
                        DailyLimitAmount: tenantLimit.DailyLimitAmount,
                        HasDailyLimitCount: tenantLimit.HasDailyLimitCount,
                        DailyLimitCount: tenantLimit.DailyLimitCount,
                        HasWeeklyLimitAmount: tenantLimit.HasWeeklyLimitAmount,
                        WeeklyLimitAmount: tenantLimit.WeeklyLimitAmount,
                        HasWeeklyLimitCount: tenantLimit.HasWeeklyLimitCount,
                        WeeklyLimitCount: tenantLimit.WeeklyLimitCount,
                        HasMonthlyLimitAmount:
                            tenantLimit.HasMonthlyLimitAmount,
                        MonthlyLimitAmount: tenantLimit.MonthlyLimitAmount,
                        HasMonthlyLimitCount: tenantLimit.HasMonthlyLimitCount,
                        MonthlyLimitCount: tenantLimit.MonthlyLimitCount,
                        HasYearlyLimitAmount: tenantLimit.HasYearlyLimitAmount,
                        YearlyLimitAmount: tenantLimit.YearlyLimitAmount,
                        HasYearlyLimitCount: tenantLimit.HasYearlyLimitCount,
                        YearlyLimitCount: tenantLimit.YearlyLimitCount,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateTenantLimitProfileDetail
     *
     * @param tenantLimit
     * @returns {Promise<any>}
     */
    UpdateTenantLimitProfileDetail(tenantLimit): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/UpdateTenantLimitProfileDetail`,
                    {
                        Id: tenantLimit.Id,
                        TransactionGroupId: tenantLimit.TransactionGroupId,
                        HasOneTimeMaxAmount: tenantLimit.HasOneTimeMaxAmount,
                        OneTimeMaxAmount: tenantLimit.OneTimeMaxAmount,
                        HasDailyLimitAmount: tenantLimit.HasDailyLimitAmount,
                        DailyLimitAmount: tenantLimit.DailyLimitAmount,
                        HasDailyLimitCount: tenantLimit.HasDailyLimitCount,
                        DailyLimitCount: tenantLimit.DailyLimitCount,
                        HasWeeklyLimitAmount: tenantLimit.HasWeeklyLimitAmount,
                        WeeklyLimitAmount: tenantLimit.WeeklyLimitAmount,
                        HasWeeklyLimitCount: tenantLimit.HasWeeklyLimitCount,
                        WeeklyLimitCount: tenantLimit.WeeklyLimitCount,
                        HasMonthlyLimitAmount:
                            tenantLimit.HasMonthlyLimitAmount,
                        MonthlyLimitAmount: tenantLimit.MonthlyLimitAmount,
                        HasMonthlyLimitCount: tenantLimit.HasMonthlyLimitCount,
                        MonthlyLimitCount: tenantLimit.MonthlyLimitCount,
                        HasYearlyLimitAmount: tenantLimit.HasYearlyLimitAmount,
                        YearlyLimitAmount: tenantLimit.YearlyLimitAmount,
                        HasYearlyLimitCount: tenantLimit.HasYearlyLimitCount,
                        YearlyLimitCount: tenantLimit.YearlyLimitCount,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteTenantLimitProfileDetail
     *
     * @param tenantLimit
     * @returns {Promise<any>}
     */
    DeleteTenantLimitProfileDetail(tenantLimit): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantLimitProfile/DeleteTenantLimitProfileDetail?deleteTenantLimitProfileDetailId=` +
                        tenantLimit.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
