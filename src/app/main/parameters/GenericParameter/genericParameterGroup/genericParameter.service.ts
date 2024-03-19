import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { GenericParameterEntity } from "app/ui/genericParameterGroups";

@Injectable()
export class GenericParameterService implements Resolve<any> {
    routeParams: any;
    genericParameterGroup: any;
    onGenericParameterChanged: BehaviorSubject<any>;
    genericParameterList: GenericParameterEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onGenericParameterChanged = new BehaviorSubject({});
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
            Promise.all([this.GetGenericParameterGroup()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetGenericParameterGroup
     *
     * @returns {Promise<any>}
     */
    GetGenericParameterGroup(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onGenericParameterChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/GetGenericParameterGroup?parameterGroupId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.genericParameterGroup =
                            response.GenericParameterGroup;
                        this.genericParameterList =
                            response.GenericParameterList;
                        this.genericParameterGroup.GenericParameterList =
                            this.genericParameterList;
                        this.onGenericParameterChanged.next(
                            this.genericParameterGroup
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
    /**
     * CreateGenericParameterGroup
     *
     * @param genericParameterGroup
     * @returns {Promise<any>}
     */
    CreateGenericParameterGroup(genericParameterGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/CreateGenericParameterGroup`,

                    {
                        GroupCode: genericParameterGroup.GroupCode,
                        Description: genericParameterGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateGenericParameterGroup
     *
     * @param genericParameterGroup
     * @returns {Promise<any>}
     */
    UpdateGenericParameterGroup(genericParameterGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/UpdateGenericParameterGroup`,
                    {
                        Id: genericParameterGroup.Id,
                        GroupCode: genericParameterGroup.GroupCode,
                        Description: genericParameterGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetGenericParameter
     *
     * @returns {Promise<any>}
     */
    GetGenericParameter(): Promise<any> {
        return this.genericParameterGroup.GenericParameterList;
    }
    /**
     * CreateGenericParameter
     *
     * @param genericParameterGroup
     * @returns {Promise<any>}
     */
    CreateGenericParameter(genericParameterGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/CreateGenericParameter`,

                    {
                        ConfigGroupId: genericParameterGroup.ConfigGroupId,
                        ParameterKey: genericParameterGroup.ParameterKey,
                        ParameterValue: genericParameterGroup.ParameterValue,
                        ParameterValue1: genericParameterGroup.ParameterValue1,
                        Description: genericParameterGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateGenericParameter
     *
     * @param genericParameterGroup
     * @returns {Promise<any>}
     */
    UpdateGenericParameter(genericParameterGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/UpdateGenericParameter`,
                    {
                        Id: genericParameterGroup.Id,
                        ParameterKey: genericParameterGroup.ParameterKey,
                        ParameterValue: genericParameterGroup.ParameterValue,
                        ParameterValue1: genericParameterGroup.ParameterValue1,
                        Description: genericParameterGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteGenericParameter
     *
     * @param genericParameterGroup
     * @returns {Promise<any>}
     */
    DeleteGenericParameter(genericParameterGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericParameter/DeleteGenericParameter?deleteParameterId=` +
                        genericParameterGroup.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
