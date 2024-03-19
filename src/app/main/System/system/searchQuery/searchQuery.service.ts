import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { UserApiResponse } from "app/ui/userDefinition";
import {
    QueryApiResponse,
    QueryTypeApiResponse,
    QueryTypeEntity,
} from "app/ui/query";

@Injectable()
export class SearchQueryService implements Resolve<any> {
    queryApiResponse: QueryApiResponse;
    queryTypeResponse: QueryTypeApiResponse;
    routeParams: any;
    query: any;
    queryTypeList: QueryTypeEntity[];
    onSearchQueryChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchQueryChanged = new BehaviorSubject({});
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
            Promise.all([this.FillQueryTable(this.query)]).then(() => {
                resolve();
            }, reject);
        });
    }

    FillQueryTable(query): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.queryApiResponse == undefined) {
                this.queryApiResponse = new QueryApiResponse();
                this.queryApiResponse.IsSucceeded = true;
                this.queryApiResponse.QueryList = [];
            }
            this.onSearchQueryChanged.next(this.queryApiResponse);
            resolve(this.queryApiResponse);
        });
    }
    /**
     * SearchQuery
     *
     * @returns {Promise<any>}
     */
    SearchQuery(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Query/SearchQuery`,

                    {
                        QueryTypeId: query.QueryTypeId,
                        QueryCode: query.QueryCode,
                        Description: query.Description,
                        InsertBeginDateTime: query.InsertBeginDateTime,
                        InsertEndDateTime: query.InsertEndDateTime,
                        UpdateBeginDateTime: query.UpdateBeginDateTime,
                        UpdateEndDateTime: query.UpdateEndDateTime,
                    }
                )
                .subscribe((response: any) => {
                    this.queryApiResponse = response;
                    this.onSearchQueryChanged.next(this.queryApiResponse);
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetQueryTypes
     *
     * @returns {Promise<any>}
     */
    GetQueryTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<QueryTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Query/GetQueryTypes`
                )
                .subscribe((response: QueryTypeApiResponse) => {
                    this.queryTypeResponse = response;
                    this.onSearchQueryChanged.next(this.queryTypeResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteQuery
     *
     * @param query
     * @returns {Promise<any>}
     */
    DeleteQuery(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Query/DeleteQuery?deleteQueryId=` +
                        query.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    ClearSearchQueryDataSource() {
        if (this.queryApiResponse != undefined) {
            this.queryApiResponse.QueryList = [];
        }
    }
}
