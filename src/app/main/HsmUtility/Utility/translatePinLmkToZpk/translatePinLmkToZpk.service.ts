import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GenerateTrackDataApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslatePinLmkToZpkService {
    generateTrackDataApiResponse: GenerateTrackDataApiResponse;
    onTranslatePinLmkToZpkChanged: BehaviorSubject<any>;
    tanslatePinLmkToZpk: any;
    pinUnderZpk: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslatePinLmkToZpkChanged = new BehaviorSubject({});
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
     * TranslatePinLmk2Zpk
     *
     * @param tanslatePinLmkToZpk
     * @returns {Promise<any>}
     */
    TranslatePinLmk2Zpk(tanslatePinLmkToZpk): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslatePinLmk2Zpk`,

                    {
                        ZpkUnderLmk: tanslatePinLmkToZpk.ZpkUnderLmk,
                        CardNumber: tanslatePinLmkToZpk.CardNumber,
                        PinLmk: tanslatePinLmkToZpk.PinLmk,
                        PinBlockFormat: tanslatePinLmkToZpk.PinBlockFormat,
                    }
                )
                .subscribe((response: any) => {
                    this.pinUnderZpk = response.PinUnderZpk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.tanslatePinLmkToZpk = resolve(response);
                }, reject);
        });
    }
}
