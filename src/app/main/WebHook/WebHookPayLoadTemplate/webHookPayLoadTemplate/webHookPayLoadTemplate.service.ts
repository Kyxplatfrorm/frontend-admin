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
export class WebHookPayLoadTemplateService implements Resolve<any> {
    routeParams: any;
    onWebHookPayLoadTemplateChanged: BehaviorSubject<any>;
    webHookPayLoadTemplate: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onWebHookPayLoadTemplateChanged = new BehaviorSubject({});
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
            Promise.all([this.GetWebHookPayLoadTemplate()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetWebHookPayLoadTemplate
     *
     * @returns {Promise<any>}
     */
    GetWebHookPayLoadTemplate(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onWebHookPayLoadTemplateChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/WebHookPayloadTemplate/GetWebHookPayload?webHookPayloadId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.webHookPayLoadTemplate = response.WebHookPayload;
                        this.onWebHookPayLoadTemplateChanged.next(
                            this.webHookPayLoadTemplate
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * CreateWebHookPayLoadTemplate
     *
     * @param webHookPayLoadTemplate
     * @returns {Promise<any>}
     */
    CreateWebHookPayLoadTemplate(webHookPayLoadTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookPayloadTemplate/CreateWebHookPayload`,
                    {
                        WebHookPayload: webHookPayLoadTemplate.WebHookPayload,
                        WebHookTypeId: webHookPayLoadTemplate.WebHookTypeId,
                    }
                )

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateWebHookPayLoadTemplate
     *
     * @param webHookPayLoadTemplate
     * @returns {Promise<any>}
     */
    UpdateWebHookPayLoadTemplate(webHookPayLoadTemplate): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/WebHookPayloadTemplate/UpdateWebHookPayload`,
                    {
                        Id: webHookPayLoadTemplate.Id,
                        WebHookPayload: webHookPayLoadTemplate.WebHookPayload,
                        WebHookTypeId: webHookPayLoadTemplate.WebHookTypeId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
