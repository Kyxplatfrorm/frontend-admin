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
    AccountStatusApiResponse,
    CitiesApiResponse,
    CountiesApiResponse,
    CountriesApiResponse,
    CurrenciesApiResponse,
    CustomerApiResponse,
    CustomerSegmentsApiResponse,
    CustomerStatusApiResponse,
    CustomerTypeApiResponse,
    IdentityTypeApiResponse,
    StatesByCountryIdApiResponse,
} from "app/ui/customerDefinition";
import { OccupationApiResponse } from "app/ui/occupation";

@Injectable()
export class SearchCustomerService implements Resolve<any> {
    customerApiResponse: CustomerApiResponse;
    customerTypeApiResponse: CustomerTypeApiResponse;
    ıdentityTypeApiResponse: IdentityTypeApiResponse;
    countriesApiResponse: CountriesApiResponse;
    citiesApiResponse: CitiesApiResponse;
    countiesApiResponse: CountiesApiResponse;
    customerSegmentsApiResponse: CustomerSegmentsApiResponse;
    customerStatusApiResponse: CustomerStatusApiResponse;
    accountStatusApiResponse: AccountStatusApiResponse;
    occupationDefinitionsApiResponse: OccupationApiResponse;
    currenciesApiResponse: CurrenciesApiResponse;
    statesByCountryIdApiResponse: StatesByCountryIdApiResponse;
    routeParams: any;
    customer: any;
    onSearchCustomerChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchCustomerChanged = new BehaviorSubject({});
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
            Promise.all([this.FillCustomerApiTable(this.customer)]).then(() => {
                resolve();
            }, reject);
        });
    }
    FillCustomerApiTable(customer): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.customerApiResponse == undefined) {
                this.customerApiResponse = new CustomerApiResponse();
                this.customerApiResponse.IsSucceeded = true;
                this.customerApiResponse.CustomerList = [];
            }
            this.onSearchCustomerChanged.next(this.customerApiResponse);
            resolve(this.customerApiResponse);
        });
    }

    /**
     * SearchCustomer
     *
     * @returns {Promise<any>}
     */
    SearchCustomer(customer): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post<CustomerApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/SearchCustomer`,
                    {
                        CustomerId: customer.CustomerId,
                        CompanyId: customer.CompanyId,
                        CustomerNumber: customer.CustomerNumber,
                        CustomerName: customer.CustomerName,
                        IdentityNumber: customer.IdentityNumber,
                        CellPhoneNumber: customer.CellPhoneNumber,
                        Email: customer.Email,
                        SearchStartDate: customer.SearchStartDate,
                        SearchEndDate: customer.SearchEndDate,
                    }
                )
                .subscribe((response: CustomerApiResponse) => {
                    this.customerApiResponse = response;
                    this.onSearchCustomerChanged.next(this.customerApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCities
     *
     * @returns {Promise<any>}
     */
    GetCities(customer): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post<CitiesApiResponse>(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Customer/GetCities`,
                    { CountryId: customer.CountryId, StateId: customer.StateId }
                )
                .subscribe((response: CitiesApiResponse) => {
                    this.citiesApiResponse = response;
                    this.onSearchCustomerChanged.next(this.citiesApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCounties
     *
     * @returns {Promise<any>}
     */
    GetCounties(customer): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post<CountiesApiResponse>(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Customer/GetCounties`,
                    { CityId: customer.CityId }
                )
                .subscribe((response: CountiesApiResponse) => {
                    this.countiesApiResponse = response;
                    this.onSearchCustomerChanged.next(this.countiesApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetOccupations
     *
     * @returns {Promise<any>}
     */
    GetOccupations(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<OccupationApiResponse>(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Customer/GetOccupations`
                )
                .subscribe((response: OccupationApiResponse) => {
                    this.occupationDefinitionsApiResponse = response;
                    this.onSearchCustomerChanged.next(
                        this.occupationDefinitionsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCustomerSegments
     *
     * @returns {Promise<any>}
     */
    GetCustomerSegments(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CustomerSegmentsApiResponse>(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Customer/GetCustomerSegments`
                )
                .subscribe((response: CustomerSegmentsApiResponse) => {
                    this.customerSegmentsApiResponse = response;
                    this.onSearchCustomerChanged.next(
                        this.customerSegmentsApiResponse
                    );
                    resolve(response);
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
                .get<CurrenciesApiResponse>(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Customer/GetCurrencies`
                )
                .subscribe((response: CurrenciesApiResponse) => {
                    this.currenciesApiResponse = response;
                    this.onSearchCustomerChanged.next(
                        this.currenciesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetAccountStatus
     *
     * @returns {Promise<any>}
     */
    GetAccountStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<AccountStatusApiResponse>(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Customer/GetAccountStatus`
                )
                .subscribe((response: AccountStatusApiResponse) => {
                    this.accountStatusApiResponse = response;
                    this.onSearchCustomerChanged.next(
                        this.accountStatusApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetCustomerStatuses
     *
     * @returns {Promise<any>}
     */
    GetCustomerStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<CustomerStatusApiResponse>(
                    `${environment.apiUrl}/motion/backofficeapi/v1.0/Customer/GetCustomerStatuses`
                )
                .subscribe((response: CustomerStatusApiResponse) => {
                    this.customerStatusApiResponse = response;
                    this.onSearchCustomerChanged.next(
                        this.customerStatusApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchPopupDataSource() {
        if (this.customerApiResponse != undefined) {
            this.customerApiResponse.CustomerList = [];
        }
    }
}
