import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { EncryptedDataApiResponse } from "app/ui/utility";

@Injectable({ providedIn: "root" })
export class UtilityService {
    utilityApiResponse: EncryptedDataApiResponse;
    onUtilityChanged: BehaviorSubject<any>;
    utility: any;
    encryptedData: string;

    constructor(private http: HttpClient) {
        this.onUtilityChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * getEncryptData
     *
     * @param utility
     * @returns {Promise<any>}
     */
    encryptData(utility): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/EncryptData`,

                    { Data: utility.Data }
                )
                .subscribe((response: any) => {
                    this.encryptedData = response.EncryptedData;
                    this.utility = resolve(response);
                }, reject);
        });
    }
}
