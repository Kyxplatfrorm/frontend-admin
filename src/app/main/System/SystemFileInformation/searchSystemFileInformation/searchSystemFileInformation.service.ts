import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { SystemKeyApiResponse } from "app/ui/systemKeyProfile";
import { SystemFileInformationApiResponse } from "app/ui/systemFileInformation";

@Injectable()
export class SearchSystemFileInformationService implements Resolve<any> {
    systemFileInformationApiResponse: SystemFileInformationApiResponse;
    routeParams: any;
    systemFileInformation: any;
    onSearchSystemFileInformationChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSearchSystemFileInformationChanged = new BehaviorSubject({});
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
                this.FillSystemFileInformationTable(this.systemFileInformation),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    FillSystemFileInformationTable(systemFileInformation): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.systemFileInformationApiResponse == undefined) {
                this.systemFileInformationApiResponse =
                    new SystemKeyApiResponse();
                this.systemFileInformationApiResponse.IsSucceeded = true;
                this.systemFileInformationApiResponse.SystemFileInformationList =
                    [];
            }
            this.onSearchSystemFileInformationChanged.next(
                this.systemFileInformationApiResponse
            );
            resolve(this.systemFileInformationApiResponse);
        });
    }

    /**
     * SearchSystemFileInformation
     *
     * @returns {Promise<any>}
     */
    SearchSystemFileInformation(systemFileInformation): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileInformation/SearchSystemFileInformation`,
                    {
                        TenantId: systemFileInformation.TenantId,
                        FileFormatTypeId:
                            systemFileInformation.FileFormatTypeId,
                        FileDirectionTypeId:
                            systemFileInformation.FileDirectionTypeId,
                        FileStatusId: systemFileInformation.FileStatusId,
                        FileSourceId: systemFileInformation.FileSourceId,
                        FileName: systemFileInformation.FileName,
                        SearchStartDate: systemFileInformation.SearchStartDate,
                        SearchEndDate: systemFileInformation.SearchEndDate,
                    }
                )
                .subscribe((response: any) => {
                    this.systemFileInformationApiResponse = response;
                    this.onSearchSystemFileInformationChanged.next(
                        this.systemFileInformationApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
