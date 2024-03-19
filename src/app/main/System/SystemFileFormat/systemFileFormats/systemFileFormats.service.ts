import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { KeyTypeApiResponse } from "app/ui/systemKeyProfile";
import {
    FileDirectionTypeApiResponse,
    FileFormatTypeApiResponse,
} from "app/ui/systemFileFormat";

@Injectable({ providedIn: "root" })
export class SystemFileFormatsService {
    fileFormatTypeApiResponse: FileFormatTypeApiResponse;
    fileDirectionTypeApiResponse: FileDirectionTypeApiResponse;
    onSystemFileFormatsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSystemFileFormatsChanged = new BehaviorSubject({});
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
     * GetFileFormatTypes
     *
     * @returns {Promise<any>}
     */
    GetFileFormatTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<FileFormatTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileFormat/GetFileFormatTypes`
                )
                .subscribe((response: FileFormatTypeApiResponse) => {
                    this.fileFormatTypeApiResponse = response;
                    this.onSystemFileFormatsChanged.next(
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
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileFormat/GetFileDirectionTypes`
                )
                .subscribe((response: FileDirectionTypeApiResponse) => {
                    this.fileDirectionTypeApiResponse = response;
                    this.onSystemFileFormatsChanged.next(
                        this.fileDirectionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
