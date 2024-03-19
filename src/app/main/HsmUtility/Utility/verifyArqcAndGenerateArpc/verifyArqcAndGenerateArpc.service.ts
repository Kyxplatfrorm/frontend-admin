import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { VerifyArqcAndGenerateArpcApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class VerifyArqcAndGenerateArpcService {
    verifyArqcAndGenerateArpcApiResponse: VerifyArqcAndGenerateArpcApiResponse;
    onVerifyArqcAndGenerateArpcChanged: BehaviorSubject<any>;
    verifyArqcAndGenerateArpc: any;
    arpcData: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onVerifyArqcAndGenerateArpcChanged = new BehaviorSubject({});
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
     * VerifyArqcAndGenerateArpc
     *
     * @param verifyArqcAndGenerateArpc
     * @returns {Promise<any>}
     */
    VerifyArqcAndGenerateArpc(verifyArqcAndGenerateArpc): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/VerifyArqcAndGenerateArpc`,

                    {
                        AcUnderLmk: verifyArqcAndGenerateArpc.AcUnderLmk,
                        CardNumber: verifyArqcAndGenerateArpc.CardNumber,
                        PanSequenceNumber:
                            verifyArqcAndGenerateArpc.PanSequenceNumber,
                        Arc: verifyArqcAndGenerateArpc.Arc,
                        EmvData: verifyArqcAndGenerateArpc.EmvData,
                    }
                )
                .subscribe((response: any) => {
                    this.arpcData = response.ArpcData;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.verifyArqcAndGenerateArpc = resolve(response);
                }, reject);
        });
    }
}
