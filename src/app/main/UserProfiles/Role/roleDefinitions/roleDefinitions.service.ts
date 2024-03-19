import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    MenuTreeEntity,
    RoleApiResponse,
    TenantApiResponse,
} from "app/ui/roleDefinition";

@Injectable({ providedIn: "root" })
export class RoleDefinitionsService {
    roleApiResponse: RoleApiResponse;
    tenantApiResponse: TenantApiResponse;
    onRoleDefinitionsChanged: BehaviorSubject<any>;
    menuList: MenuTreeEntity[];
    routeParams: any;
    role: any;
    moduleId: number;

    constructor(private http: HttpClient) {
        this.onRoleDefinitionsChanged = new BehaviorSubject({});
    }

    GetSelectedModuleId() {
        if (this.moduleId == undefined) {
            var localId = localStorage.getItem("selectedRoleModuleId");
            if (localId != undefined) {
                this.moduleId = parseInt(localId);
            }
        }
        return this.moduleId;
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
            Promise.all([this.GetRoles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetRoles
     *
     * @returns {Promise<any>}
     */
    GetRoles(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams && this.routeParams?.id === "new") {
                this.onRoleDefinitionsChanged.next(false);
                resolve(false);
            } else {
                this.moduleId = this.routeParams?.id;
                if (this.moduleId != undefined) {
                    localStorage.setItem(
                        "selectedRoleModuleId",
                        this.moduleId.toString()
                    );
                }
                this.http
                    .get<RoleApiResponse>(
                        `${environment.apiUrl}/core/coreapi/v1.0/Role/GetRoles?productModuleId=` +
                            this.routeParams?.id
                    )
                    .subscribe((response: RoleApiResponse) => {
                        this.roleApiResponse = response;
                        this.onRoleDefinitionsChanged.next(
                            this.roleApiResponse
                        );
                        resolve(response);
                    }, reject);
            }
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
                    `${environment.apiUrl}/core/coreapi/v1.0/Role/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onRoleDefinitionsChanged.next(this.tenantApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteRole
     *
     * @param role
     * @returns {Promise<any>}
     */
    DeleteRole(role): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Role/DeleteRole?deleteRoleId=` +
                        role.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
