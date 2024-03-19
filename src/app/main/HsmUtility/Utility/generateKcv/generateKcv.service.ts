import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    GenerateCvvApiResponse,
    GenerateKcvApiResponse,
    HsmKcvKeyLengthFlagTypeApiResponse,
    HsmKcvKeyTypeApiResponse,
} from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GenerateKcvService {
    generateKcvApiResponse: GenerateKcvApiResponse;
    hsmKcvKeyLengthFlagTypeApiResponse: HsmKcvKeyLengthFlagTypeApiResponse;
    hsmKcvKeyTypeApiResponse: HsmKcvKeyTypeApiResponse;
    onGenerateKcvChanged: BehaviorSubject<any>;
    generateKcv: any;
    hsmkeyCheckValue: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGenerateKcvChanged = new BehaviorSubject({});
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
     * GenerateKcv
     *
     * @param generateKcv
     * @returns {Promise<any>}
     */
    GenerateKcv(generateKcv): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GenerateKcv`,

                    {
                        KeyTypeId: generateKcv.KeyTypeId,
                        KeyLengthTypeId: generateKcv.KeyLengthTypeId,
                        KeyUnderLmk: generateKcv.KeyUnderLmk,
                    }
                )
                .subscribe((response: any) => {
                    this.hsmkeyCheckValue = response.KeyCheckValue;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.generateKcv = resolve(response);
                }, reject);
        });
    }

    /**
     * GetHsmKcvKeyType
     *
     * @returns {Promise<any>}
     */
    GetHsmKcvKeyType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmKcvKeyTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GetHsmKcvKeyType`
                )
                .subscribe((response: HsmKcvKeyTypeApiResponse) => {
                    this.hsmKcvKeyTypeApiResponse = response;
                    this.onGenerateKcvChanged.next(
                        this.hsmKcvKeyTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
    /**
     * GetHsmKeyLengthFlagType
     *
     * @returns {Promise<any>}
     */
    GetHsmKeyLengthFlagType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmKcvKeyLengthFlagTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GetHsmKeyLengthFlagType`
                )
                .subscribe((response: HsmKcvKeyLengthFlagTypeApiResponse) => {
                    this.hsmKcvKeyLengthFlagTypeApiResponse = response;
                    this.onGenerateKcvChanged.next(
                        this.hsmKcvKeyLengthFlagTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
