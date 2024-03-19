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
    HsmConnectionEnttity,
    RoutingListEntity,
    SessionConfigListEntity,
    SessionConnectionListEntity,
    SessionListEntity,
} from "app/ui/switchApplicationDefinition";

@Injectable()
export class SwitchApplicationDefinitionService implements Resolve<any> {
    routeParams: any;
    onSwitchApplicationDefinitionChanged: BehaviorSubject<any>;
    switchApplication: any;
    hsmConnectionList: HsmConnectionEnttity[];
    sessionList: SessionListEntity[];
    routingList: RoutingListEntity[];
    sessionConfigList: SessionConfigListEntity[];
    sessionConnectionList: SessionConnectionListEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSwitchApplicationDefinitionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchApplication()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchApplication
     *
     * @returns {Promise<any>}
     */
    GetSwitchApplication(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSwitchApplicationDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetSwitchApplication?switchApplicationId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.switchApplication = response.SwitchApplication;
                        this.onSwitchApplicationDefinitionChanged.next(
                            this.switchApplication
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateSwitchApplication
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    CreateSwitchApplication(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/CreateSwitchApplication`,

                    {
                        ServiceName: switchApplication.ServiceName,
                        Description: switchApplication.Description,
                        ApplicationTypeId: switchApplication.ApplicationTypeId,
                        UserTypeId: switchApplication.UserTypeId,
                        ServerAddress: switchApplication.ServerAddress,
                        ApplicationProfileId:
                            switchApplication.ApplicationProfileId,
                        ClusterId: switchApplication.ClusterId,
                        InstanceId: switchApplication.InstanceId,
                        ThreadCount: switchApplication.ThreadCount,
                        HasRestApi: switchApplication.HasRestApi,
                        RestApiPort: switchApplication.RestApiPort,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchApplication
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    UpdateSwitchApplication(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/UpdateSwitchApplication`,
                    {
                        Id: switchApplication.Id,
                        ServiceName: switchApplication.ServiceName,
                        Description: switchApplication.Description,
                        ApplicationTypeId: switchApplication.ApplicationTypeId,
                        UserTypeId: switchApplication.UserTypeId,
                        ServerAddress: switchApplication.ServerAddress,
                        ApplicationProfileId:
                            switchApplication.ApplicationProfileId,
                        ClusterId: switchApplication.ClusterId,
                        InstanceId: switchApplication.InstanceId,
                        ThreadCount: switchApplication.ThreadCount,
                        HasRestApi: switchApplication.HasRestApi,
                        RestApiPort: switchApplication.RestApiPort,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateSwitchApplicationHsmConnection
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    CreateSwitchApplicationHsmConnection(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/CreateSwitchApplicationHsmConnection`,
                    {
                        ApplicationId: switchApplication.ApplicationId,
                        HsmServiceApplicationId:
                            switchApplication.HsmServiceApplicationId,
                        ConnectionCount: switchApplication.ConnectionCount,
                        ConnectionTimeout: switchApplication.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            switchApplication.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchApplicationHsmConnection
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    UpdateSwitchApplicationHsmConnection(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/UpdateSwitchApplicationHsmConnection`,
                    {
                        Id: switchApplication.Id,
                        ApplicationId: switchApplication.ApplicationId,
                        HsmServiceApplicationId:
                            switchApplication.HsmServiceApplicationId,
                        ConnectionCount: switchApplication.ConnectionCount,
                        ConnectionTimeout: switchApplication.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            switchApplication.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchApplicationHsmConnection
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    DeleteSwitchApplicationHsmConnection(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/DeleteSwitchApplicationHsmConnection?deleteSwitchHsmConnectionId=` +
                        switchApplication.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    // ----------------------------------------------------------------------

    /**
     * CreateSwitchApplicationSession
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    CreateSwitchApplicationSession(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/CreateSwitchApplicationSession`,
                    {
                        ApplicationId: switchApplication.ApplicationId,
                        Description: switchApplication.Description,
                        KeyProfileId: switchApplication.KeyProfileId,
                        Priority: switchApplication.Priority,
                        ConnectionTypeId: switchApplication.ConnectionTypeId,
                        EndPointTypeId: switchApplication.EndPointTypeId,
                        PinBlockFormat: switchApplication.PinBlockFormat,
                        ConnectionTimeout: switchApplication.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            switchApplication.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchApplicationSession
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    UpdateSwitchApplicationSession(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/UpdateSwitchApplicationSession`,
                    {
                        Id: switchApplication.Id,
                        ApplicationId: switchApplication.ApplicationId,
                        Description: switchApplication.Description,
                        KeyProfileId: switchApplication.KeyProfileId,
                        Priority: switchApplication.Priority,
                        ConnectionTypeId: switchApplication.ConnectionTypeId,
                        EndPointTypeId: switchApplication.EndPointTypeId,
                        PinBlockFormat: switchApplication.PinBlockFormat,
                        ConnectionTimeout: switchApplication.ConnectionTimeout,
                        ConnectionCheckTimeSecond:
                            switchApplication.ConnectionCheckTimeSecond,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchApplicationSession
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    DeleteSwitchApplicationSession(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/DeleteSwitchApplicationSession?deleteSwitchApplicationSessionId=` +
                        switchApplication.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    // ----------------------------------------------------------------------

    /**
     * CreateSwitchApplicationRouting
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    CreateSwitchApplicationRouting(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/CreateSwitchApplicationRouting`,
                    {
                        ApplicationId: switchApplication.ApplicationId,
                        FromSessionId: switchApplication.FromSessionId,
                        ToSessionId: switchApplication.ToSessionId,
                        Priority: switchApplication.Priority,
                        IsActive: switchApplication.IsActive,
                        HasRoutingRule: switchApplication.HasRoutingRule,
                        RoutingRuleName: switchApplication.RoutingRuleName,
                        RoutingLuaRule: switchApplication.RoutingLuaRule,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchApplicationRouting
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    UpdateSwitchApplicationRouting(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/UpdateSwitchApplicationRouting`,
                    {
                        Id: switchApplication.Id,
                        ApplicationId: switchApplication.ApplicationId,
                        FromSessionId: switchApplication.FromSessionId,
                        ToSessionId: switchApplication.ToSessionId,
                        Priority: switchApplication.Priority,
                        IsActive: switchApplication.IsActive,
                        HasRoutingRule: switchApplication.HasRoutingRule,
                        RoutingRuleName: switchApplication.RoutingRuleName,
                        RoutingLuaRule: switchApplication.RoutingLuaRule,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchApplicationRouting
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    DeleteSwitchApplicationRouting(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/DeleteSwitchApplicationRouting?deleteApplicationRoutingId=` +
                        switchApplication.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    // ----------------------------------------------------------------------

    /**
     * CreateSwitchApplicationSessionConfig
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    CreateSwitchApplicationSessionConfig(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/CreateSwitchApplicationSessionConfig`,
                    {
                        SessionId: switchApplication.SessionId,
                        ConfigKey: switchApplication.ConfigKey,
                        ConfigValue: switchApplication.ConfigValue,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchApplicationSessionConfig
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    UpdateSwitchApplicationSessionConfig(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/UpdateSwitchApplicationSessionConfig`,
                    {
                        Id: switchApplication.Id,
                        ConfigKey: switchApplication.ConfigKey,
                        ConfigValue: switchApplication.ConfigValue,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchApplicationSessionConfig
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    DeleteSwitchApplicationSessionConfig(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/DeleteSwitchApplicationSessionConfig?deleteSessionConfigId=` +
                        switchApplication.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    // ----------------------------------------------------------------------

    /**
     * CreateSwitchApplicationSessionConnection
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    CreateSwitchApplicationSessionConnection(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/CreateSwitchApplicationSessionConnection`,
                    {
                        SessionId: switchApplication.SessionId,
                        Priority: switchApplication.Priority,
                        Server: switchApplication.Server,
                        Port: switchApplication.Port,
                        PermittedIpAddress:
                            switchApplication.PermittedIpAddress,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchApplicationSessionConnection
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    UpdateSwitchApplicationSessionConnection(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/UpdateSwitchApplicationSessionConnection`,
                    {
                        Id: switchApplication.Id,
                        Priority: switchApplication.Priority,
                        Server: switchApplication.Server,
                        Port: switchApplication.Port,
                        PermittedIpAddress:
                            switchApplication.PermittedIpAddress,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchApplicationSessionConnection
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    DeleteSwitchApplicationSessionConnection(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/DeleteSwitchApplicationSessionConnection?deleteSessionConnectionId=` +
                        switchApplication.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
