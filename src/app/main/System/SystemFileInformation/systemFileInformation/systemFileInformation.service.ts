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
export class SystemFileInformationService implements Resolve<any> {
    routeParams: any;
    onSystemFileInformationChanged: BehaviorSubject<any>;
    systemFileInformation: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSystemFileInformationChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSystemFileInformation()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSystemFileInformation
     *
     * @returns {Promise<any>}
     */
    GetSystemFileInformation(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSystemFileInformationChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SystemFileInformation/GetSystemFileInformation?systemFileInformationId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.systemFileInformation =
                            response.SystemFileInformation;
                        this.onSystemFileInformationChanged.next(
                            this.systemFileInformation
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
