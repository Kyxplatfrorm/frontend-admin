import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { StateEntity } from "app/ui/country";

@Injectable()
export class StateDefinitionsService implements Resolve<any> {
    statedefinitionsparameters: StateEntity;
    routeParams: any;
    country: any;
    onStateDefinitionsChanged: BehaviorSubject<any>;
    stateList: StateEntity[];
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onStateDefinitionsChanged = new BehaviorSubject({});
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
            Promise.all([this.getCountry()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCountry
     *
     * @returns {Promise<any>}
     */
    getCountry(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onStateDefinitionsChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Country/GetCountry?countryId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.country = response.Country;
                        this.onStateDefinitionsChanged.next(this.country);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * updateCountry
     *
     * @param country
     * @returns {Promise<any>}
     */
    updateCountry(country): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Country/UpdateCountry`,

                    {
                        Id: country.Id,
                        CountryCode: country.CountryCode,
                        CountryName: country.CountryName,
                        DefaultCurrencyCode: country.DefaultCurrencyCode,
                        CountryIsoCode2: country.CountryIsoCode2,
                        CountryIsoCode3: country.CountryIsoCode3,
                        CountryPhoneCode: country.CountryPhoneCode,
                        ExternalCountryCode: country.ExternalCountryCode,
                        MaxPhoneLength: country.MaxPhoneLength,
                        MinPhoneLength: country.MinPhoneLength,
                        PhoneMask: country.PhoneMask,
                        IconUrl: country.IconUrl,
                        IsGlobalRegistrationEnabled:
                            country.IsGlobalRegistrationEnabled,
                        IsLocalRegistrationEnabled:
                            country.IsLocalRegistrationEnabled,
                        HasState: country.HasState,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * createCountry
     *
     * @param country
     * @returns {Promise<any>}
     */
    createCountry(country): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Country/CreateCountry`,

                    {
                        CountryCode: country.CountryCode,
                        CountryName: country.CountryName,
                        DefaultCurrencyCode: country.DefaultCurrencyCode,
                        CountryIsoCode2: country.CountryIsoCode2,
                        CountryIsoCode3: country.CountryIsoCode3,
                        CountryPhoneCode: country.CountryPhoneCode,
                        ExternalCountryCode: country.ExternalCountryCode,
                        MaxPhoneLength: country.MaxPhoneLength,
                        MinPhoneLength: country.MinPhoneLength,
                        PhoneMask: country.PhoneMask,
                        IconUrl: country.IconUrl,
                        IsGlobalRegistrationEnabled:
                            country.IsGlobalRegistrationEnabled,
                        IsLocalRegistrationEnabled:
                            country.IsLocalRegistrationEnabled,
                        HasState: country.HasState,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * Get state
     *
     * @returns {Promise<any>}
     */
    getState(): Promise<any> {
        return this.country.StateList;
    }

    /**
     * updateState
     *
     * @param state
     * @returns {Promise<any>}
     */
    updateState(state): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Country/UpdateState`,

                    {
                        Id: state.Id,
                        StateCode: state.StateCode,
                        StateAlphaCode: state.StateAlphaCode,
                        StateName: state.StateName,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * createCountry
     *
     * @param state
     * @returns {Promise<any>}
     */
    createState(state): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Country/CreateState`,

                    {
                        CountryId: state.CountryId,
                        StateCode: state.StateCode,
                        StateAlphaCode: state.StateAlphaCode,
                        StateName: state.StateName,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteState
     *
     * @param state
     * @returns {Promise<any>}
     */
    deleteState(state): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Country/DeleteState?deleteStateId=` +
                        state.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
