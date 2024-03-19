import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { PluginEntity } from "app/ui/plugin";
import { Tenant } from "app/main/Tenant/TenantDefinitions/tenantDetail/tenantDetail.model";

@Injectable()
export class PluginDetailService implements Resolve<any> {
    routeParams: any;
    plugin: any;
    tenant: Tenant;
    onPluginChanged: BehaviorSubject<any>;
    onTenantDetailChanged: BehaviorSubject<any>;
    pluginList: PluginEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onPluginChanged = new BehaviorSubject({});
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
            Promise.all([this.GetPluginDetail()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetPluginDetail
     *
     * @returns {Promise<any>}
     */
    GetPluginDetail(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onPluginChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Plugin/GetPlugin?pluginId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.plugin = response.Plugins;
                        this.onPluginChanged.next(this.plugin);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdatePluginDetail
     *
     * @param plugin
     * @returns {Promise<any>}
     */
    UpdatePluginDetail(plugin): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Plugin/UpdatePlugin`,
                    {
                        Id: plugin.Id,
                        PluginCode: plugin.PluginCode,
                        PluginGroupCode: plugin.PluginGroupCode,
                        PluginConfig: plugin.PluginConfig,
                        PluginFullClassName: plugin.PluginFullClassName,
                        PluginAssemblyName: plugin.PluginAssemblyName,
                        PluginPath: plugin.PluginPath,
                        PluginDescription: plugin.PluginDescription,
                        IsDefault: plugin.IsDefault,
                        TenantId: plugin.TenantId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreatePluginDetail
     *
     * @param plugin
     * @returns {Promise<any>}
     */
    CreatePluginDetail(plugin): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Plugin/CreatePlugin`,

                    {
                        PluginCode: plugin.PluginCode,
                        PluginGroupCode: plugin.PluginGroupCode,
                        PluginConfig: plugin.PluginConfig,
                        PluginFullClassName: plugin.PluginFullClassName,
                        PluginAssemblyName: plugin.PluginAssemblyName,
                        PluginPath: plugin.PluginPath,
                        PluginDescription: plugin.PluginDescription,
                        IsDefault: plugin.IsDefault,
                        TenantId: plugin.TenantId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
