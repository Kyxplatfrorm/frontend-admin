import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    HsmDefinitionApiResponse,
    HsmLmkTypeApiResponse,
    HsmTypeApiResponse,
} from "app/ui/hsmDefinition";

@Injectable({ providedIn: "root" })
export class HsmDefinitionsService {
    hsmDefinitionApiResponse: HsmDefinitionApiResponse;
    hsmTypeApiResponse: HsmTypeApiResponse;
    hsmLmkTypeApiResponse: HsmLmkTypeApiResponse;
    onHsmDefinitionsChanged: BehaviorSubject<any>;
    hsmDefinition: any;

    constructor(private http: HttpClient) {
        this.onHsmDefinitionsChanged = new BehaviorSubject({});
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
            Promise.all([this.GetHsmDefinitions()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetHsmDefinitions
     *
     * @returns {Promise<any>}
     */
    GetHsmDefinitions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmDefinitionApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmDefinition/GetHsmDefinitions`
                )
                .subscribe((response: HsmDefinitionApiResponse) => {
                    this.hsmDefinitionApiResponse = response;
                    this.onHsmDefinitionsChanged.next(
                        this.hsmDefinitionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetHsmTypes
     *
     * @returns {Promise<any>}
     */
    GetHsmTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmDefinition/GetHsmTypes`
                )
                .subscribe((response: HsmTypeApiResponse) => {
                    this.hsmTypeApiResponse = response;
                    this.onHsmDefinitionsChanged.next(this.hsmTypeApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetHsmLmkTypes
     *
     * @returns {Promise<any>}
     */
    GetHsmLmkTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmLmkTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmDefinition/GetHsmLmkTypes`
                )
                .subscribe((response: HsmLmkTypeApiResponse) => {
                    this.hsmLmkTypeApiResponse = response;
                    this.onHsmDefinitionsChanged.next(
                        this.hsmLmkTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteHsmDefinition
     *
     * @param hsmDefinition
     * @returns {Promise<any>}
     */
    DeleteHsmDefinition(hsmDefinition): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmDefinition/DeleteHsmDefinition?deleteHsmDefinitionId=` +
                        hsmDefinition.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
