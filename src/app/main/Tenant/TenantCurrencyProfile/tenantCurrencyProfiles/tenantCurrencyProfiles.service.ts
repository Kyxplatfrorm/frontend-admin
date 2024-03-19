import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TenantCurrencyProfileApiResponse } from "app/ui/tenantCurrencyProfile";
import { AuthenticationService } from "@fuse/services";

@Injectable({ providedIn: "root" })
export class TenantCurrencyProfilesService {
    tenantCurrencyProfileApiResponse: TenantCurrencyProfileApiResponse;
    onTenantCurrencyProfileChanged: BehaviorSubject<any>;
    tenantCurrency: any;
    routeParams: any;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.onTenantCurrencyProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenantCurrencyProfiles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetTenantCurrencyProfiles
     *
     * @returns {Promise<any>}
     */
    GetTenantCurrencyProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams && this.routeParams.id === "new") {
                this.onTenantCurrencyProfileChanged.next(false);
                resolve(false);
            } else {
                this.authenticationService.SetSelectedTenantId(
                    this.routeParams.id
                );

                this.http
                    .get<TenantCurrencyProfileApiResponse>(
                        `${environment.apiUrl}/core/coreapi/v1.0/TenantCurrencyProfile/GetTenantCurrencyProfiles?tenantId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: TenantCurrencyProfileApiResponse) => {
                        this.tenantCurrencyProfileApiResponse = response;
                        this.onTenantCurrencyProfileChanged.next(
                            this.tenantCurrencyProfileApiResponse
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateTenantCurrencyProfile
     *
     * @param tenantCurrency
     * @returns {Promise<any>}
     */
    CreateTenantCurrencyProfile(tenantCurrency): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCurrencyProfile/CreateTenantCurrencyProfile`,
                    {
                        TenantId:
                            this.authenticationService.GetSelectedTenantId(),
                        CurrencyCode: tenantCurrency.CurrencyCode,
                        CurrencyCodeNumeric: tenantCurrency.CurrencyCodeNumeric,
                        CurrencyName: tenantCurrency.CurrencyName,
                        IsActive: tenantCurrency.IsActive,
                        IsSettlementCurrency:
                            tenantCurrency.IsSettlementCurrency,
                        IsCryptoCurrency: tenantCurrency.IsCryptoCurrency,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateTenantCurrencyProfile
     *
     * @param tenantCurrency
     * @returns {Promise<any>}
     */
    UpdateTenantCurrencyProfile(tenantCurrency): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCurrencyProfile/UpdateTenantCurrencyProfile`,
                    {
                        Id: tenantCurrency.Id,
                        CurrencyCode: tenantCurrency.CurrencyCode,
                        CurrencyCodeNumeric: tenantCurrency.CurrencyCodeNumeric,
                        CurrencyName: tenantCurrency.CurrencyName,
                        IsActive: tenantCurrency.IsActive,
                        IsSettlementCurrency:
                            tenantCurrency.IsSettlementCurrency,
                        IsCryptoCurrency: tenantCurrency.IsCryptoCurrency,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteTenantCurrencyProfile
     *
     * @param tenantCurrency
     * @returns {Promise<any>}
     */
    DeleteTenantCurrencyProfile(tenantCurrency): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCurrencyProfile/DeleteTenantCurrencyProfile?deleteTenantCurrencyProfileId=` +
                        tenantCurrency.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
