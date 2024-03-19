import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GeneratePinLmkApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GeneratePinLmkService {
    generatePinLmkApiResponse: GeneratePinLmkApiResponse;
    onGeneratePinLmkChanged: BehaviorSubject<any>;
    generatePinLmk: any;
    pinLmk: number;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGeneratePinLmkChanged = new BehaviorSubject({});
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
     * GeneratePinLmk
     *
     * @param generatePinLmk
     * @returns {Promise<any>}
     */
    GeneratePinLmk(generatePinLmk): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GeneratePinLmk`,

                    {
                        CardNumber: generatePinLmk.CardNumber,
                        LmkIdentifier: generatePinLmk.LmkIdentifier,
                        LmkType: generatePinLmk.LmkType,
                    }
                )
                .subscribe((response: any) => {
                    this.pinLmk = response.PinLmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.generatePinLmk = resolve(response);
                }, reject);
        });
    }
}
