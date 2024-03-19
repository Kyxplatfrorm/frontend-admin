import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    ExportKeyApiResponse,
    HsmImportExportKeyTypeApiResponse,
    ImportKeyApiResponse,
} from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class ExportKeyService {
    exportKeyApiResponse: ExportKeyApiResponse;
    hsmImportExportKeyTypeApiResponse: HsmImportExportKeyTypeApiResponse;
    onExportKeyChanged: BehaviorSubject<any>;
    exportKey: any;
    keyUnderZmk: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onExportKeyChanged = new BehaviorSubject({});
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
     * ExportKey
     *
     * @param exportKey
     * @returns {Promise<any>}
     */
    ExportKey(exportKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/ExportKey`,

                    {
                        KeyTypeId: exportKey.KeyTypeId,
                        KeyExportSchema: exportKey.KeyExportSchema,
                        ZmkUnderLmk: exportKey.ZmkUnderLmk,
                        KeyUnderLmk: exportKey.KeyUnderLmk,
                    }
                )
                .subscribe((response: any) => {
                    this.keyUnderZmk = response.KeyUnderZmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.exportKey = resolve(response);
                }, reject);
        });
    }
}
