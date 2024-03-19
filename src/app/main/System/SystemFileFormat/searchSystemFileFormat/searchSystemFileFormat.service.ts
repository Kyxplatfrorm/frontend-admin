import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SystemFileFormatApiResponse } from "app/ui/systemFileFormat";

@Injectable()
export class SearchSystemFileFormatService implements Resolve<any> {
    systemFileFormatApiResponse: SystemFileFormatApiResponse;
    routeParams: any;
    systemFileFormat: any;
    onSearchSystemFileFormatChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSystemFileFormatChanged = new BehaviorSubject({});
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
            Promise.all([
                this.FillSystemFileFormatTable(this.systemFileFormat),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    FillSystemFileFormatTable(systemKey): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.systemFileFormatApiResponse == undefined) {
                this.systemFileFormatApiResponse =
                    new SystemFileFormatApiResponse();
                this.systemFileFormatApiResponse.IsSucceeded = true;
                this.systemFileFormatApiResponse.SystemFileFormatList = [];
            }
            this.onSearchSystemFileFormatChanged.next(
                this.systemFileFormatApiResponse
            );
            resolve(this.systemFileFormatApiResponse);
        });
    }

    /**
     * SearchSystemFileFormat
     *
     * @returns {Promise<any>}
     */
    SearchSystemFileFormat(systemFileFormat): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileFormat/SearchSystemFileFormat`,
                    {
                        FileFormatTypeId: systemFileFormat.FileFormatTypeId,
                        FileDirectionTypeId:
                            systemFileFormat.FileDirectionTypeId,
                        FileFormatCode: systemFileFormat.FileFormatCode,
                        FileNameFormat: systemFileFormat.FileNameFormat,
                        Description: systemFileFormat.Description,
                        SearchStartDate: systemFileFormat.SearchStartDate,
                        SearchEndDate: systemFileFormat.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.systemFileFormatApiResponse = response;
                    this.onSearchSystemFileFormatChanged.next(
                        this.systemFileFormatApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSystemFileFormat
     *
     * @param systemFileFormat
     * @returns {Promise<any>}
     */
    DeleteSystemFileFormat(systemFileFormat): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileFormat/DeleteSystemFileFormat?deleteSystemFileFormatId=` +
                        systemFileFormat.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
