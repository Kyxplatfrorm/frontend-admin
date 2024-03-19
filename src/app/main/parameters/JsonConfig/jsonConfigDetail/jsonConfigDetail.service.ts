import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { JsonConfigEntity } from "app/ui/jsonConfig";
import { Tenant } from "app/main/Tenant/TenantDefinitions/tenantDetail/tenantDetail.model";

@Injectable()
export class JsonConfigDetailService implements Resolve<any> {
    routeParams: any;
    jsonConfig: any;
    tenant: Tenant;
    onJsonConfigDetailChanged: BehaviorSubject<any>;
    onTenantDetailChanged: BehaviorSubject<any>;
    jsonConfigList: JsonConfigEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onJsonConfigDetailChanged = new BehaviorSubject({});
        this.onTenantDetailChanged == new BehaviorSubject({});
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
            Promise.all([this.GetJsonConfigDetail()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetJsonConfigDetail
     *
     * @returns {Promise<any>}
     */
    GetJsonConfigDetail(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onJsonConfigDetailChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/JsonConfig/GetJsonConfig?jsonConfigId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.jsonConfig = response.JsonConfig;
                        this.onJsonConfigDetailChanged.next(this.jsonConfig);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateJsonConfigDetail
     *
     * @param jsonConfig
     * @returns {Promise<any>}
     */
    UpdateJsonConfigDetail(jsonConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/JsonConfig/UpdateJsonConfig`,
                    {
                        Id: jsonConfig.Id,
                        TenantId: jsonConfig.TenantId,
                        ConfigCode: jsonConfig.ConfigCode,
                        Description: jsonConfig.Description,
                        ConfigValue: jsonConfig.ConfigValue,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateJsonConfigDetail
     *
     * @param jsonConfig
     * @returns {Promise<any>}
     */
    CreateJsonConfigDetail(jsonConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/JsonConfig/CreateJsonConfig`,

                    {
                        TenantId: jsonConfig.TenantId,
                        ConfigCode: jsonConfig.ConfigCode,
                        Description: jsonConfig.Description,
                        ConfigValue: jsonConfig.ConfigValue,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
