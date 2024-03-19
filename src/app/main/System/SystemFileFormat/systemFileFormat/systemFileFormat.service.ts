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
export class SystemFileFormatService implements Resolve<any> {
    routeParams: any;
    onSystemFileFormatChanged: BehaviorSubject<any>;
    systemFileFormat: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSystemFileFormatChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSystemFileFormat()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSystemFileFormat
     *
     * @returns {Promise<any>}
     */
    GetSystemFileFormat(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSystemFileFormatChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileFormat/GetSystemFileFormat?systemFileFormatId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.systemFileFormat = response.SystemFileFormat;
                        this.onSystemFileFormatChanged.next(
                            this.systemFileFormat
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateSystemFileFormat
     *
     * @param systemFileFormat
     * @returns {Promise<any>}
     */
    CreateSystemFileFormat(systemFileFormat): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileFormat/CreateSystemFileFormat`,
                    {
                        FileFormatCode: systemFileFormat.FileFormatCode,
                        FileNameFormat: systemFileFormat.FileNameFormat,
                        FileFormatTypeId: systemFileFormat.FileFormatTypeId,
                        Description: systemFileFormat.Description,
                        FileDirectionTypeId:
                            systemFileFormat.FileDirectionTypeId,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSystemFileFormat
     *
     * @param systemFileFormat
     * @returns {Promise<any>}
     */
    UpdateSystemFileFormat(systemFileFormat): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileFormat/UpdateSystemFileFormat`,
                    {
                        Id: systemFileFormat.Id,
                        FileFormatCode: systemFileFormat.FileFormatCode,
                        FileNameFormat: systemFileFormat.FileNameFormat,
                        FileFormatTypeId: systemFileFormat.FileFormatTypeId,
                        Description: systemFileFormat.Description,
                        FileDirectionTypeId:
                            systemFileFormat.FileDirectionTypeId,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
