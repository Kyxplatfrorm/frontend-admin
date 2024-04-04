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
export class CardMemoReportService implements Resolve<any> {
    routeParams: any;
    onCardMemoReportChanged: BehaviorSubject<any>;
    cardMemoReport: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onCardMemoReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetCardMemoReport()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCardMemoReport
     *
     * @returns {Promise<any>}
     */
    GetCardMemoReport(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onCardMemoReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/GetCardMemoReport?cardMemoReportId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.cardMemoReport = response.CardMemoReport;
                        this.onCardMemoReportChanged.next(this.cardMemoReport);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
