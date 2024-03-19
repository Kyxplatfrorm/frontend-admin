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
    ParameterApplicationTypeEntity,
    ParameterUserTypeEntity,
} from "app/ui/applicationDefinition";

@Injectable()
export class ApplicationDefinitionService implements Resolve<any> {
    routeParams: any;
    onApplicationDefinitionChanged: BehaviorSubject<any>;
    onAppTypeChanged: BehaviorSubject<any>;
    applicationdefinition: any;
    parameterApplicationList: ParameterApplicationTypeEntity[];
    parameterUserList: ParameterUserTypeEntity[];

    onUserTypeChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onApplicationDefinitionChanged = new BehaviorSubject({});
        this.onAppTypeChanged = new BehaviorSubject({});
        this.onUserTypeChanged = new BehaviorSubject({});
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
            Promise.all([this.GetApplicationDefinition()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetApplicationDefinition
     *
     * @returns {Promise<any>}
     */
    GetApplicationDefinition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onApplicationDefinitionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/GetApplicationDefinition?applicationDefinitionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.applicationdefinition =
                            response.ApplicationDefinition;
                        this.onApplicationDefinitionChanged.next(
                            this.applicationdefinition
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateApplicationDefinition
     *
     * @param aplicationdefinition
     * @returns {Promise<any>}
     */
    UpdateApplicationDefinition(aplicationdefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/UpdateApplicationDefinition`,
                    {
                        Id: aplicationdefinition.Id,
                        ServiceName: aplicationdefinition.ServiceName,
                        Description: aplicationdefinition.Description,
                        ApplicationTypeId:
                            aplicationdefinition.ApplicationTypeId,
                        UserTypeId: aplicationdefinition.UserTypeId,
                        ServerAddress: aplicationdefinition.ServerAddress,
                        ApplicationProfileId:
                            aplicationdefinition.ApplicationProfileId,
                        ClusterId: aplicationdefinition.ClusterId,
                        InstanceId: aplicationdefinition.InstanceId,
                        ThreadCount: aplicationdefinition.ThreadCount,
                        HasRestApi: aplicationdefinition.HasRestApi,
                        RestApiPort: aplicationdefinition.RestApiPort,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateApplicationDefinition
     *
     * @param aplicationdefinition
     * @returns {Promise<any>}
     */
    CreateApplicationDefinition(aplicationdefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/CreateApplicationDefinition`,
                    {
                        ServiceName: aplicationdefinition.ServiceName,
                        Description: aplicationdefinition.Description,
                        ApplicationTypeId:
                            aplicationdefinition.ApplicationTypeId,
                        UserTypeId: aplicationdefinition.UserTypeId,
                        ServerAddress: aplicationdefinition.ServerAddress,
                        ApplicationProfileId:
                            aplicationdefinition.ApplicationProfileId,
                        ClusterId: aplicationdefinition.ClusterId,
                        InstanceId: aplicationdefinition.InstanceId,
                        ThreadCount: aplicationdefinition.ThreadCount,
                        HasRestApi: aplicationdefinition.HasRestApi,
                        RestApiPort: aplicationdefinition.RestApiPort,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteApplicationDefinition
     *
     * @param aplicationdefinition
     * @returns {Promise<any>}
     */
    DeleteApplicationDefinition(aplicationdefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationDefinition/DeleteApplicationDefinition?deleteApplicationDefinitionId=` +
                        aplicationdefinition.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
