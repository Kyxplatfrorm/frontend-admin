import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TranslateZpkFromOldLmkToNewLmkApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslateZpkFromOldLmkToNewLmkService {
    translateZpkFromOldLmkToNewLmkApiResponse: TranslateZpkFromOldLmkToNewLmkApiResponse;
    onTranslateZpkFromOldLmkToNewLmkChanged: BehaviorSubject<any>;
    translateZpkFromOldLmkToNewLmk: any;
    zpkUnderLmk: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslateZpkFromOldLmkToNewLmkChanged = new BehaviorSubject({});
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
     * TranslateZpkFromOldLmkToNewLmk
     *
     * @param translateZpkFromOldLmkToNewLmk
     * @returns {Promise<any>}
     */
    TranslateZpkFromOldLmkToNewLmk(
        translateZpkFromOldLmkToNewLmk
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslateZpkFromOldLmkToNewLmk`,

                    {
                        ZpkLmkKey: translateZpkFromOldLmkToNewLmk.ZpkLmkKey,
                        LmkIdentifier:
                            translateZpkFromOldLmkToNewLmk.LmkIdentifier,
                    }
                )
                .subscribe((response: any) => {
                    this.zpkUnderLmk = response.ZpkUnderLmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.translateZpkFromOldLmkToNewLmk = resolve(response);
                }, reject);
        });
    }
}
