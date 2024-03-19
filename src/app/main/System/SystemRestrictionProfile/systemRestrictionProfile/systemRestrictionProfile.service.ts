import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import {
    RestrictionCheckTypeApiResponse,
    RestrictionTypeApiResponse,
    SystemRestrictionProfileDetailEntity,
} from "app/ui/systemRestrictionProfile";

@Injectable()
export class SystemRestrictionProfileService implements Resolve<any> {
    routeParams: any;
    systemRestriction: any;
    onSystemRestrictionProfileChanged: BehaviorSubject<any>;
    systemRestrictionProfileDetailList: SystemRestrictionProfileDetailEntity[];
    selectedProfileId: number;
    restrictionCheckTypeApiResponse: RestrictionCheckTypeApiResponse;
    restrictionTypeApiResponse: RestrictionTypeApiResponse;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSystemRestrictionProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSystemRestrictionProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * SystemRestrictionProfileDetail
     *
     * @returns {Promise<any>}
     */
    SystemRestrictionProfileDetail(): Promise<any> {
        return this.systemRestriction.SystemRestrictionProfileDetailList;
    }

    /**
     * GetSystemRestrictionProfile
     *
     * @returns {Promise<any>}
     */
    GetSystemRestrictionProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemRestrictionProfile/GetSystemRestrictionProfile`
                )
                .subscribe((response: any) => {
                    this.systemRestriction = response.SystemRestrictionProfile;
                    this.systemRestrictionProfileDetailList =
                        response.SystemRestrictionProfileDetailList;
                    this.systemRestriction.SystemRestrictionProfileDetailList =
                        this.systemRestrictionProfileDetailList;
                    this.selectedProfileId = this.systemRestriction.Id;

                    this.onSystemRestrictionProfileChanged.next(
                        this.systemRestriction
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetRestrictionCheckType
     *
     * @returns {Promise<any>}
     */
    GetRestrictionCheckType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<RestrictionCheckTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemRestrictionProfile/GetRestrictionCheckType`
                )
                .subscribe((response: RestrictionCheckTypeApiResponse) => {
                    this.restrictionCheckTypeApiResponse = response;
                    this.onSystemRestrictionProfileChanged.next(
                        this.restrictionCheckTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetRestrictionType
     *
     * @returns {Promise<any>}
     */
    GetRestrictionType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<RestrictionTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemRestrictionProfile/GetRestrictionType`
                )
                .subscribe((response: RestrictionTypeApiResponse) => {
                    this.restrictionTypeApiResponse = response;
                    this.onSystemRestrictionProfileChanged.next(
                        this.restrictionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSystemRestrictionProfile
     *
     * @param systemRestriction
     * @returns {Promise<any>}
     */
    UpdateSystemRestrictionProfile(systemRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemRestrictionProfile/UpdateSystemRestrictionProfile`,
                    {
                        Id: systemRestriction.Id,
                        SystemId: systemRestriction.SystemId,
                        HasInternationalUsage:
                            systemRestriction.HasInternationalUsage,
                        HasECommerceUsage: systemRestriction.HasECommerceUsage,
                        HasMotoUsage: systemRestriction.HasMotoUsage,
                        HasAtmUsage: systemRestriction.HasAtmUsage,
                        MerchantRestrictionCheckTypeId:
                            systemRestriction.MerchantRestrictionCheckTypeId,
                        MccRestrictionCheckTypeId:
                            systemRestriction.MccRestrictionCheckTypeId,
                        TransactionRestrictionCheckTypeId:
                            systemRestriction.TransactionRestrictionCheckTypeId,
                        CountryRestrictionCheckTypeId:
                            systemRestriction.CountryRestrictionCheckTypeId,
                        MerchantNameRestrictionCheckTypeId:
                            systemRestriction.MerchantNameRestrictionCheckTypeId,
                        AcquirerRestrictionCheckTypeId:
                            systemRestriction.AcquirerRestrictionCheckTypeId,
                        MinimumTransactionAmount:
                            systemRestriction.MinimumTransactionAmount,
                        MaximumTransactionAmount:
                            systemRestriction.MaximumTransactionAmount,
                        TenantRestrictionCheckTypeId:
                            systemRestriction.TenantRestrictionCheckTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateSystemRestrictionProfileDetail
     *
     * @param systemRestriction
     * @returns {Promise<any>}
     */
    CreateSystemRestrictionProfileDetail(systemRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemRestrictionProfile/CreateSystemRestrictionProfileDetail`,
                    {
                        // ProfileId: systemRestriction.ProfileId,
                        RestrictionTypeId: systemRestriction.RestrictionTypeId,
                        RestrictionCode: systemRestriction.RestrictionCode,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSystemRestrictionProfileDetail
     *
     * @param systemRestriction
     * @returns {Promise<any>}
     */
    UpdateSystemRestrictionProfileDetail(systemRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemRestrictionProfile/UpdateSystemRestrictionProfileDetail`,
                    {
                        Id: systemRestriction.Id,
                        RestrictionTypeId: systemRestriction.RestrictionTypeId,
                        RestrictionCode: systemRestriction.RestrictionCode,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSystemRestrictionProfileDetail
     *
     * @param systemRestriction
     * @returns {Promise<any>}
     */
    DeleteSystemRestrictionProfileDetail(systemRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemRestrictionProfile/DeleteSystemRestrictionProfileDetail?deleteSystemRestrictionProfileDetailId=` +
                        systemRestriction.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
