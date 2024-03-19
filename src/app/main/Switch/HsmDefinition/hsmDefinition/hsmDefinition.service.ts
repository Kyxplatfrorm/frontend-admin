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
export class HsmDefinitionService implements Resolve<any> {
    routeParams: any;
    hsmDefinition: any;
    onHsmDefinitionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onHsmDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetHsmDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetHsmDefinition
     *
     * @returns {Promise<any>}
     */
    GetHsmDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onHsmDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/HsmDefinition/GetHsmDefinition?hsmDefinitionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.hsmDefinition = response.HsmDefinition;
                        this.onHsmDefinitionChanged.next(this.hsmDefinition);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateHsmDefinition
     *
     * @param hsmDefinition
     * @returns {Promise<any>}
     */
    CreateHsmDefinition(hsmDefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmDefinition/CreateHsmDefinition`,

                    {
                        HsmTypeId: hsmDefinition.HsmTypeId,
                        LmkTypeId: hsmDefinition.LmkTypeId,
                        Description: hsmDefinition.Description,
                        HsmIpAddress: hsmDefinition.HsmIpAddress,
                        HsmPort: hsmDefinition.HsmPort,
                        PinLmkLength: hsmDefinition.PinLmkLength,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateHsmDefinition
     *
     * @param hsmDefinition
     * @returns {Promise<any>}
     */
    UpdateHsmDefinition(hsmDefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmDefinition/UpdateHsmDefinition`,
                    {
                        Id: hsmDefinition.Id,
                        HsmTypeId: hsmDefinition.HsmTypeId,
                        LmkTypeId: hsmDefinition.LmkTypeId,
                        Description: hsmDefinition.Description,
                        HsmIpAddress: hsmDefinition.HsmIpAddress,
                        HsmPort: hsmDefinition.HsmPort,
                        PinLmkLength: hsmDefinition.PinLmkLength,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
