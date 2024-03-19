import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    GenerateCvvApiResponse,
    GenerateKcvApiResponse,
    GenerateKeyApiResponse,
    KeyZmkTmkApiResponse,
} from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GenerateKeyService {
    generateKeyApiResponse: GenerateKeyApiResponse;
    keyZmkTmkApiResponse: KeyZmkTmkApiResponse;
    onGenerateKeyChanged: BehaviorSubject<any>;
    generateKey: any;
    keyUnderLmk: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;
    keyUnderZmk: string;

    constructor(private http: HttpClient) {
        this.onGenerateKeyChanged = new BehaviorSubject({});
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
     * GenerateKey
     *
     * @param generateKey
     * @returns {Promise<any>}
     */
    GenerateKey(generateKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GenerateKey`,

                    {
                        KeyTypeId: generateKey.KeyTypeId,
                        KeySchema: generateKey.KeySchema,
                        ExportKey: generateKey.ExportKey,
                        ZmkTmkTypeId: generateKey.ZmkTmkTypeId,
                        EncryptedMasterKey: generateKey.EncryptedMasterKey,
                        KeyExportSchema: generateKey.KeyExportSchema,
                        AtallaVariant: generateKey.AtallaVariant,
                    }
                )
                .subscribe((response: any) => {
                    this.keyUnderLmk = response.KeyUnderLmk;
                    this.keyUnderZmk = response.KeyUnderZmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.generateKey = resolve(response);
                }, reject);
        });
    }

    /**
     * GetHsmKeyZmkTmkType
     *
     * @returns {Promise<any>}
     */
    GetHsmKeyZmkTmkType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<KeyZmkTmkApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GetHsmKeyZmkTmkType`
                )
                .subscribe((response: KeyZmkTmkApiResponse) => {
                    this.keyZmkTmkApiResponse = response;
                    this.onGenerateKeyChanged.next(this.keyZmkTmkApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
