import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GenerateMacApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GenerateMacService {
    generateMacApiResponse: GenerateMacApiResponse;
    onGenerateMacChanged: BehaviorSubject<any>;
    generateMac: any;
    mac: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGenerateMacChanged = new BehaviorSubject({});
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
     * GenerateMac
     *
     * @param generateMac
     * @returns {Promise<any>}
     */
    GenerateMac(generateMac): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GenerateMac`,

                    {
                        MacKeyUnderLmk: generateMac.MacKeyUnderLmk,
                        MacData: generateMac.MacData,
                    }
                )
                .subscribe((response: any) => {
                    this.mac = response.Mac;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.generateMac = resolve(response);
                }, reject);
        });
    }
}
