import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GenerateCvvApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GenerateCvvService {
    generateCvvApiResponse: GenerateCvvApiResponse;
    onGenerateCvvChanged: BehaviorSubject<any>;
    generateCvv: any;
    generateHsmCvv: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGenerateCvvChanged = new BehaviorSubject({});
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
     * GenerateCvv
     *
     * @param generateCvv
     * @returns {Promise<any>}
     */
    GenerateCvv(generateCvv): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GenerateCvv`,

                    {
                        CvvKey: generateCvv.CvvKey,
                        CardNumber: generateCvv.CardNumber,
                        ExpiryDateYYMM: generateCvv.ExpiryDateYYMM,
                        ServiceCode: generateCvv.ServiceCode,
                    }
                )
                .subscribe((response: any) => {
                    this.generateHsmCvv = response.Cvv;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.generateCvv = resolve(response);
                }, reject);
        });
    }
}
