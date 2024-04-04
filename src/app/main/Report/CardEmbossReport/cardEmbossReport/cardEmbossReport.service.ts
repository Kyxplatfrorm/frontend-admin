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
export class CardEmbossReportService implements Resolve<any> {
    routeParams: any;
    onCardEmbossReportChanged: BehaviorSubject<any>;
    cardEmbossReport: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onCardEmbossReportChanged = new BehaviorSubject({});
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
            Promise.all([this.GetCardEmbossReport()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCardEmbossReport
     *
     * @returns {Promise<any>}
     */
    GetCardEmbossReport(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onCardEmbossReportChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/CardEmbossReport/GetCardEmbossReport?cardEmbossReportId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.cardEmbossReport = response.CardEmbossReport;
                        this.onCardEmbossReportChanged.next(
                            this.cardEmbossReport
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
