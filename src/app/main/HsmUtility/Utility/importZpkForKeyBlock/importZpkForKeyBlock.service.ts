import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ImportZpkForKeyBlockApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class ImportZpkForKeyBlockService {
    importZpkForKeyBlockApiResponse: ImportZpkForKeyBlockApiResponse;
    onImportZpkForKeyBlockChanged: BehaviorSubject<any>;
    importKey: any;
    keyUnderLmkWithKcv: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onImportZpkForKeyBlockChanged = new BehaviorSubject({});
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
     * ImportZpkForKeyBlock
     *
     * @param importKey
     * @returns {Promise<any>}
     */
    ImportZpkForKeyBlock(importKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/ImportZpkForKeyBlock`,

                    {
                        ZmkUnderLmk: importKey.ZmkUnderLmk,
                        ZpkUnderZmk: importKey.ZpkUnderZmk,
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
