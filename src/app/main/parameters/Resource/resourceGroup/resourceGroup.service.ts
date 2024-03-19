import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ResourceGroupEntity } from "app/ui/resourceGroups";

@Injectable()
export class ResourceGroupService implements Resolve<any> {
    routeParams: any;
    onResourceGroupChanged: BehaviorSubject<any>;
    resourceGroup: any;
    resourceList: ResourceGroupEntity[];
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onResourceGroupChanged = new BehaviorSubject({});
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
            Promise.all([this.GetResourceGroup()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetResource
     *
     * @returns {Promise<any>}
     */
    GetResource(): Promise<any> {
        return this.resourceGroup.ResourceList;
    }

    /**
     * GetResourceGroup
     *
     * @returns {Promise<any>}
     */
    GetResourceGroup(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onResourceGroupChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Resource/GetResourceGroup?resourceGroupId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.resourceGroup = response.ResourceGroup;
                        this.resourceList = response.ResourceList;
                        this.resourceGroup.ResourceList = this.resourceList;
                        this.onResourceGroupChanged.next(this.resourceGroup);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateResourceGroup
     *
     * @param resourceGroup
     * @returns {Promise<any>}
     */
    UpdateResourceGroup(resourceGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Resource/UpdateResourceGroup`,
                    {
                        Id: resourceGroup.Id,
                        GroupCode: resourceGroup.GroupCode,
                        Description: resourceGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateResourceGroup
     *
     * @param resourceGroup
     * @returns {Promise<any>}
     */
    CreateResourceGroup(resourceGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Resource/CreateResourceGroup`,

                    {
                        GroupCode: resourceGroup.GroupCode,
                        Description: resourceGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * CreateResource
     *
     * @param resourceGroup
     * @returns {Promise<any>}
     */
    CreateResource(resourceGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Resource/CreateResource`,

                    {
                        ConfigGroupId: resourceGroup.ConfigGroupId,
                        ResourceCode: resourceGroup.ResourceCode,
                        LanguageCode: resourceGroup.LanguageCode,
                        Description: resourceGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateResource
     *
     * @param resourceGroup
     * @returns {Promise<any>}
     */
    UpdateResource(resourceGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Resource/UpdateResource`,

                    {
                        Id: resourceGroup.Id,
                        ConfigGroupId: resourceGroup.ConfigGroupId,
                        ResourceCode: resourceGroup.ResourceCode,
                        LanguageCode: resourceGroup.LanguageCode,
                        Description: resourceGroup.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteResource
     *
     * @param resourceGroup
     * @returns {Promise<any>}
     */
    DeleteResourceGroup(resourceGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Resource/DeleteResource?deleteResourceId=` +
                        resourceGroup.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
