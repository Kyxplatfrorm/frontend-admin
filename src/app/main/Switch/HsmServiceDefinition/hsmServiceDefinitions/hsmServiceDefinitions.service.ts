import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    ApplicationProfilesApiResponse,
    DevicesApiResponse,
    HsmServiceDefinitionApiResponse,
    UserTypeApiResponse,
} from "app/ui/hsmServiceDefinition";

@Injectable({ providedIn: "root" })
export class HsmServiceDefinitionsService {
    hsmServiceDefinitionApiResponse: HsmServiceDefinitionApiResponse;
    devicesApiResponse: DevicesApiResponse;
    userTypeApiResponse: UserTypeApiResponse;
    applicationProfilesApiResponse: ApplicationProfilesApiResponse;
    onHsmServiceChanged: BehaviorSubject<any>;
    hsmService: any;

    constructor(private http: HttpClient) {
        this.onHsmServiceChanged = new BehaviorSubject({});
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
            Promise.all([this.GetHsmServiceDefinitions()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetHsmServiceDefinitions
     *
     * @returns {Promise<any>}
     */
    GetHsmServiceDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmServiceDefinitionApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/GetHsmServiceDefinitions`
                )
                .subscribe((response: HsmServiceDefinitionApiResponse) => {
                    this.hsmServiceDefinitionApiResponse = response;
                    this.onHsmServiceChanged.next(
                        this.hsmServiceDefinitionApiResponse
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
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/GetUserTypes`
                )
                .subscribe((response: UserTypeApiResponse) => {
                    this.userTypeApiResponse = response;
                    this.onHsmServiceChanged.next(this.userTypeApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetHsmDevices
     *
     * @returns {Promise<any>}
     */
    GetHsmDevices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<DevicesApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/GetHsmDevices`
                )
                .subscribe((response: DevicesApiResponse) => {
                    this.devicesApiResponse = response;
                    this.onHsmServiceChanged.next(this.devicesApiResponse);
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
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/GetApplicationProfiles`
                )
                .subscribe((response: ApplicationProfilesApiResponse) => {
                    this.applicationProfilesApiResponse = response;
                    this.onHsmServiceChanged.next(
                        this.applicationProfilesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteHsmServiceDefinition
     *
     * @param hsmService
     * @returns {Promise<any>}
     */
    DeleteHsmServiceDefinition(hsmService): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmServiceDefinition/DeleteHsmServiceDefinition?deleteHsmServiceDefinitionId=` +
                        hsmService.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
