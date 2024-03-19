import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { QueryEntity } from "app/ui/query";

@Injectable()
export class QueryService implements Resolve<any> {
    routeParams: any;
    query: any;
    onQueryChanged: BehaviorSubject<any>;
    queryList: QueryEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onQueryChanged = new BehaviorSubject({});
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
            Promise.all([this.GetQuery()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetQuery
     *
     * @returns {Promise<any>}
     */
    GetQuery(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onQueryChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Query/GetQuery?queryId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.query = response.QueryDefinition;
                        this.onQueryChanged.next(this.query);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateQuery
     *
     * @param query
     * @returns {Promise<any>}
     */
    UpdateQuery(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Query/UpdateQuery`,
                    {
                        Id: query.Id,
                        QueryTypeId: query.QueryTypeId,
                        QueryCode: query.QueryCode,
                        Description: query.Description,
                        QueryText: query.QueryText,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * CreateQuery
     *
     * @param query
     * @returns {Promise<any>}
     */
    CreateQuery(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Query/CreateQuery`,

                    {
                        QueryTypeId: query.QueryTypeId,
                        QueryCode: query.QueryCode,
                        Description: query.Description,
                        QueryText: query.QueryText,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
