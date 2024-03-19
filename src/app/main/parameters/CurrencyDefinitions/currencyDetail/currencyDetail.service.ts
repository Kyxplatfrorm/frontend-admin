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
export class CurrencyDetailService implements Resolve<any> {
    routeParams: any;
    currency: any;
    onCurrencyDetailChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onCurrencyDetailChanged = new BehaviorSubject({});
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
            Promise.all([this.GetCurrency()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCurrency
     *
     * @returns {Promise<any>}
     */
    GetCurrency(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onCurrencyDetailChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Currency/GetCurrency?currencyId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.currency = response.Currency;
                        this.onCurrencyDetailChanged.next(this.currency);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateCurrency
     *
     * @param currency
     * @returns {Promise<any>}
     */
    updateCurrency(currency): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Currency/UpdateCurrency`,
                    {
                        Id: currency.Id,
                        CurrencyCode: currency.CurrencyCode,
                        CurrencyCodeNumeric: currency.CurrencyCodeNumeric,
                        CurrencyCodeExternal: currency.CurrencyCodeExternal,
                        CurrencySymbol: currency.CurrencySymbol,
                        CountryName: currency.CountryName,
                        CurrencyName: currency.CurrencyName,
                        IconUrl: currency.IconUrl,
                        IsSettlementCurrency: currency.IsSettlementCurrency,
                        IsCryptoCurrency: currency.IsCryptoCurrency,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * createCurrency
     *
     * @param currency
     * @returns {Promise<any>}
     */
    createCurrency(currency): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Currency/CreateCurrency`,

                    {
                        CurrencyCode: currency.CurrencyCode,
                        CurrencyCodeNumeric: currency.CurrencyCodeNumeric,
                        CurrencyCodeExternal: currency.CurrencyCodeExternal,
                        CurrencySymbol: currency.CurrencySymbol,
                        CountryName: currency.CountryName,
                        CurrencyName: currency.CurrencyName,
                        IconUrl: currency.IconUrl,
                        IsSettlementCurrency: currency.IsSettlementCurrency,
                        IsCryptoCurrency: currency.IsCryptoCurrency,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
