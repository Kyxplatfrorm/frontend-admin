import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CountryApiResponse, StateEntity } from "app/ui/country";
import { TenantCountryApiResponse } from "app/ui/tenantCountry";
import { AuthenticationService } from "@fuse/services";

@Injectable({ providedIn: "root" })
export class TenantCountryProfilesService {
    tenantCountryApiResponse: TenantCountryApiResponse;
    countryApiResponse: CountryApiResponse;
    onTenantCountryProfilesChanged: BehaviorSubject<any>;
    onCountryProfilesChanged: BehaviorSubject<any>;
    tenantCountryId: number;
    routeParams: any;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.onTenantCountryProfilesChanged = new BehaviorSubject({});
        this.onCountryProfilesChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenantCountryProfiles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetTenantCountryProfiles
     *
     * @returns {Promise<any>}
     */
    GetTenantCountryProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams && this.routeParams.id === "new") {
                this.onTenantCountryProfilesChanged.next(false);
                resolve(false);
            } else {
                this.authenticationService.SetSelectedTenantId(
                    this.routeParams.id
                );
                this.http
                    .get<TenantCountryApiResponse>(
                        `${environment.apiUrl}/core/coreapi/v1.0/TenantCountryProfile/GetTenantCountryProfiles?tenantId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: TenantCountryApiResponse) => {
                        this.tenantCountryApiResponse = response;
                        this.onTenantCountryProfilesChanged.next(
                            this.tenantCountryApiResponse
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * GetCountries
     *
     * @returns {Promise<any>}
     */
    GetCountries(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CountryApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCountryProfile/GetCountries`
                )
                .subscribe((response: CountryApiResponse) => {
                    this.countryApiResponse = response;
                    this.onCountryProfilesChanged.next(this.countryApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateTenantCountryProfile
     *
     * @param tenantCountry
     * @returns {Promise<any>}
     */
    CreateTenantCountryProfile(tenantCountry): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCountryProfile/CreateTenantCountryProfile`,
                    {
                        TenantId:
                            this.authenticationService.GetSelectedTenantId(),
                        CountryId: tenantCountry.CountryId,
                        IsRegistrationEnabled:
                            tenantCountry.IsRegistrationEnabled,
                       
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateTenantCountryProfile
     *
     * @param tenantCountry
     * @returns {Promise<any>}
     */
    UpdateTenantCountryProfile(tenantCountry): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCountryProfile/UpdateTenantCountryProfile`,
                    {
                        Id: tenantCountry.Id,
                        CountryId: tenantCountry.CountryId,
                        IsRegistrationEnabled:
                            tenantCountry.IsRegistrationEnabled,
                    
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteTenantCountryProfile
     *
     * @param tenantCountry
     * @returns {Promise<any>}
     */
    DeleteTenantCountryProfile(tenantCountry): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCountryProfile/DeleteTenantCountryProfile?deleteTenantCountryProfileId=` +
                        tenantCountry.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
