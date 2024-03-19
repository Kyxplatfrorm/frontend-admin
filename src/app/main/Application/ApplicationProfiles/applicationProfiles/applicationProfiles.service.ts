import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ApplicationProfilesApiResponse } from "app/ui/applicationProfiles";

@Injectable({ providedIn: "root" })
export class ApplicationProfilesService {
    applicationProfilesApiResponse: ApplicationProfilesApiResponse;
    onAppProfilesChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onAppProfilesChanged = new BehaviorSubject({});
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
            Promise.all([this.GetAppProfiles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get AppProfiles
     *
     * @returns {Promise<any>}
     */
    GetAppProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationProfilesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationProfile/GetApplicationProfiles`
                )
                .subscribe((response: ApplicationProfilesApiResponse) => {
                    this.applicationProfilesApiResponse = response;
                    this.onAppProfilesChanged.next(
                        this.applicationProfilesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteAppProfiles
     *
     * @param applicationprofile
     * @returns {Promise<any>}
     */
    deleteAppProfiles(applicationprofile): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/ApplicationProfile/DeleteApplicationProfile?deleteApplicationProfileId=` +
                        applicationprofile.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
