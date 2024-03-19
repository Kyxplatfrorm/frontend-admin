import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ApplicationTypeApiResponse } from "app/ui/fraudApiDefinition";

@Injectable({ providedIn: "root" })
export class FraudApiDefinitionsService {
    applicationTypeApiResponse: ApplicationTypeApiResponse;
    onFraudApiDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onFraudApiDefinitionsChanged = new BehaviorSubject({});
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
     * GetApplicationTypes
     *
     * @returns {Promise<any>}
     */
    GetApplicationTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/FraudApiDefinition/GetApplicationTypes`
                )
                .subscribe((response: ApplicationTypeApiResponse) => {
                    this.applicationTypeApiResponse = response;
                    this.onFraudApiDefinitionsChanged.next(
                        this.applicationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
