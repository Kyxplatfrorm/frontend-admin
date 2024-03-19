import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GenerateTrackDataApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslateKeyFromOldLmkToNewLmkService {
    generateTrackDataApiResponse: GenerateTrackDataApiResponse;
    onTranslateKeyFromOldLmkToNewLmkChanged: BehaviorSubject<any>;
    translateKeyFromOldLmkToNewLmk: any;
    keyUnderLmk: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslateKeyFromOldLmkToNewLmkChanged = new BehaviorSubject({});
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
     * TranslateKeyFromOldLmkToNewLmk
     *
     * @param translateKeyFromOldLmkToNewLmk
     * @returns {Promise<any>}
     */
    TranslateKeyFromOldLmkToNewLmk(
        translateKeyFromOldLmkToNewLmk
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslateKeyFromOldLmkToNewLmk`,

                    {
                        KeyTypeCode: translateKeyFromOldLmkToNewLmk.KeyTypeCode,
                        KeyLength: translateKeyFromOldLmkToNewLmk.KeyLength,
                        LmkKey: translateKeyFromOldLmkToNewLmk.LmkKey,
                        KeyType: translateKeyFromOldLmkToNewLmk.KeyType,
                        LmkIdentifier:
                            translateKeyFromOldLmkToNewLmk.LmkIdentifier,
                        KeyUsage: translateKeyFromOldLmkToNewLmk.KeyUsage,
                        ModeOfUse: translateKeyFromOldLmkToNewLmk.ModeOfUse,
                        KeyVersionNumber:
                            translateKeyFromOldLmkToNewLmk.KeyVersionNumber,
                        Exportability:
                            translateKeyFromOldLmkToNewLmk.Exportability,
                        NumberOfOptionalBlocks:
                            translateKeyFromOldLmkToNewLmk.NumberOfOptionalBlocks,
                        OptionalBlocks:
                            translateKeyFromOldLmkToNewLmk.OptionalBlocks,
                    }
                )
                .subscribe((response: any) => {
                    this.keyUnderLmk = response.KeyUnderLmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.translateKeyFromOldLmkToNewLmk = resolve(response);
                }, reject);
        });
    }
}
