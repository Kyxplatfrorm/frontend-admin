import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ResourceGroupsApiResponse } from "app/ui/resourceGroups";

@Injectable({ providedIn: "root" })
export class ResourceGroupsService {
    resourceGroupsApiResponse: ResourceGroupsApiResponse;
    onResourceGroupsChanged: BehaviorSubject<any>;
    constructor(private http: HttpClient) {
        this.onResourceGroupsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetResourceGroups()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetResourceGroups
     *
     * @returns {Promise<any>}
     */
    GetResourceGroups(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ResourceGroupsApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Resource/GetResourceGroups`
                )
                .subscribe((response: ResourceGroupsApiResponse) => {
                    this.resourceGroupsApiResponse = response;
                    this.onResourceGroupsChanged.next(
                        this.resourceGroupsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteResourceGroup
     *
     * @param resourceGroup
     * @returns {Promise<any>}
     */
    DeleteResourceGroups(resourceGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Resource/DeleteResourceGroup?deleteResourceGroupId=` +
                        resourceGroup.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
