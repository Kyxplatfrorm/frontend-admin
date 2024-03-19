import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PluginApiResponse } from "app/ui/plugin";
import { TenantApiResponse } from "app/ui/tenant";

@Injectable({ providedIn: "root" })
export class PluginService {
    pluginApiResponse: PluginApiResponse;
    tenantDefApiResponse: TenantApiResponse;
    onPluginChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onPluginChanged = new BehaviorSubject({});
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
            Promise.all([this.GetPlugins()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetPlugins
     *
     * @returns {Promise<any>}
     */
    GetPlugins(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<PluginApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Plugin/GetPlugins`
                )
                .subscribe((response: PluginApiResponse) => {
                    this.pluginApiResponse = response;
                    this.onPluginChanged.next(this.pluginApiResponse);
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
                    `${environment.apiUrl}/core/coreapi/v1.0/Plugin/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantDefApiResponse = response;
                    this.onPluginChanged.next(this.tenantDefApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeletePlugin
     *
     * @param plugin
     * @returns {Promise<any>}
     */
    DeletePlugins(plugin): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Plugin/DeletePlugin?deletePluginId=` +
                        plugin.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
