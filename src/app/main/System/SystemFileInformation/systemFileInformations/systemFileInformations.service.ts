import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    FileDirectionTypeApiResponse,
    FileFormatTypeApiResponse,
    FileSourceTypeApiResponse,
    FileStatusTypeApiResponse,
    TenantApiResponse,
} from "app/ui/systemFileInformation";

@Injectable({ providedIn: "root" })
export class SystemFileInformationsService {
    tenantApiResponse: TenantApiResponse;
    fileFormatTypeApiResponse: FileFormatTypeApiResponse;
    fileDirectionTypeApiResponse: FileDirectionTypeApiResponse;
    fileStatusTypeApiResponse: FileStatusTypeApiResponse;
    fileSourceTypeApiResponse: FileSourceTypeApiResponse;
    onSystemFileInformationsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSystemFileInformationsChanged = new BehaviorSubject({});
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
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetTenants
     *
     * @returns {Promise<any>}
     */
    GetTenants(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TenantApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileInformation/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onSystemFileInformationsChanged.next(
                        this.tenantApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFileFormatTypes
     *
     * @returns {Promise<any>}
     */
    GetFileFormatTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FileFormatTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileInformation/GetFileFormatTypes`
                )
                .subscribe((response: FileFormatTypeApiResponse) => {
                    this.fileFormatTypeApiResponse = response;
                    this.onSystemFileInformationsChanged.next(
                        this.fileFormatTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFileDirectionTypes
     *
     * @returns {Promise<any>}
     */
    GetFileDirectionTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FileDirectionTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileInformation/GetFileDirectionTypes`
                )
                .subscribe((response: FileDirectionTypeApiResponse) => {
                    this.fileDirectionTypeApiResponse = response;
                    this.onSystemFileInformationsChanged.next(
                        this.fileDirectionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFileStatues
     *
     * @returns {Promise<any>}
     */
    GetFileStatues(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FileStatusTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileInformation/GetFileStatues`
                )
                .subscribe((response: FileStatusTypeApiResponse) => {
                    this.fileStatusTypeApiResponse = response;
                    this.onSystemFileInformationsChanged.next(
                        this.fileStatusTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetFileSources
     *
     * @returns {Promise<any>}
     */
    GetFileSources(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FileSourceTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileInformation/GetFileSources`
                )
                .subscribe((response: FileSourceTypeApiResponse) => {
                    this.fileSourceTypeApiResponse = response;
                    this.onSystemFileInformationsChanged.next(
                        this.fileSourceTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
