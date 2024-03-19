import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ApiUserDefinitionApiResponse } from "app/ui/apiUserDefinition";

@Injectable()
export class SearchApiUserDefinitionService implements Resolve<any> {
    apiUserDefinitionApiResponse: ApiUserDefinitionApiResponse;
    routeParams: any;
    apiUser: any;
    onSearchApiUserDefinitionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchApiUserDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.FillApiUserDefinitionTable(this.apiUser)]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    FillApiUserDefinitionTable(apiUser): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.apiUserDefinitionApiResponse == undefined) {
                this.apiUserDefinitionApiResponse =
                    new ApiUserDefinitionApiResponse();
                this.apiUserDefinitionApiResponse.UserList = [];
            }
            this.onSearchApiUserDefinitionChanged.next(
                this.apiUserDefinitionApiResponse
            );
            resolve(this.apiUserDefinitionApiResponse);
        });
    }
    /**
     * SearchApiUser
     *
     * @returns {Promise<any>}
     */
    SearchApiUser(apiUser): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post<ApiUserDefinitionApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/SearchApiUser`,
                    {
                        Email: apiUser.Email,
                        ApiKey: apiUser.ApiKey,
                        UserName: apiUser.UserName,
                        UserFullName: apiUser.UserFullName,
                        SelectedUserStatus: apiUser.SelectedUserStatus,
                        InsertBeginDateTime: apiUser.InsertBeginDateTime,
                        InsertEndDateTime: apiUser.InsertEndDateTime,
                        UpdateBeginDateTime: apiUser.UpdateBeginDateTime,
                        UpdateEndDateTime: apiUser.UpdateEndDateTime,
                        TenantId: apiUser.TenantId,
                        UserTypeId: apiUser.UserTypeId,
                    }
                )
                .subscribe((response: ApiUserDefinitionApiResponse) => {
                    this.apiUserDefinitionApiResponse = response;
                    this.onSearchApiUserDefinitionChanged.next(
                        this.apiUserDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteApiUser
     *
     * @param apiUser
     * @returns {Promise<any>}
     */
    DeleteApiUser(apiUser): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApiUserDefinition/DeleteApiUser?deleteUserId=` +
                        apiUser.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
