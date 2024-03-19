import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ImportKeyForKeyBlockApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class ImportKeyForKeyBlockService {
    İmportKeyForKeyBlockApiResponse: ImportKeyForKeyBlockApiResponse;
    onImportKeyForKeyBlockChanged: BehaviorSubject<any>;
    importKey: any;
    keyUnderLmkWithKcv: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onImportKeyForKeyBlockChanged = new BehaviorSubject({});
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
     * ImportKeyForKeyBlock
     *
     * @param importKey
     * @returns {Promise<any>}
     */
    ImportKeyForKeyBlock(importKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/ImportKeyForKeyBlock`,

                    {
                        KeyUsage: importKey.KeyUsage,
                        ZmkUnderLmk: importKey.ZmkUnderLmk,
                        KeyUnderZmk: importKey.KeyUnderZmk,
                    }
                )
                .subscribe((response: any) => {
                    this.keyUnderLmkWithKcv = response.KeyUnderLmkWithKcv;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.importKey = resolve(response);
                }, reject);
        });
    }
}
