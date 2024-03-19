import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { HsmConnectionListEntity } from "app/ui/hsmServiceDefinition";
import { DetailListEntity } from "app/ui/switchKeyProfile";

@Injectable()
export class SwitchKeyProfileService implements Resolve<any> {
    routeParams: any;
    swithcKey: any;
    onSwitchKeyProfileChanged: BehaviorSubject<any>;
    detailList: DetailListEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSwitchKeyProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchKeyProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetHsmDefinition
     *
     * @returns {Promise<any>}
     */
    GetSwitchKeyProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSwitchKeyProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/GetSwitchKeyProfile?switchKeyProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.swithcKey = response.KeyProfile;
                        this.onSwitchKeyProfileChanged.next(this.swithcKey);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateSwitchKeyProfile
     *
     * @param swithcKey
     * @returns {Promise<any>}
     */
    CreateSwitchKeyProfile(swithcKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/CreateSwitchKeyProfile`,

                    { ProfileName: swithcKey.ProfileName }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchKeyProfile
     *
     * @param swithcKey
     * @returns {Promise<any>}
     */
    UpdateSwitchKeyProfile(swithcKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/UpdateSwitchKeyProfile`,
                    { Id: swithcKey.Id, ProfileName: swithcKey.ProfileName }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateSwitchKeyProfileDetail
     *
     * @param swithcKey
     * @returns {Promise<any>}
     */
    CreateSwitchKeyProfileDetail(swithcKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/CreateSwitchKeyProfileDetail`,
                    {
                        ProfileId: swithcKey.ProfileId,
                        KeyIndex: swithcKey.KeyIndex,
                        KeyVariant: swithcKey.KeyVariant,
                        KeyTypeId: swithcKey.KeyTypeId,
                        KeyValue: swithcKey.KeyValue,
                        KeyCheckValue: swithcKey.KeyCheckValue,
                        TemporaryKeyValue: swithcKey.TemporaryKeyValue,
                        TemporaryKeyCheckValue:
                            swithcKey.TemporaryKeyCheckValue,
                        KeyLmkTypeId: swithcKey.KeyLmkTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchKeyProfileDetail
     *
     * @param swithcKey
     * @returns {Promise<any>}
     */
    UpdateSwitchKeyProfileDetail(swithcKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/UpdateSwitchKeyProfileDetail`,
                    {
                        Id: swithcKey.Id,
                        ProfileId: swithcKey.ProfileId,
                        KeyIndex: swithcKey.KeyIndex,
                        KeyVariant: swithcKey.KeyVariant,
                        KeyTypeId: swithcKey.KeyTypeId,
                        KeyValue: swithcKey.KeyValue,
                        KeyCheckValue: swithcKey.KeyCheckValue,
                        TemporaryKeyValue: swithcKey.TemporaryKeyValue,
                        TemporaryKeyCheckValue:
                            swithcKey.TemporaryKeyCheckValue,
                        KeyLmkTypeId: swithcKey.KeyLmkTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchKeyProfileDetail
     *
     * @param swithcKey
     * @returns {Promise<any>}
     */
    DeleteSwitchKeyProfileDetail(swithcKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/DeleteSwitchKeyProfileDetail?deleteSwitchKeyProfileDetailId=` +
                        swithcKey.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
