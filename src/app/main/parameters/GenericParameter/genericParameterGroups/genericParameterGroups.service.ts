import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    GenericParameterEntity,
    GenericParameterGroupsApiResponse,
} from "app/ui/genericParameterGroups";

@Injectable({ providedIn: "root" })
export class GenericParameterGroupsService {
    genericParameterGroupsApiResponse: GenericParameterGroupsApiResponse;
    onGenericParameterGroupsChanged: BehaviorSubject<any>;
    genericParameterGroup: any;
    genericParameterList: GenericParameterEntity[];

    constructor(private http: HttpClient) {
        this.onGenericParameterGroupsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetGenericParameterGroups()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetGenericParameterGroups
     *
     * @returns {Promise<any>}
     */
    GetGenericParameterGroups(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<GenericParameterGroupsApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/GetGenericParameterGroups`
                )
                .subscribe((response: GenericParameterGroupsApiResponse) => {
                    this.genericParameterGroupsApiResponse = response;
                    this.onGenericParameterGroupsChanged.next(
                        this.genericParameterGroupsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteGenericParameterGroups
     *
     * @param genericParameterGroup
     * @returns {Promise<any>}
     */
    DeleteGenericParameterGroups(genericParameterGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/DeleteGenericParameterGroup?deleteParameterGroupId=` +
                        genericParameterGroup.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
