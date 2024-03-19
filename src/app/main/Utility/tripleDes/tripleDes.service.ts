import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    DataConversionTypeApiResponse,
    EncryptionModesApiResponse,
    EncryptionTypeApiResponse,
    TripleDesApiResponse,
} from "app/ui/utility";

@Injectable({ providedIn: "root" })
export class TripleDesService {
    tripleDesApiResponse: TripleDesApiResponse;
    encryptionTypeApiResponse: EncryptionTypeApiResponse;
    encryptionModesApiResponse: EncryptionModesApiResponse;
    onTripleDesChanged: BehaviorSubject<any>;
    tripleDes: any;
    result: string;

    constructor(private http: HttpClient) {
        this.onTripleDesChanged = new BehaviorSubject({});
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
     * TripleDes
     *
     * @param tripleDes
     * @returns {Promise<any>}
     */
    TripleDes(tripleDes): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/TripleDes`,
                    {
                        EncryptionTypeId: tripleDes.EncryptionTypeId,
                        Data: tripleDes.Data,
                        Key: tripleDes.Key,
                        EncryptionModeId: tripleDes.EncryptionModeId,
                        Iv: tripleDes.Iv,
                    }
                )
                .subscribe((response: any) => {
                    this.result = response.Result;
                    this.tripleDes = resolve(response);
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
                    this.onTripleDesChanged.next(
                        this.encryptionTypeApiResponse
                    );
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
                    this.onTripleDesChanged.next(
                        this.encryptionModesApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
