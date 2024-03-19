import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CurrencyApiResponse, CurrencyEntity } from "app/ui/currency";

@Injectable({ providedIn: "root" })
export class CurrencyDefinitionsService {
    currencyDefApiResponse: CurrencyApiResponse;
    onCurrencyDefChanged: BehaviorSubject<any>;
    currencyDefList: CurrencyEntity[];

    constructor(private http: HttpClient) {
        this.onCurrencyDefChanged = new BehaviorSubject({});
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
            Promise.all([this.GetCurrencies()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCurrencies
     *
     * @returns {Promise<any>}
     */
    GetCurrencies(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CurrencyApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Currency/GetCurrencies`
                )
                .subscribe((response: CurrencyApiResponse) => {
                    this.currencyDefApiResponse = response;
                    this.onCurrencyDefChanged.next(this.currencyDefApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteCurrency
     *
     * @param currency
     * @returns {Promise<any>}
     */
    deleteCurrency(currency): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Currency/DeleteCurrency?currencyDeleteId=` +
                        currency.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
