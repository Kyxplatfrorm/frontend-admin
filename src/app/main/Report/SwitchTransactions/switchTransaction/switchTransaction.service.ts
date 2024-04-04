import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable()
export class SwitchTransactionService implements Resolve<any> {
    routeParams: any;
    onSwitchTransactionChanged: BehaviorSubject<any>;
    switchTransaction: any;
    messageParseDetail: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onSwitchTransactionChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetSwitchTransaction()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchTransaction
     *
     * @returns {Promise<any>}
     */
    GetSwitchTransaction(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSwitchTransactionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetSwitchTransaction?switchTransactionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.switchTransaction = response.SwitchTransaction;
                        this.messageParseDetail = response.MessageParseDetail;
                        this.onSwitchTransactionChanged.next(
                            this.switchTransaction
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
