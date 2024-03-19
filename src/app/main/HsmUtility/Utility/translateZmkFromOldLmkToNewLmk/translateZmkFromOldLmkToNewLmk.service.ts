import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { TranslateZmkFromOldLmkToNewLmkApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class TranslateZmkFromOldLmkToNewLmkService {
    translateZmkFromOldLmkToNewLmkApiResponse: TranslateZmkFromOldLmkToNewLmkApiResponse;
    onTranslateZmkFromOldLmkToNewLmkChanged: BehaviorSubject<any>;
    translateZmkFromOldLmkToNewLmk: any;
    zmkKeyUnderLmk: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onTranslateZmkFromOldLmkToNewLmkChanged = new BehaviorSubject({});
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
     * TranslateZmkFromOldLmkToNewLmk
     *
     * @param translateZmkFromOldLmkToNewLmk
     * @returns {Promise<any>}
     */
    TranslateZmkFromOldLmkToNewLmk(
        translateZmkFromOldLmkToNewLmk
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/TranslateZmkFromOldLmkToNewLmk`,

                    {
                        LmkZmkKey: translateZmkFromOldLmkToNewLmk.LmkZmkKey,
                        LmkIdentifier:
                            translateZmkFromOldLmkToNewLmk.LmkIdentifier,
                    }
                )
                .subscribe((response: any) => {
                    this.zmkKeyUnderLmk = response.ZmkKeyUnderLmk;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.translateZmkFromOldLmkToNewLmk = resolve(response);
                }, reject);
        });
    }
}
