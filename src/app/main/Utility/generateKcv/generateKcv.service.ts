import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GenerateKcvApiResponse } from "app/ui/utility";

@Injectable({ providedIn: "root" })
export class GenerateKcvService {
    generateKcvApiResponse: GenerateKcvApiResponse;
    onGenerateKcvChanged: BehaviorSubject<any>;
    kcv: any;
    result: string;

    constructor(private http: HttpClient) {
        this.onGenerateKcvChanged = new BehaviorSubject({});
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
     * @param kcv
     * @returns {Promise<any>}
     */
    GenerateKcv(kcv): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/GenerateKcv`,

                    { Key: kcv.Key }
                )
                .subscribe((response: any) => {
                    this.result = response.Result;
                    this.kcv = resolve(response);
                }, reject);
        });
    }
}
