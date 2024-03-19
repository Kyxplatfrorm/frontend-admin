import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { EncryptedDataApiResponse } from "app/ui/utility";
import { TokenizeCardNumberApiResponse } from "app/ui/tokenizeCard";

@Injectable({ providedIn: "root" })
export class TokenizeCardNumberService {
    tokenizeCardNumberApiResponse: TokenizeCardNumberApiResponse;
    onTokenizeCardNumberChanged: BehaviorSubject<any>;
    tokenizeCard: any;
    cardTokenNumber: string;

    constructor(private http: HttpClient) {
        this.onTokenizeCardNumberChanged = new BehaviorSubject({});
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
     * TokenizeCardNumber
     *
     * @param tokenizeCard
     * @returns {Promise<any>}
     */
    TokenizeCardNumber(tokenizeCard): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/TokenizeCardNumber`,
                    { CardNumber: tokenizeCard.CardNumber }
                )
                .subscribe((response: any) => {
                    this.cardTokenNumber = response.CardTokenNumber;
                    this.tokenizeCard = resolve(response);
                }, reject);
        });
    }
}
