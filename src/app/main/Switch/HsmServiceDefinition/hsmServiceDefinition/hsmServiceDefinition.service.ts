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

@Injectable()
export class HsmServiceDefinitionService implements Resolve<any> {
    routeParams: any;
    hsmService: any;
    onHsmServiceDefinitionChanged: BehaviorSubject<any>;
    hsmConnectionList: HsmConnectionListEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onHsmServiceDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetHsmServiceDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetHsmServiceDefinition
     *
     * @returns {Promise<any>}
     */
    GetHsmServiceDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onHsmServiceDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/GetHsmServiceDefinition?hsmServiceDefinitionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.hsmService = response.SwitchApplication;
                        this.onHsmServiceDefinitionChanged.next(
                            this.hsmService
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateHsmServiceDefinition
     *
     * @param hsmService
     * @returns {Promise<any>}
     */
    CreateHsmServiceDefinition(hsmService): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/CreateHsmServiceDefinition`,
                    {
                        ServiceName: hsmService.ServiceName,
                        Description: hsmService.Description,
                        UserTypeId: hsmService.UserTypeId,
                        ServerAddress: hsmService.ServerAddress,
                        ServerPort: hsmService.ServerPort,
                        ApplicationProfileId: hsmService.ApplicationProfileId,
                        ClusterId: hsmService.ClusterId,
                        InstanceId: hsmService.InstanceId,
                        ThreadCount: hsmService.ThreadCount,
                        HasRestApi: hsmService.HasRestApi,
                        RestApiPort: hsmService.RestApiPort,
                        ConnectionTimeout: hsmService.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            hsmService.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateHsmServiceDefinition
     *
     * @param hsmService
     * @returns {Promise<any>}
     */
    UpdateHsmServiceDefinition(hsmService): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/UpdateHsmServiceDefinition`,
                    {
                        Id: hsmService.Id,
                        ServiceName: hsmService.ServiceName,
                        Description: hsmService.Description,
                        UserTypeId: hsmService.UserTypeId,
                        ServerAddress: hsmService.ServerAddress,
                        ServerPort: hsmService.ServerPort,
                        ApplicationProfileId: hsmService.ApplicationProfileId,
                        ClusterId: hsmService.ClusterId,
                        InstanceId: hsmService.InstanceId,
                        ThreadCount: hsmService.ThreadCount,
                        HasRestApi: hsmService.HasRestApi,
                        RestApiPort: hsmService.RestApiPort,
                        ConnectionTimeout: hsmService.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            hsmService.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateHsmDeviceConnection
     *
     * @param hsmService
     * @returns {Promise<any>}
     */
    CreateHsmDeviceConnection(hsmService): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/CreateHsmDeviceConnection`,

                    {
                        ApplicationId: hsmService.ApplicationId,
                        HsmDeviceId: hsmService.HsmDeviceId,
                        ConnectionCount: hsmService.ConnectionCount,
                        ConnectionTimeout: hsmService.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            hsmService.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateHsmDeviceConnection
     *
     * @param hsmService
     * @returns {Promise<any>}
     */
    UpdateHsmDeviceConnection(hsmService): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/UpdateHsmDeviceConnection`,
                    {
                        Id: hsmService.Id,
                        HsmDeviceId: hsmService.HsmDeviceId,
                        ConnectionCount: hsmService.ConnectionCount,
                        ConnectionTimeout: hsmService.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            hsmService.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteHsmDeviceConnection
     *
     * @param hsmService
     * @returns {Promise<any>}
     */
    DeleteHsmDeviceConnection(hsmService): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/DeleteHsmDeviceConnection?deleteHsmDeviceConnectionId=` +
                        hsmService.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
