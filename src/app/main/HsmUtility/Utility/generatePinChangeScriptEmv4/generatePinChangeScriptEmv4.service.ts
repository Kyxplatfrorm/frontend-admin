import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GeneratePinChangeScriptForEmv4ApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GeneratePinChangeScriptEmv4Service {
    generatePinChangeScriptForEmv4ApiResponse: GeneratePinChangeScriptForEmv4ApiResponse;
    onGeneratePinChangeScriptEmv4Changed: BehaviorSubject<any>;
    generatePinChangeScriptEmv4: any;
    issuerScript: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGeneratePinChangeScriptEmv4Changed = new BehaviorSubject({});
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
     * GeneratePinChangeScriptForEmv4
     *
     * @param generatePinChangeScriptEmv4
     * @returns {Promise<any>}
     */
    GeneratePinChangeScriptForEmv4(generatePinChangeScriptEmv4): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GeneratePinChangeScriptForEmv4`,

                    {
                        AcUnderLmk: generatePinChangeScriptEmv4.AcUnderLmk,
                        EncUnderLmk: generatePinChangeScriptEmv4.EncUnderLmk,
                        MacKeyUnderLmk:
                            generatePinChangeScriptEmv4.MacKeyUnderLmk,
                        ZpkUnderLmk: generatePinChangeScriptEmv4.ZpkUnderLmk,
                        CardNumber: generatePinChangeScriptEmv4.CardNumber,
                        PanSequenceNumber:
                            generatePinChangeScriptEmv4.PanSequenceNumber,
                        Atc: generatePinChangeScriptEmv4.Atc,
                        Arqc: generatePinChangeScriptEmv4.Arqc,
                        PinBlockFormat:
                            generatePinChangeScriptEmv4.PinBlockFormat,
                        PinBlock: generatePinChangeScriptEmv4.PinBlock,
                        SchemaId: generatePinChangeScriptEmv4.SchemaId,
                        BranchAndHeigthMode:
                            generatePinChangeScriptEmv4.BranchAndHeigthMode,
                    }
                )
                .subscribe((response: any) => {
                    this.issuerScript = response.IssuerScript;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.generatePinChangeScriptEmv4 = resolve(response);
                }, reject);
        });
    }
}
