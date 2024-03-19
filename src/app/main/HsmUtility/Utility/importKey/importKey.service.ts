import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    HsmImportExportKeyTypeApiResponse,
    ImportKeyApiResponse,
} from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class ImportKeyService {
    importKeyApiResponse: ImportKeyApiResponse;
    hsmImportExportKeyTypeApiResponse: HsmImportExportKeyTypeApiResponse;
    onImportKeyChanged: BehaviorSubject<any>;
    importKey: any;
    keyUnderLmk: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onImportKeyChanged = new BehaviorSubject({});
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
     * ImportKey
     *
     * @param importKey
     * @returns {Promise<any>}
     */
    ImportKey(importKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/ImportKey`,

                    {
                        KeyTypeId: importKey.KeyTypeId,
                        ZmkUnderLmk: importKey.ZmkUnderLmk,
                        KeyUnderZmk: importKey.KeyUnderZmk,
                        KeySchema: importKey.KeySchema,
                        AtallaVariant: importKey.AtallaVariant,
                    }
                )
                .subscribe((response: any) => {
                    this.keyUnderLmk = response.KeyUnderLmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.importKey = resolve(response);
                }, reject);
        });
    }

    /**
     * GetHsmImportExportKeyType
     *
     * @returns {Promise<any>}
     */
    GetHsmImportExportKeyType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<HsmImportExportKeyTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GetHsmImportExportKeyType`
                )
                .subscribe((response: HsmImportExportKeyTypeApiResponse) => {
                    this.hsmImportExportKeyTypeApiResponse = response;
                    this.onImportKeyChanged.next(
                        this.hsmImportExportKeyTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
