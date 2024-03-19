import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    AllApplicationSessionsApiResponse,
    ApplicationProfilesApiResponse,
    ApplicationSessionsApiResponse,
    HsmServicesApiResponse,
    SwitchApplicationApiResponse,
    SwitchApplicationTypesApiResponse,
    SwitchConnectionTypeApiResponse,
    SwitchEndPointTypesApiResponse,
    SwitchKeyProfilesApiResponse,
    UserTypeApiResponse,
} from "app/ui/switchApplicationDefinition";

@Injectable({ providedIn: "root" })
export class SwitchApplicationDefinitionsService {
    switchConnectionTypeApiResponse: SwitchConnectionTypeApiResponse;
    switchEndPointTypesApiResponse: SwitchEndPointTypesApiResponse;
    switchApplicationApiResponse: SwitchApplicationApiResponse;
    userTypeApiResponse: UserTypeApiResponse;
    switchApplicationTypesApiResponse: SwitchApplicationTypesApiResponse;
    hsmServicesApiResponse: HsmServicesApiResponse;
    applicationProfilesApiResponse: ApplicationProfilesApiResponse;
    switchKeyProfilesApiResponse: SwitchKeyProfilesApiResponse;
    allApplicationSessionsApiResponse: AllApplicationSessionsApiResponse;
    applicationSessionsApiResponse: ApplicationSessionsApiResponse;
    onSwitchApplicationDefinitionsChanged: BehaviorSubject<any>;
    switchApplication: any;

    constructor(private http: HttpClient) {
        this.onSwitchApplicationDefinitionsChanged = new BehaviorSubject({});
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
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetSwitchApplications()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchApplications
     *
     * @returns {Promise<any>}
     */
    GetSwitchApplications(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchApplicationApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetSwitchApplications`
                )
                .subscribe((response: SwitchApplicationApiResponse) => {
                    this.switchApplicationApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.switchApplicationApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchConnectionTypes
     *
     * @returns {Promise<any>}
     */
    GetSwitchConnectionTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchConnectionTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetSwitchConnectionTypes`
                )
                .subscribe((response: SwitchConnectionTypeApiResponse) => {
                    this.switchConnectionTypeApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.switchConnectionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchEndPointTypes
     *
     * @returns {Promise<any>}
     */
    GetSwitchEndPointTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchEndPointTypesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetSwitchEndPointTypes`
                )
                .subscribe((response: SwitchEndPointTypesApiResponse) => {
                    this.switchEndPointTypesApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.switchEndPointTypesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetUserTypes
     *
     * @returns {Promise<any>}
     */
    GetUserTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<UserTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.userTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetSwitchApplicationTypes
     *
     * @returns {Promise<any>}
     */
    GetSwitchApplicationTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchApplicationTypesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetSwitchApplicationTypes`
                )
                .subscribe((response: SwitchApplicationTypesApiResponse) => {
                    this.switchApplicationTypesApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.switchApplicationTypesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetHsmServices
     *
     * @returns {Promise<any>}
     */
    GetHsmServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmServicesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetHsmServices`
                )
                .subscribe((response: HsmServicesApiResponse) => {
                    this.hsmServicesApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.hsmServicesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetApplicationProfiles
     *
     * @returns {Promise<any>}
     */
    GetApplicationProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationProfilesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetApplicationProfiles`
                )
                .subscribe((response: ApplicationProfilesApiResponse) => {
                    this.applicationProfilesApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.applicationProfilesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchKeyProfiles
     *
     * @returns {Promise<any>}
     */
    GetSwitchKeyProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchKeyProfilesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetSwitchKeyProfiles`
                )
                .subscribe((response: SwitchKeyProfilesApiResponse) => {
                    this.switchKeyProfilesApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.switchKeyProfilesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetAllApplicationSessions
     *
     * @returns {Promise<any>}
     */
    GetAllApplicationSessions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<AllApplicationSessionsApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetAllApplicationSessions`
                )
                .subscribe((response: AllApplicationSessionsApiResponse) => {
                    this.allApplicationSessionsApiResponse = response;
                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.allApplicationSessionsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetApplicationSessions
     *
     * @returns {Promise<any>}
     */
    GetApplicationSessions(switchApplicationId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationSessionsApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/GetApplicationSessions?getSessionApplicationId=` +
                        switchApplicationId
                )
                .subscribe((response: ApplicationSessionsApiResponse) => {
                    this.applicationSessionsApiResponse = response;

                    this.onSwitchApplicationDefinitionsChanged.next(
                        this.applicationSessionsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchApplication
     *
     * @param switchApplication
     * @returns {Promise<any>}
     */
    DeleteSwitchApplication(switchApplication): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchApplication/DeleteSwitchApplication?deleteSwitchApplicationId=` +
                        switchApplication.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
