import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CountryApiResponse, StateEntity } from "app/ui/country";

@Injectable({ providedIn: "root" })
export class CountryDefinitionsService {
    countryDefinitionsApiResponse: CountryApiResponse;
    onCountryDefinitionsChanged: BehaviorSubject<any>;
    stateList: StateEntity[];

    constructor(private http: HttpClient) {
        this.onCountryDefinitionsChanged = new BehaviorSubject({});
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
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getCountries()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getCountries
     *
     * @returns {Promise<any>}
     */
    getCountries(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CountryApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Country/GetCountries`
                )
                .subscribe((response: CountryApiResponse) => {
                    this.countryDefinitionsApiResponse = response;
                    this.onCountryDefinitionsChanged.next(
                        this.countryDefinitionsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteCountry
     *
     * @param country
     * @returns {Promise<any>}
     */
    deleteCountry(country): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Country/DeleteCountry?deleteCountryId=` +
                        country.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
