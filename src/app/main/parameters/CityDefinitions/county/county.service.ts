import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { CountyEntity } from "app/ui/city";

@Injectable()
export class CountyService implements Resolve<any> {
    routeParams: any;
    onCountyChanged: BehaviorSubject<any>;
    city: any;
    country: any;
    countyList: CountyEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onCountyChanged = new BehaviorSubject({});
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
            Promise.all([this.getCity()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getCity
     *
     * @returns {Promise<any>}
     */
    getCity(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onCountyChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/City/GetCity?cityId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.city = response.City;
                        this.onCountyChanged.next(this.city);
                        resolve(response);
                    }, reject);
            }
        });
    }
    /**
     * createCity
     *
     * @param city
     * @returns {Promise<any>}
     */
    createCity(city): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/CreateCity`,
                    {
                        CountryId: city.CountryId,
                        StateId: city.StateId,
                        CityCode: city.CityCode,
                        CityName: city.CityName,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * updateCity
     *
     * @param city
     * @returns {Promise<any>}
     */
    updateCity(city): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/UpdateCity`,

                    {
                        Id: city.Id,
                        StateId: city.StateId,
                        CityCode: city.CityCode,
                        CityName: city.CityName,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCounty
     *
     * @returns {Promise<any>}
     */
    getCounty(): Promise<any> {
        return this.city.CountyList;
    }

    /**
     * updateCounty
     *
     * @param county
     * @returns {Promise<any>}
     */
    updateCounty(county): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/UpdateCounty`,

                    { Id: county.Id, CountyName: county.CountyName }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * createCounty
     *
     * @param county
     * @returns {Promise<any>}
     */
    createCounty(county): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/CreateCounty`,

                    { CityId: county.CityId, CountyName: county.CountyName }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteCounty
     *
     * @param county
     * @returns {Promise<any>}
     */
    deleteCounty(county): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/City/DeleteCounty?deleteCountyId=` +
                        county.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
