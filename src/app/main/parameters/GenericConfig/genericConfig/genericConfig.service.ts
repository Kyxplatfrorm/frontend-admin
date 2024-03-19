import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { GenericConfigEntity } from "app/ui/genericConfigGroups";

@Injectable()
export class GenericConfigService implements Resolve<any> {
    routeParams: any;
    genericConfigGroups: any;
    onGenericConfigChanged: BehaviorSubject<any>;
    genericConfig: any;
    genericConfigList: GenericConfigEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onGenericConfigChanged = new BehaviorSubject({});
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
            Promise.all([this.GetGenericConfigGroup()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GenericConfig
     *
     * @returns {Promise<any>}
     */
    GenericConfig(): Promise<any> {
        return this.genericConfigGroups.GenericConfigList;
    }

    /**
     * GetGenericConfigGroup
     *
     * @returns {Promise<any>}
     */
    GetGenericConfigGroup(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onGenericConfigChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/GetGenericConfigGroup?configGroupId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.genericConfigGroups = response.GenericConfigGroup;
                        this.genericConfigList = response.GenericConfigList;
                        this.genericConfigGroups.GenericConfigList =
                            this.genericConfigList;
                        this.onGenericConfigChanged.next(
                            this.genericConfigGroups
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateGenericConfigGroups
     *
     * @param genericConfigGroups
     * @returns {Promise<any>}
     */
    UpdateGenericConfigGroup(genericConfigGroups): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/UpdateGenericConfigGroup`,
                    {
                        Id: genericConfigGroups.Id,
                        GroupCode: genericConfigGroups.GroupCode,
                        Description: genericConfigGroups.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateGenericConfigGroups
     *
     * @param genericConfigGroups
     * @returns {Promise<any>}
     */
    CreateGenericConfigGroup(genericConfigGroups): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/CreateGenericConfigGroup`,

                    {
                        GroupCode: genericConfigGroups.GroupCode,
                        Description: genericConfigGroups.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * CreateGenericConfig
     *
     * @param genericConfig
     * @returns {Promise<any>}
     */
    CreateGenericConfig(genericConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/CreateGenericConfig`,

                    {
                        ConfigGroupId: genericConfig.ConfigGroupId,
                        ConfigKey: genericConfig.ConfigKey,
                        ConfigValue: genericConfig.ConfigValue,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateGenericConfig
     *
     * @param genericConfig
     * @returns {Promise<any>}
     */
    UpdateGenericConfig(genericConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/UpdateGenericConfig`,

                    {
                        Id: genericConfig.Id,
                        ConfigValue: genericConfig.ConfigValue,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteGenericConfig
     *
     * @param genericConfig
     * @returns {Promise<any>}
     */
    DeleteGenericConfig(genericConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/DeleteGenericConfig?deleteConfigId=` +
                        genericConfig.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
