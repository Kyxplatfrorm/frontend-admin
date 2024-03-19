import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GeneratePvvApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GeneratePvvService {
    generatePvvApiResponse: GeneratePvvApiResponse;
    onGeneratePvvChanged: BehaviorSubject<any>;
    generatePvv: any;
    pvv: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGeneratePvvChanged = new BehaviorSubject({});
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
     * GeneratePvv
     *
     * @param generatePvv
     * @returns {Promise<any>}
     */
    GeneratePvv(generatePvv): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GeneratePvv`,

                    {
                        PinUnderLmk: generatePvv.PinUnderLmk,
                        CardNumber: generatePvv.CardNumber,
                        PvvKeyIndex: generatePvv.PvvKeyIndex,
                        PvvKeyA: generatePvv.PvvKeyA,
                        PvvKeyB: generatePvv.PvvKeyB,
                    }
                )
                .subscribe((response: any) => {
                    this.pvv = response.Pvv;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.generatePvv = resolve(response);
                }, reject);
        });
    }
}
