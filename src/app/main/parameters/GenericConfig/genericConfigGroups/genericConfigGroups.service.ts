import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    GenericConfigEntity,
    GenericConfigGroupApiResponse,
    GenericConfigGroupEntity,
} from "app/ui/genericConfigGroups";

@Injectable({ providedIn: "root" })
export class GenericConfigGroupsService {
    genericConfigGroupApiResponse: GenericConfigGroupApiResponse;
    onGenericConfigGroupChanged: BehaviorSubject<any>;
    genericConfigList: GenericConfigEntity[];
    genericConfigGroupList: GenericConfigGroupEntity[];
    genericConfigGroups: any;

    constructor(private http: HttpClient) {
        this.onGenericConfigGroupChanged = new BehaviorSubject({});
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
            Promise.all([this.GetGenericConfigGroups()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetGenericConfigGroups
     *
     * @returns {Promise<any>}
     */
    GetGenericConfigGroups(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<GenericConfigGroupApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/GetGenericConfigGroups`
                )
                .subscribe((response: GenericConfigGroupApiResponse) => {
                    this.genericConfigGroupApiResponse = response;
                    this.onGenericConfigGroupChanged.next(
                        this.genericConfigGroupApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteConfigGroups
     *
     * @param genericConfigGroups
     * @returns {Promise<any>}
     */
    deleteConfigGroups(genericConfigGroups): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/GenericConfig/DeleteGenericConfigGroup?deleteConfigGroupId=` +
                        genericConfigGroups.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
