import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ProductModuleEntity } from "app/ui/product";

@Injectable()
export class RoleProductService implements Resolve<any> {
    routeParams: any;
    onProductChanged: BehaviorSubject<any>;
    product: any;
    productModuleList: ProductModuleEntity[];
    productId: number;

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

    GetSelectedProductId() {
        return this.productId;
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
                this.productId = this.routeParams.id;
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Role/GetProduct?productId=` +
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
}
