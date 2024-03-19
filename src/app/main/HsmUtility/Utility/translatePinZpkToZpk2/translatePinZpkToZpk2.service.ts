import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TranslatePinUnderZpkToZpk2ApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslatePinZpkToZpk2Service {
    translatePinUnderZpkToZpk2ApiResponse: TranslatePinUnderZpkToZpk2ApiResponse;
    onTranslatePinZpkToZpk2Changed: BehaviorSubject<any>;
    translatePinZpkToZpk2: any;
    lengthOfThePin: string;
    pinUnderDestinationZpk: string;
    destinationPinBlockFormat: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslatePinZpkToZpk2Changed = new BehaviorSubject({});
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
     * TranslatePinUnderZpkToZpk2
     *
     * @param translatePinZpkToZpk2
     * @returns {Promise<any>}
     */
    TranslatePinUnderZpkToZpk2(translatePinZpkToZpk2): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslatePinUnderZpkToZpk2`,

                    {
                        SourceZpkUnderLmk:
                            translatePinZpkToZpk2.SourceZpkUnderLmk,
                        CardNumber: translatePinZpkToZpk2.CardNumber,
                        SourcePinBlockFormat:
                            translatePinZpkToZpk2.SourcePinBlockFormat,
                        PinUnderSourceZpk:
                            translatePinZpkToZpk2.PinUnderSourceZpk,
                        DestinationZpkUnderLmk:
                            translatePinZpkToZpk2.DestinationZpkUnderLmk,
                        DestinationPinBlockFormat:
                            translatePinZpkToZpk2.DestinationPinBlockFormat,
                        MaksimumPinLength:
                            translatePinZpkToZpk2.MaksimumPinLength,
                        LmkType: translatePinZpkToZpk2.LmkType,
                    }
                )
                .subscribe((response: any) => {
                    this.lengthOfThePin = response.LengthOfThePin;
                    this.pinUnderDestinationZpk =
                        response.PinUnderDestinationZpk;
                    this.destinationPinBlockFormat =
                        response.DestinationPinBlockFormat;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.translatePinZpkToZpk2 = resolve(response);
                }, reject);
        });
    }
}
