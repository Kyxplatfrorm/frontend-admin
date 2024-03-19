import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { VerifyArqcAndGenerateArpcApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class VerifyArqcAndGenerateArpcEmv4Service {
    verifyArqcAndGenerateArpcApiResponse: VerifyArqcAndGenerateArpcApiResponse;
    onVerifyArqcAndGenerateArpcEmv4Changed: BehaviorSubject<any>;
    verifyArqcAndGenerateArpcEmv4: any;
    arpcData: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onVerifyArqcAndGenerateArpcEmv4Changed = new BehaviorSubject({});
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
     * VerifyArqcAndGenerateArpcEmv4
     *
     * @param verifyArqcAndGenerateArpcEmv4
     * @returns {Promise<any>}
     */
    VerifyArqcAndGenerateArpcEmv4(verifyArqcAndGenerateArpcEmv4): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/VerifyArqcAndGenerateArpcEmv4`,

                    {
                        AcUnderLmk: verifyArqcAndGenerateArpcEmv4.AcUnderLmk,
                        CardNumber: verifyArqcAndGenerateArpcEmv4.CardNumber,
                        PanSequenceNumber:
                            verifyArqcAndGenerateArpcEmv4.PanSequenceNumber,
                        Arc: verifyArqcAndGenerateArpcEmv4.Arc,
                        EmvData: verifyArqcAndGenerateArpcEmv4.EmvData,
                        ModeFlag: verifyArqcAndGenerateArpcEmv4.ModeFlag,
                        ProprietaryAuthenticationData:
                            verifyArqcAndGenerateArpcEmv4.ProprietaryAuthenticationData,
                        Csu: verifyArqcAndGenerateArpcEmv4.Csu,
                    }
                )
                .subscribe((response: any) => {
                    this.arpcData = response.ArpcData;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.verifyArqcAndGenerateArpcEmv4 = resolve(response);
                }, reject);
        });
    }
}
