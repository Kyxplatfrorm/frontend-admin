import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { EncryptedDataApiResponse, XorApiResponse } from "app/ui/utility";
import { TokenizeCardNumberApiResponse } from "app/ui/tokenizeCard";

@Injectable({ providedIn: "root" })
export class XorService {
    xorApiResponse: XorApiResponse;
    onXorChanged: BehaviorSubject<any>;
    xor: any;
    result: string;

    constructor(private http: HttpClient) {
        this.onXorChanged = new BehaviorSubject({});
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
     * ExOr
     *
     * @param xor
     * @returns {Promise<any>}
     */
    ExOr(xor): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/ExOr`,
                    { XorData1: xor.XorData1, XorData2: xor.XorData2 }
                )
                .subscribe((response: any) => {
                    this.result = response.Result;
                    this.xor = resolve(response);
                }, reject);
        });
    }
}
