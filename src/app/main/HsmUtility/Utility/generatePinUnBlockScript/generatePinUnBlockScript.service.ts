import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GeneratePinUnBlockScriptApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GeneratePinUnBlockScriptService {
    generatePinUnBlockScriptApiResponse: GeneratePinUnBlockScriptApiResponse;
    onGeneratePinUnBlockScriptChanged: BehaviorSubject<any>;
    generatePinUnBlockScript: any;
    issuerScript: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGeneratePinUnBlockScriptChanged = new BehaviorSubject({});
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
     * GeneratePinUnBlockScript
     *
     * @param generatePinUnBlockScript
     * @returns {Promise<any>}
     */
    GeneratePinUnBlockScript(generatePinUnBlockScript): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GeneratePinUnBlockScript`,

                    {
                        MacKeyUnderLmk: generatePinUnBlockScript.MacKeyUnderLmk,
                        CardNumber: generatePinUnBlockScript.CardNumber,
                        PanSequenceNumber:
                            generatePinUnBlockScript.PanSequenceNumber,
                        Atc: generatePinUnBlockScript.Atc,
                        Arqc: generatePinUnBlockScript.Arqc,
                    }
                )
                .subscribe((response: any) => {
                    this.issuerScript = response.IssuerScript;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.generatePinUnBlockScript = resolve(response);
                }, reject);
        });
    }
}
