import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TranslatePinUnderZpk2LmkApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslatePinZpkToLmkService {
    translatePinUnderZpk2LmkApiResponse: TranslatePinUnderZpk2LmkApiResponse;
    onTranslatePinZpkToLmkChanged: BehaviorSubject<any>;
    translatePinZpkToLmk: any;
    pinLmk: number;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslatePinZpkToLmkChanged = new BehaviorSubject({});
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
     * TranslatePinUnderZpk2Lmk
     *
     * @param translatePinZpkToLmk
     * @returns {Promise<any>}
     */
    TranslatePinUnderZpk2Lmk(translatePinZpkToLmk): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslatePinUnderZpk2Lmk`,

                    {
                        ZpkUnderLmk: translatePinZpkToLmk.ZpkUnderLmk,
                        CardNumber: translatePinZpkToLmk.CardNumber,
                        PinUnderZpk: translatePinZpkToLmk.PinUnderZpk,
                        PinBlockFormat: translatePinZpkToLmk.PinBlockFormat,
                    }
                )
                .subscribe((response: any) => {
                    this.pinLmk = response.PinLmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.translatePinZpkToLmk = resolve(response);
                }, reject);
        });
    }
}
