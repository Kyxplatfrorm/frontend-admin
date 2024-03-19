import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    GeneratePinLmkApiResponse,
    SendRawMessageApiResponse,
} from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class SendRawMessageService {
    sendRawMessageApiResponse: SendRawMessageApiResponse;
    onSendRawMessageChanged: BehaviorSubject<any>;
    sendRawMessage: any;
    hsmRawHexResponse: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onSendRawMessageChanged = new BehaviorSubject({});
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
     * SendRawMessage
     *
     * @param sendRawMessage
     * @returns {Promise<any>}
     */
    SendRawMessage(sendRawMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/SendRawMessage`,

                    {
                        HsmRawHexRequest: sendRawMessage.HsmRawHexRequest,
                        LmkType: sendRawMessage.LmkType,
                    }
                )
                .subscribe((response: any) => {
                    this.hsmRawHexResponse = response.HsmRawHexResponse;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;

                    this.sendRawMessage = resolve(response);
                }, reject);
        });
    }
}
