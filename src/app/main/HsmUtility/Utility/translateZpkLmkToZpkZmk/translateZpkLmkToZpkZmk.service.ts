import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TranslateZpkLmkToZpkZmkApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslateZpkLmkToZpkZmkService {
    translateZpkLmkToZpkZmkApiResponse: TranslateZpkLmkToZpkZmkApiResponse;
    onTranslateZpkLmkToZpkZmkChanged: BehaviorSubject<any>;
    translateZpkLmkToZpkZmk: any;
    zpkUnderZmk: string;
    zpkKcv: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslateZpkLmkToZpkZmkChanged = new BehaviorSubject({});
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
     * TranslateZpkLmkToZpkZmk
     *
     * @param translateZpkLmkToZpkZmk
     * @returns {Promise<any>}
     */
    TranslateZpkLmkToZpkZmk(translateZpkLmkToZpkZmk): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslateZpkLmkToZpkZmk`,

                    {
                        ZmkUnderLmk: translateZpkLmkToZpkZmk.ZmkUnderLmk,
                        ZpkUnderLmk: translateZpkLmkToZpkZmk.ZpkUnderLmk,
                        AtallaVariant: translateZpkLmkToZpkZmk.AtallaVariant,
                    }
                )
                .subscribe((response: any) => {
                    this.zpkUnderZmk = response.ZpkUnderZmk;
                    this.zpkKcv = response.ZpkKcv;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.translateZpkLmkToZpkZmk = resolve(response);
                }, reject);
        });
    }
}
