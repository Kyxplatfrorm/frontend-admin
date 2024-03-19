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
export class OccupationDetailService implements Resolve<any> {
    routeParams: any;
    occupation: any;
    onOccupationDetailChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onOccupationDetailChanged = new BehaviorSubject({});
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
            Promise.all([this.getOccupation()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getOccupation
     *
     * @returns {Promise<any>}
     */
    getOccupation(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onOccupationDetailChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/Occupation/GetOccupation?occupationId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.occupation = response.Occupation;
                        this.onOccupationDetailChanged.next(this.occupation);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateOccupation
     *
     * @param occupation
     * @returns {Promise<any>}
     */
    updateOccupation(occupation): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Occupation/UpdateOccupation`,
                    {
                        Id: occupation.Id,
                        OccupationCode: occupation.OccupationCode,
                        Description: occupation.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * createOccupation
     *
     * @param occupation
     * @returns {Promise<any>}
     */
    createOccupation(occupation): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Occupation/CreateOccupation`,

                    {
                        OccupationCode: occupation.OccupationCode,
                        Description: occupation.Description,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
