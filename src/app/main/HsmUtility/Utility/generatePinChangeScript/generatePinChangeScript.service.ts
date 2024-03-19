import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GeneratePinChangeScriptApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GeneratePinChangeScriptService {
    generatePinChangeScriptApiResponse: GeneratePinChangeScriptApiResponse;
    onGeneratePinChangeScriptChanged: BehaviorSubject<any>;
    generatePinChangeScript: any;
    issuerScript: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGeneratePinChangeScriptChanged = new BehaviorSubject({});
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
     * GeneratePinChangeScript
     *
     * @param generatePinChangeScript
     * @returns {Promise<any>}
     */
    GeneratePinChangeScript(generatePinChangeScript): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GeneratePinChangeScript`,

                    {
                        AcUnderLmk: generatePinChangeScript.AcUnderLmk,
                        EncUnderLmk: generatePinChangeScript.EncUnderLmk,
                        MacKeyUnderLmk: generatePinChangeScript.MacKeyUnderLmk,
                        ZpkUnderLmk: generatePinChangeScript.ZpkUnderLmk,
                        CardNumber: generatePinChangeScript.CardNumber,
                        PanSequenceNumber:
                            generatePinChangeScript.PanSequenceNumber,
                        Atc: generatePinChangeScript.Atc,
                        Arqc: generatePinChangeScript.Arqc,
                        PinBlockFormat: generatePinChangeScript.PinBlockFormat,
                        PinBlock: generatePinChangeScript.PinBlock,
                    }
                )
                .subscribe((response: any) => {
                    this.issuerScript = response.IssuerScript;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.generatePinChangeScript = resolve(response);
                }, reject);
        });
    }
}
