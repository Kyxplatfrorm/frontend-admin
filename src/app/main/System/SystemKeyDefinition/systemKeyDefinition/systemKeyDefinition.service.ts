import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable()
export class SystemKeyDefinitionService implements Resolve<any> {
    routeParams: any;
    onSystemKeyDefinitionChanged: BehaviorSubject<any>;
    systemKey: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSystemKeyDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSystemKeyDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSystemKeyDefinition
     *
     * @returns {Promise<any>}
     */
    GetSystemKeyDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSystemKeyDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SystemKeyDefinition/GetSystemKeyDefinition?systemKeyDefinitionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.systemKey = response.SystemKeyDefinition;
                        this.onSystemKeyDefinitionChanged.next(this.systemKey);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateSystemKeyDefinition
     *
     * @param systemKey
     * @returns {Promise<any>}
     */
    CreateSystemKeyDefinition(systemKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemKeyDefinition/CreateSystemKeyDefinition`,
                    {
                        KeyTypeId: systemKey.KeyTypeId,
                        KeyCode: systemKey.KeyCode,
                        KeyValue: systemKey.KeyValue,
                        Description: systemKey.Description,
                        EncryptedKeySecretPassword:
                            systemKey.EncryptedKeySecretPassword,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSystemKeyDefinition
     *
     * @param systemKey
     * @returns {Promise<any>}
     */
    UpdateSystemKeyDefinition(systemKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemKeyDefinition/UpdateSystemKeyDefinition`,
                    {
                        Id: systemKey.Id,
                        KeyTypeId: systemKey.KeyTypeId,
                        KeyCode: systemKey.KeyCode,
                        KeyValue: systemKey.KeyValue,
                        Description: systemKey.Description,
                        EncryptedKeySecretPassword:
                            systemKey.EncryptedKeySecretPassword,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
