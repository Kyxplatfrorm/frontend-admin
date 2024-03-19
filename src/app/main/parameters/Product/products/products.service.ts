import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { ErrorDefinitionApiResponse } from "app/ui/errorDefinitions";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ProductApiResponse } from "app/ui/product";

@Injectable({ providedIn: "root" })
export class ProductsService {
    productApiResponse: ProductApiResponse;
    onProductsChanged: BehaviorSubject<any>;
    product: any;
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
                    `${environment.apiUrl}/core/coreapi/v1.0/Product/GetProducts`
                )
                .subscribe((response: ProductApiResponse) => {
                    this.productApiResponse = response;
                    this.onProductsChanged.next(this.productApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteProduct
     *
     * @param product
     * @returns {Promise<any>}
     */
    DeleteProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Product/DeleteProduct?deleteProductId=` +
                        product.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
