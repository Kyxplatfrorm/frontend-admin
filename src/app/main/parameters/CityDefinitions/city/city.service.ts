import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CityApiResponse, StateApiResponse } from "app/ui/city";
import { Country } from "../country/country.model";
import { StateEntity } from "app/ui/country";

@Injectable({ providedIn: "root" })
export class CityService {
    selectedCountry: Country;
    stateList: StateEntity[];
    cityApiResponse: CityApiResponse;
    onCityChanged: BehaviorSubject<any>;
    onStateChanged: BehaviorSubject<any>;
    routeParams: any;

    constructor(private http: HttpClient) {
        this.onCityChanged = new BehaviorSubject({});
        this.onStateChanged = new BehaviorSubject({});
        this.selectedCountry = new Country();
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
            Promise.all([this.GetCitiesByCountryId()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCitiesByCountryId
     *
     * @returns {Promise<any>}
     */
    GetCitiesByCountryId(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CityApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/GetCitiesByCountryId?cityCountryId=` +
                        this.routeParams.id
                )
                .subscribe((response: CityApiResponse) => {
                    this.cityApiResponse = response;
                    this.onCityChanged.next(this.cityApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    getCountry(countryId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/GetCountry?countryId=` +
                        countryId
                )
                .subscribe((response: any) => {
                    this.selectedCountry = response.Country;
                    this.stateList = response.Country.StateList;
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteCity
     *
     * @param city
     * @returns {Promise<any>}
     */
    deleteCity(city): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/DeleteCity?deleteCityId=` +
                        city.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
