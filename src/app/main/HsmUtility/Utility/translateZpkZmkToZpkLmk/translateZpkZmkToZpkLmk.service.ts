import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TranslateZpkZmkToZpkLmkApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslateZpkZmkToZpkLmkService {
    translateZpkZmkToZpkLmkApiResponse: TranslateZpkZmkToZpkLmkApiResponse;
    onTranslateZpkZmkToZpkLmkChanged: BehaviorSubject<any>;
    translateZpkZmkToZpkLmk: any;
    zpkUnderLmk: string;
    zpkKcv: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslateZpkZmkToZpkLmkChanged = new BehaviorSubject({});
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
     * TranslateZpkZmkToZpkLmk
     *
     * @param translateZpkZmkToZpkLmk
     * @returns {Promise<any>}
     */
    TranslateZpkZmkToZpkLmk(translateZpkZmkToZpkLmk): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslateZpkZmkToZpkLmk`,

                    {
                        ZmkUnderLmk: translateZpkZmkToZpkLmk.ZmkUnderLmk,
                        ZpkUnderZmk: translateZpkZmkToZpkLmk.ZpkUnderZmk,
                        AtallaVariant: translateZpkZmkToZpkLmk.AtallaVariant,
                    }
                )
                .subscribe((response: any) => {
                    this.zpkUnderLmk = response.ZpkUnderLmk;
                    this.zpkKcv = response.ZpkKcv;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.translateZpkZmkToZpkLmk = resolve(response);
                }, reject);
        });
    }
}
