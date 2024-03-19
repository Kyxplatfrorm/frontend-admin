import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import {
    MenuListEntity,
    MenuTreeApiResponse,
    MenuTreeEntity,
} from "app/ui/roleDefinition";

@Injectable()
export class RoleDefinitionService implements Resolve<any> {
    routeParams: any;
    onRoleDefinitionChanged: BehaviorSubject<any>;
    role: any;
    menuTree: MenuTreeEntity[];
    menuTreeList: MenuListEntity[];
    menuTreeApiResponse: MenuTreeApiResponse;
    onMenuTreeChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onRoleDefinitionChanged = new BehaviorSubject({});
        this.onMenuTreeChanged = new BehaviorSubject({});
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
            Promise.all([this.GetRole()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetRole
     *
     * @returns {Promise<any>}
     */
    GetRole(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onRoleDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Role/GetRole?roleId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.role = response.Role;
                        this.onRoleDefinitionChanged.next(this.role);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * GetMenuTree
     *
     * @returns {Promise<any>}
     */
    GetMenuTree(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams && this.routeParams.id === "new") {
                this.onMenuTreeChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get<MenuTreeApiResponse>(
                        `${environment.apiUrl}/core/coreapi/v1.0/Role/GetMenuTree?menuTreeRoleId=` +
                            this.routeParams?.id
                    )
                    .subscribe((response: MenuTreeApiResponse) => {
                        this.menuTreeApiResponse = response;
                        this.onMenuTreeChanged.next(this.menuTreeApiResponse);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateRole
     *
     * @param role
     * @returns {Promise<any>}
     */
    CreateRole(role): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Role/CreateRole`,
                    {
                        TenantId: role.TenantId,
                        ProductModuleId: role.ProductModuleId,
                        RoleName: role.RoleName,
                        SelectedMenuList: role.SelectedMenuList,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateRole
     *
     * @param role
     * @returns {Promise<any>}
     */
    UpdateRole(role): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Role/UpdateRole`,
                    {
                        Id: role.Id,
                        RoleName: role.RoleName,
                        SelectedMenuList: role.SelectedMenuList,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
