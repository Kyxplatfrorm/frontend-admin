import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MenuDefinitionApiResponse } from "app/ui/menuDefinition";

@Injectable({ providedIn: "root" })
export class MenusService {
    menuDefinitionApiResponse: MenuDefinitionApiResponse;
    onMenusChanged: BehaviorSubject<any>;
    resource: any;
    routeParams: any;
    menuModuleId: number;

    constructor(private http: HttpClient) {
        this.onMenusChanged = new BehaviorSubject({});
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
            Promise.all([this.GetMenus()]).then(() => {
                resolve();
            }, reject);
        });
    }
    GetSelectedModuleId() {
        if (this.menuModuleId == undefined) {
            var localId = localStorage.getItem("selectedMenuModuleId");
            if (localId != undefined) {
                this.menuModuleId = parseInt(localId);
            }
        }
        return this.menuModuleId;
    }

    /**
     * GetMenus
     *
     * @returns {Promise<any>}
     */
    GetMenus(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams && this.routeParams.id === "new") {
                this.onMenusChanged.next(false);
                resolve(false);
            } else {
                this.menuModuleId = this.routeParams.id;
                if (this.menuModuleId != undefined) {
                    localStorage.setItem(
                        "selectedMenuModuleId",
                        this.menuModuleId.toString()
                    );
                }
                this.http
                    .get<MenuDefinitionApiResponse>(
                        `${environment.apiUrl}/core/coreapi/v1.0/Menu/GetMenus?getMenusModuleId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: MenuDefinitionApiResponse) => {
                        this.menuDefinitionApiResponse = response;
                        this.onMenusChanged.next(
                            this.menuDefinitionApiResponse
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * DeleteMenu
     *
     * @param menu
     * @returns {Promise<any>}
     */
    DeleteMenu(menu): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/DeleteMenu?deleteMenuId=` +
                        menu.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
