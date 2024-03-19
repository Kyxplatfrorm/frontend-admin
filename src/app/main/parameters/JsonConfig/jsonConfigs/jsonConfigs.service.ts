import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { JsonConfigApiResponse, JsonConfigEntity } from "app/ui/jsonConfig";
import { TenantApiResponse } from "app/ui/tenant";

@Injectable({ providedIn: "root" })
export class JsonConfigsService {
    jsonConfigApiResponse: JsonConfigApiResponse;
    tenantDefApiResponse: TenantApiResponse;
    onJsonConfigChanged: BehaviorSubject<any>;
    onTenantChanged: BehaviorSubject<any>;
    jsonConfigList: JsonConfigEntity[];

    constructor(private http: HttpClient) {
        this.onJsonConfigChanged = new BehaviorSubject({});
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
            Promise.all([this.GetJsonConfigs()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetJsonConfigs
     *
     * @returns {Promise<any>}
     */
    GetJsonConfigs(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<JsonConfigApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/JsonConfig/GetJsonConfigs`
                )
                .subscribe((response: JsonConfigApiResponse) => {
                    this.jsonConfigApiResponse = response;
                    this.onJsonConfigChanged.next(this.jsonConfigApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTenants
     *
     * @returns {Promise<any>}
     */
    GetTenants(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TenantApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/JsonConfig/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantDefApiResponse = response;
                    this.onJsonConfigChanged.next(this.tenantDefApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteJsonConfigs
     *
     * @param jsonConfig
     * @returns {Promise<any>}
     */
    DeleteJsonConfigs(jsonConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/JsonConfig/DeleteJsonConfig?deleteJsonConfigId=` +
                        jsonConfig.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
