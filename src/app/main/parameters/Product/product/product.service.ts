import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ResourceEntity } from "app/ui/errorDefinitions";
import { ProductModuleEntity } from "app/ui/product";

@Injectable()
export class ProductService implements Resolve<any> {
    routeParams: any;
    onProductChanged: BehaviorSubject<any>;
    product: any;
    productModuleList: ProductModuleEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onProductChanged = new BehaviorSubject({});
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
            Promise.all([this.GetProduct()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetProductModule
     *
     * @returns {Promise<any>}
     */
    GetProductModule(): Promise<any> {
        return this.product.ProductModuleList;
    }

    /**
     * GetProduct
     *
     * @returns {Promise<any>}
     */
    GetProduct(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onProductChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Product/GetProduct?productId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.product = response.Product;
                        this.onProductChanged.next(this.product);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateProduct
     *
     * @param product
     * @returns {Promise<any>}
     */
    CreateProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Product/CreateProduct`,

                    {
                        Id: product.Id,
                        Code: product.Code,
                        Description: product.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateProduct
     *
     * @param product
     * @returns {Promise<any>}
     */
    UpdateProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Product/UpdateProduct`,
                    {
                        Id: product.Id,
                        Code: product.Code,
                        Description: product.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateProductModule
     *
     * @param product
     * @returns {Promise<any>}
     */
    CreateProductModule(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Product/CreateProductModule`,

                    {
                        Id: product.Id,
                        ProductId: product.ProductId,
                        ApplicationType: product.ApplicationType,
                        UserType: product.UserType,
                        Description: product.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateProductModule
     *
     * @param product
     * @returns {Promise<any>}
     */
    UpdateProductModule(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Product/UpdateProductModule`,
                    {
                        Id: product.Id,
                        ApplicationType: product.ApplicationType,
                        UserType: product.UserType,
                        Description: product.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteProductModule
     *
     * @param product
     * @returns {Promise<any>}
     */
    DeleteProductModule(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Product/DeleteProductModule?deleteProductModuleId=` +
                        product.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
