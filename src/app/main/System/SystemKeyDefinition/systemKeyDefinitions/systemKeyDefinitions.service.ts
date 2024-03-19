import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { KeyTypeApiResponse } from "app/ui/systemKeyProfile";

@Injectable({ providedIn: "root" })
export class SystemKeyDefinitionsService {
    keyTypeApiResponse: KeyTypeApiResponse;
    onSystemKeyDefinitionsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onSystemKeyDefinitionsChanged = new BehaviorSubject({});
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
     * GetKeyTypes
     *
     * @returns {Promise<any>}
     */
    GetKeyTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<KeyTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SystemKeyDefinition/GetKeyTypes`
                )
                .subscribe((response: KeyTypeApiResponse) => {
                    this.keyTypeApiResponse = response;
                    this.onSystemKeyDefinitionsChanged.next(
                        this.keyTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
