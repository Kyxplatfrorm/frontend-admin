import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PasswordChangeService {
    onPasswordChangeChanged: BehaviorSubject<any>;
    passwordChange: any;

    constructor(private http: HttpClient) {
        this.onPasswordChangeChanged = new BehaviorSubject({});
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
     * ForceChangePassword
     *
     * @param passwordChange
     * @returns {Promise<any>}
     */
    ForceChangePassword(passwordChange): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/Authentication/ForceChangePassword`,
                    {
                        NewPassword: passwordChange.NewPassword,
                        NewPassword2: passwordChange.NewPassword2,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
