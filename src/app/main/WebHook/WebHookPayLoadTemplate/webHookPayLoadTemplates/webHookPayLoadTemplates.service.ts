import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    WebHookPayLoadTemplateApiResponse,
    WebHookTypeApiResponse,
} from "app/ui/webHookPayLoadTemplate";

@Injectable({ providedIn: "root" })
export class WebHookPayLoadTemplatesService {
    webHookPayLoadTemplateApiResponse: WebHookPayLoadTemplateApiResponse;
    webHookTypeApiResponse: WebHookTypeApiResponse;
    onWebHookPayLoadTemplatesChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onWebHookPayLoadTemplatesChanged = new BehaviorSubject({});
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
            Promise.all([this.GetWebHookPayloadTemplates()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetWebHookPayloads
     *
     * @returns {Promise<any>}
     */
    GetWebHookPayloadTemplates(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<WebHookPayLoadTemplateApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookPayloadTemplate/GetWebHookPayloads`
                )
                .subscribe((response: WebHookPayLoadTemplateApiResponse) => {
                    this.webHookPayLoadTemplateApiResponse = response;
                    this.onWebHookPayLoadTemplatesChanged.next(
                        this.webHookPayLoadTemplateApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetWebHookTypes
     *
     * @returns {Promise<any>}
     */
    GetWebHookTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<WebHookTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookPayloadTemplate/GetWebHookTypes`
                )
                .subscribe((response: WebHookTypeApiResponse) => {
                    this.webHookTypeApiResponse = response;
                    this.onWebHookPayLoadTemplatesChanged.next(
                        this.webHookTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteWebHookPayload
     *
     * @param webHookPayLoadTemplate
     * @returns {Promise<any>}
     */
    DeleteWebHookPayloadTemplate(webHookPayLoadTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookPayloadTemplate/DeleteWebHookPayload?deleteWebHookPayloadId=` +
                        webHookPayLoadTemplate.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
