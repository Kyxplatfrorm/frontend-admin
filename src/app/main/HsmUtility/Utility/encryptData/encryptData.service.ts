import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { EncryptDataApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class EncryptDataService {
    encryptDataApiResponse: EncryptDataApiResponse;
    onEncryptDataChanged: BehaviorSubject<any>;
    encryptData: any;
    hsmErrorCode: string;
    hsmErrorDescription: string;
    encryptedData: string;

    constructor(private http: HttpClient) {
        this.onEncryptDataChanged = new BehaviorSubject({});
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
     * EncryptData
     *
     * @param encryptData
     * @returns {Promise<any>}
     */
    EncryptData(encryptData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/EncryptData`,

                    {
                        EncryptionKeyUnderLmk:
                            encryptData.EncryptionKeyUnderLmk,
                        Data: encryptData.Data,
                    }
                )
                .subscribe((response: any) => {
                    this.encryptedData = response.EncryptedData;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.encryptData = resolve(response);
                }, reject);
        });
    }
}
