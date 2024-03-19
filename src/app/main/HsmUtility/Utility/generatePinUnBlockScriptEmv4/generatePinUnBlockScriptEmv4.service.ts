import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GeneratePinUnBlockScriptForEmv4ApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GeneratePinUnBlockScriptEmv4Service {
    generatePinUnBlockScriptForEmv4ApiResponse: GeneratePinUnBlockScriptForEmv4ApiResponse;
    onGeneratePinUnBlockScriptEmv4Changed: BehaviorSubject<any>;
    generatePinUnBlockScriptEmv4: any;
    issuerScript: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGeneratePinUnBlockScriptEmv4Changed = new BehaviorSubject({});
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
     * GeneratePinUnBlockScriptEmv4
     *
     * @param generatePinUnBlockScriptEmv4
     * @returns {Promise<any>}
     */
    GeneratePinUnBlockScriptEmv4(generatePinUnBlockScriptEmv4): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GeneratePinUnBlockScriptEmv4`,

                    {
                        MacKeyUnderLmk:
                            generatePinUnBlockScriptEmv4.MacKeyUnderLmk,
                        CardNumber: generatePinUnBlockScriptEmv4.CardNumber,
                        PanSequenceNumber:
                            generatePinUnBlockScriptEmv4.PanSequenceNumber,
                        Atc: generatePinUnBlockScriptEmv4.Atc,
                        Arqc: generatePinUnBlockScriptEmv4.Arqc,
                        ModeFlag: generatePinUnBlockScriptEmv4.ModeFlag,
                        SchemaId: generatePinUnBlockScriptEmv4.SchemaId,
                        BranchAndHeigthMode:
                            generatePinUnBlockScriptEmv4.BranchAndHeigthMode,
                    }
                )
                .subscribe((response: any) => {
                    this.issuerScript = response.IssuerScript;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.generatePinUnBlockScriptEmv4 = resolve(response);
                }, reject);
        });
    }
}
