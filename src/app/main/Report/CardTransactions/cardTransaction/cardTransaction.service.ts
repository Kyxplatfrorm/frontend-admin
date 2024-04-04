import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import {
    CardEmvTransactionEntity,
    SwitchMessagesEntity,
} from "app/ui/cardTransaction";

@Injectable()
export class CardTransactionService implements Resolve<any> {
    routeParams: any;
    onCardTransactionChanged: BehaviorSubject<any>;
    onEmvCardTransactionChanged: BehaviorSubject<any>;
    cardTransaction: any;
    cardEmvTransaction: CardEmvTransactionEntity[];
    switchMessagesList: SwitchMessagesEntity[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onCardTransactionChanged = new BehaviorSubject({});
        this.onEmvCardTransactionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetCardTransaction()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetCardTransaction
     *
     * @returns {Promise<any>}
     */
    GetCardTransaction(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onCardTransactionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/motion/adminapi/v1.0/CardTransaction/GetCardTransaction?cardTransactionId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.cardTransaction = response.CardTransaction;
                        this.cardEmvTransaction = response.EmvTransaction;
                        this.switchMessagesList = response.SwitchMessages;
                        this.onCardTransactionChanged.next(
                            this.cardTransaction
                        );
                        this.onEmvCardTransactionChanged.next(
                            this.cardEmvTransaction
                        );

                        resolve(response);
                    }, reject);
            }
        });
    }
}
