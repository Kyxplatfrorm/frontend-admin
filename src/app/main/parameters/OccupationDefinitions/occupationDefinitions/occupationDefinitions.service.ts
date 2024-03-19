import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OccupationApiResponse, OccupationEntity } from "app/ui/occupation";

@Injectable({ providedIn: "root" })
export class OccupationDefinitionsService {
    occupationDefinitionsApiResponse: OccupationApiResponse;
    onOccupationDefinitionsChanged: BehaviorSubject<any>;
    occupationList: OccupationEntity[];

    constructor(private http: HttpClient) {
        this.onOccupationDefinitionsChanged = new BehaviorSubject({});
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
            Promise.all([this.getOccupations()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getOccupations
     *
     * @returns {Promise<any>}
     */
    getOccupations(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<OccupationApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Occupation/GetOccupations`
                )
                .subscribe((response: OccupationApiResponse) => {
                    this.occupationDefinitionsApiResponse = response;
                    this.onOccupationDefinitionsChanged.next(
                        this.occupationDefinitionsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * deleteOccupation
     *
     * @param occupation
     * @returns {Promise<any>}
     */
    deleteOccupation(occupation): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/Occupation/DeleteOccupation?deleteOccupationId=` +
                        occupation.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
