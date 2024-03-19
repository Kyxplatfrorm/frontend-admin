import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { DecryptDataApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class DecryptDataService {
    decryptDataApiResponse: DecryptDataApiResponse;
    onDecryptDataChanged: BehaviorSubject<any>;
    decryptData: any;
    hsmErrorCode: string;
    hsmErrorDescription: string;
    decryptedData: string;

    constructor(private http: HttpClient) {
        this.onDecryptDataChanged = new BehaviorSubject({});
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
     * DecryptData
     *
     * @param decryptData
     * @returns {Promise<any>}
     */
    DecryptData(decryptData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/DecryptData`,

                    {
                        EncryptionKeyUnderLmk:
                            decryptData.EncryptionKeyUnderLmk,
                        EncryptedData: decryptData.EncryptedData,
                    }
                )
                .subscribe((response: any) => {
                    this.decryptedData = response.DecryptedData;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.decryptData = resolve(response);
                }, reject);
        });
    }
}
