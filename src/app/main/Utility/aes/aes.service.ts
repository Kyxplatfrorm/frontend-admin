import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    AesApiResponse,
    EncryptionModesApiResponse,
    EncryptionTypeApiResponse,
    TripleDesApiResponse,
} from "app/ui/utility";

@Injectable({ providedIn: "root" })
export class AesService {
    aesApiResponse: AesApiResponse;
    encryptionTypeApiResponse: EncryptionTypeApiResponse;
    encryptionModesApiResponse: EncryptionModesApiResponse;
    onAesChanged: BehaviorSubject<any>;
    aes: any;
    result: string;

    constructor(private http: HttpClient) {
        this.onAesChanged = new BehaviorSubject({});
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
     * Aes
     *
     * @param aes
     * @returns {Promise<any>}
     */
    Aes(aes): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/Aes`,
                    {
                        EncryptionTypeId: aes.EncryptionTypeId,
                        Data: aes.Data,
                        Key: aes.Key,
                        EncryptionModeId: aes.EncryptionModeId,
                        Iv: aes.Iv,
                    }
                )
                .subscribe((response: any) => {
                    this.result = response.Result;
                    this.aes = resolve(response);
                }, reject);
        });
    }

    /**
     * GetEncryptionTypes
     *
     * @returns {Promise<any>}
     */
    GetEncryptionTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<EncryptionTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/GetEncryptionTypes`
                )
                .subscribe((response: EncryptionTypeApiResponse) => {
                    this.encryptionTypeApiResponse = response;
                    this.onAesChanged.next(this.encryptionTypeApiResponse);
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetEncryptionModes
     *
     * @returns {Promise<any>}
     */
    GetEncryptionModes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<EncryptionModesApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/GetEncryptionModes`
                )
                .subscribe((response: EncryptionModesApiResponse) => {
                    this.encryptionModesApiResponse = response;
                    this.onAesChanged.next(this.encryptionModesApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
