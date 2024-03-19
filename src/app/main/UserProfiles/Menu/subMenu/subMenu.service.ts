import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { ParentMenuApiResponse, SubMenuEntity } from "app/ui/menuDefinition";

@Injectable()
export class SubMenuService implements Resolve<any> {
    routeParams: any;
    onSubMenuChanged: BehaviorSubject<any>;
    onParentMenuChanged: BehaviorSubject<any>;
    menu: any;
    subMenuList: SubMenuEntity[];
    parentMenuApiResponse: ParentMenuApiResponse;
    menusModuleId: number;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSubMenuChanged = new BehaviorSubject({});
        this.onParentMenuChanged = new BehaviorSubject({});
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
            Promise.all([this.GetMenu()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getSubMenu
     *
     * @returns {Promise<any>}
     */
    getSubMenu(): Promise<any> {
        return this.menu.SubMenuList;
    }

    /**
     * GetMenu
     *
     * @returns {Promise<any>}
     */
    GetMenu(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSubMenuChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Menu/GetMenu?menuId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.menu = response.MenuEntity;
                        this.onSubMenuChanged.next(this.menu);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * GetParentMenus
     *
     * @returns {Promise<any>}
     */
    GetParentMenus(menusModuleId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ParentMenuApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/GetParentMenus?parentMenuModuleId=` +
                        menusModuleId
                )
                .subscribe((response: ParentMenuApiResponse) => {
                    this.parentMenuApiResponse = response;
                    this.onParentMenuChanged.next(this.parentMenuApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateMenu
     *
     * @param menu
     * @returns {Promise<any>}
     */
    UpdateMenu(menu): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/UpdateMenu`,
                    {
                        Id: menu.Id,
                        MenuOrder: menu.MenuOrder,
                        MenuCode: menu.MenuCode,
                        MenuName: menu.MenuName,
                        TranslateKey: menu.TranslateKey,
                        HasParentMenu: menu.HasParentMenu,
                        ParentMenuId: menu.ParentMenuId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateMenu
     *
     * @param menu
     * @returns {Promise<any>}
     */
    CreateMenu(menu): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/CreateMenu`,

                    {
                        ProductModuleId: menu.ProductModuleId,
                        MenuOrder: menu.MenuOrder,
                        MenuCode: menu.MenuCode,
                        MenuName: menu.MenuName,
                        TranslateKey: menu.TranslateKey,
                        HasParentMenu: menu.HasParentMenu,
                        ParentMenuId: menu.ParentMenuId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
     * CreateSubMenu
     *
     * @param menu
     * @returns {Promise<any>}
     */
    CreateSubMenu(menu): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/CreateSubMenu`,

                    {
                        ParentMenuId: menu.ParentMenuId,
                        MenuOrder: menu.MenuOrder,
                        MenuCode: menu.MenuCode,
                        MenuName: menu.MenuName,
                        TranslateKey: menu.TranslateKey,
                        MenuIcon: menu.MenuIcon,
                        MenuUrl: menu.MenuUrl,
                        ControllerName: menu.ControllerName,
                        RelatedControllerName: menu.RelatedControllerName,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSubMenu
     *
     * @param menu
     * @returns {Promise<any>}
     */
    UpdateSubMenu(menu): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/UpdateSubMenu`,
                    {
                        Id: menu.Id,
                        ParentMenuId: menu.ParentMenuId,
                        MenuOrder: menu.MenuOrder,
                        MenuCode: menu.MenuCode,
                        MenuName: menu.MenuName,
                        TranslateKey: menu.TranslateKey,
                        MenuIcon: menu.MenuIcon,
                        MenuUrl: menu.MenuUrl,
                        ControllerName: menu.ControllerName,
                        RelatedControllerName: menu.RelatedControllerName,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSubMenu
     *
     * @param menu
     * @returns {Promise<any>}
     */
    DeleteSubMenu(menu): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Menu/DeleteSubMenu?deleteSubMenuId=` +
                        menu.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
