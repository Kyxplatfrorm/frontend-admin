import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GenerateZpkApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GenerateZpkService {
    generateZpkApiResponse: GenerateZpkApiResponse;
    onGenerateZpkChanged: BehaviorSubject<any>;
    generateZpk: any;
    zpkUnderLmk: string;
    zpkUnderZmk: string;
    zpkKcv: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGenerateZpkChanged = new BehaviorSubject({});
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
     * GenerateZpk
     *
     * @param generateZpk
     * @returns {Promise<any>}
     */
    GenerateZpk(generateZpk): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GenerateZpk`,

                    {
                        ZmkUnderLmk: generateZpk.ZmkUnderLmk,
                        AtallaVariant: generateZpk.AtallaVariant,
                    }
                )
                .subscribe((response: any) => {
                    this.zpkUnderLmk = response.ZpkUnderLmk;
                    this.zpkUnderZmk = response.ZpkUnderZmk;
                    this.zpkKcv = response.ZpkKcv;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.generateZpk = resolve(response);
                }, reject);
        });
    }
}
