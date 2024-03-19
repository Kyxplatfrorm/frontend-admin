import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: "root" })
export class OtpVerifyLoginService {
    onOtpVerifyLoginChanged: BehaviorSubject<any>;
    otpVerifyLoginChange: any;
    constructor(private http: HttpClient) {
        this.onOtpVerifyLoginChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * VerifyLoginOtp
     *
     * @param optVerify
     * @returns {Promise<any>}
     */
    VerifyLoginOtp(optVerify): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Authentication/VerifyLoginOtp`,
                    {
                        Otp: optVerify.Otp,
                        OtpId: optVerify.OtpId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
