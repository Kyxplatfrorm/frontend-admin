import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ProductApiResponse } from "app/ui/product";

@Injectable({ providedIn: "root" })
export class MenuProductsService {
    productApiResponse: ProductApiResponse;
    onProductsChanged: BehaviorSubject<any>;
    role: any;
    constructor(private http: HttpClient) {
        this.onProductsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetProducts()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetProducts
     *
     * @returns {Promise<any>}
     */
    GetProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ProductApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/GetProducts`
                )
                .subscribe((response: ProductApiResponse) => {
                    this.productApiResponse = response;
                    this.onProductsChanged.next(this.productApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
