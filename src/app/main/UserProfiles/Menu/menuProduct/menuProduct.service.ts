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
export class MenuProductService implements Resolve<any> {
    routeParams: any;
    onProductChanged: BehaviorSubject<any>;
    product: any;
    productModuleList: ProductModuleEntity[];
    menuProductId: number;

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

    GetSelectedMenuProductId() {
        return this.menuProductId;
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
                this.menuProductId = this.routeParams.id;
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Menu/GetProduct?productId=` +
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
