import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { TenantRestrictionProfileDetailEntity } from "app/ui/tenantRestrictionProfile";

@Injectable()
export class TenantRestrictionProfileService implements Resolve<any> {
    routeParams: any;
    tenantRestriction: any;
    onTenantRestrictionProfileChanged: BehaviorSubject<any>;
    tenantRestrictionProfileDetail: TenantRestrictionProfileDetailEntity[];
    selectedProfileId: number;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onTenantRestrictionProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenantRestrictionProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * TenantRestrictionProfileDetail
     *
     * @returns {Promise<any>}
     */
    TenantRestrictionProfileDetail(): Promise<any> {
        return this.tenantRestriction.TenantRestrictionProfileDetail;
    }

    /**
     * GetTenantRestrictionProfile
     *
     * @returns {Promise<any>}
     */
    GetTenantRestrictionProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onTenantRestrictionProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/GetTenantRestrictionProfile?tenantRestrictionProfileTenantId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.tenantRestriction =
                            response.TenantRestrictionProfile;
                        this.tenantRestrictionProfileDetail =
                            response.TenantRestrictionProfileDetail;
                        this.tenantRestriction.TenantRestrictionProfileDetail =
                            this.tenantRestrictionProfileDetail;
                        this.selectedProfileId = this.tenantRestriction.Id;

                        this.onTenantRestrictionProfileChanged.next(
                            this.tenantRestriction
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateTenantRestrictionProfile
     *
     * @param tenantRestriction
     * @returns {Promise<any>}
     */
    UpdateTenantRestrictionProfile(tenantRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/UpdateTenantRestrictionProfile`,
                    {
                        Id: tenantRestriction.Id,
                        TenantId: tenantRestriction.TenantId,
                        HasInternationalUsage:
                            tenantRestriction.HasInternationalUsage,
                        HasECommerceUsage: tenantRestriction.HasECommerceUsage,
                        HasMotoUsage: tenantRestriction.HasMotoUsage,
                        HasAtmUsage: tenantRestriction.HasAtmUsage,
                        MerchantRestrictionCheckTypeId:
                            tenantRestriction.MerchantRestrictionCheckTypeId,
                        MccRestrictionCheckTypeId:
                            tenantRestriction.MccRestrictionCheckTypeId,
                        TransactionRestrictionCheckTypeId:
                            tenantRestriction.TransactionRestrictionCheckTypeId,
                        CountryRestrictionCheckTypeId:
                            tenantRestriction.CountryRestrictionCheckTypeId,
                        MerchantNameRestrictionCheckTypeId:
                            tenantRestriction.MerchantNameRestrictionCheckTypeId,
                        AcquirerRestrictionCheckTypeId:
                            tenantRestriction.AcquirerRestrictionCheckTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateTenantRestrictionProfileDetail
     *
     * @param tenantRestriction
     * @returns {Promise<any>}
     */
    CreateTenantRestrictionProfileDetail(tenantRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/CreateTenantRestrictionProfileDetail`,
                    {
                        ProfileId: tenantRestriction.ProfileId,
                        RestrictionTypeId: tenantRestriction.RestrictionTypeId,
                        RestrictionCode: tenantRestriction.RestrictionCode,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateTenantRestrictionProfileDetail
     *
     * @param tenantRestriction
     * @returns {Promise<any>}
     */
    UpdateTenantRestrictionProfileDetail(tenantRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/UpdateTenantRestrictionProfileDetail`,
                    {
                        Id: tenantRestriction.Id,
                        RestrictionTypeId: tenantRestriction.RestrictionTypeId,
                        RestrictionCode: tenantRestriction.RestrictionCode,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteTenantRestrictionProfileDetail
     *
     * @param tenantRestriction
     * @returns {Promise<any>}
     */
    DeleteTenantRestrictionProfileDetail(tenantRestriction): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantRestrictionProfile/DeleteTenantRestrictionProfileDetail?deleteTenantRestrictionProfileDetailId=` +
                        tenantRestriction.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
