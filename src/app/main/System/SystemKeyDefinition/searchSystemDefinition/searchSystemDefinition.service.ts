import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SystemKeyApiResponse } from "app/ui/systemKeyProfile";

@Injectable()
export class SearchSystemKeyDefinitionService implements Resolve<any> {
    systemKeyApiResponse: SystemKeyApiResponse;
    routeParams: any;
    systemKey: any;
    onSearchSystemKeyDefinitionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSystemKeyDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.FillSystemDefinitionTable(this.systemKey)]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
    
    FillSystemDefinitionTable(systemKey): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.systemKeyApiResponse == undefined) {
                this.systemKeyApiResponse = new SystemKeyApiResponse();
                this.systemKeyApiResponse.IsSucceeded = true;
                this.systemKeyApiResponse.SystemKeyDefinitionList = [];
            }
            this.onSearchSystemKeyDefinitionChanged.next(
                this.systemKeyApiResponse
            );
            resolve(this.systemKeyApiResponse);
        });
    }

    /**
     * SearchSystemKeyDefinition
     *
     * @returns {Promise<any>}
     */
    SearchSystemKeyDefinition(systemKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemKeyDefinition/SearchSystemKeyDefinition`,
                    {
                        KeyTypeId: systemKey.KeyTypeId,
                        KeyCode: systemKey.KeyCode,
                        KeyValue: systemKey.KeyValue,
                        Description: systemKey.Description,
                        SearchStartDate: systemKey.SearchStartDate,
                        SearchEndDate: systemKey.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.systemKeyApiResponse = response;
                    this.onSearchSystemKeyDefinitionChanged.next(
                        this.systemKeyApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSystemKeyDefinition
     *
     * @param systemKey
     * @returns {Promise<any>}
     */
    DeleteSystemKeyDefinition(systemKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemKeyDefinition/DeleteSystemKeyDefinition?deleteSystemKeyDefinitionId=` +
                        systemKey.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
