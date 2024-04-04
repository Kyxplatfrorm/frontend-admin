import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    ApplicationTypeApiResponse,
    MemoChannelTypeApiResponse,
    MemoCodeApiResponse,
    MemoKeyTypeApiResponse,
    MemoTypeApiResponse,
    TenantApiResponse,
} from "app/ui/cardMemoReport";

@Injectable({ providedIn: "root" })
export class CardMemoReportsService {
    tenantApiResponse: TenantApiResponse;
    applicationTypeApiResponse: ApplicationTypeApiResponse;
    memoChannelTypeApiResponse: MemoChannelTypeApiResponse;
    memoKeyTypeApiResponse: MemoKeyTypeApiResponse;
    memoTypeApiResponse: MemoTypeApiResponse;
    memoCodeApiResponse: MemoCodeApiResponse;
    onCardMemoReportsChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onCardMemoReportsChanged = new BehaviorSubject({});
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
     * GetApplicationTypes
     *
     * @returns {Promise<any>}
     */
    GetApplicationTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ApplicationTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/GetApplicationTypes`
                )
                .subscribe((response: ApplicationTypeApiResponse) => {
                    this.applicationTypeApiResponse = response;
                    this.onCardMemoReportsChanged.next(
                        this.applicationTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetMemoChannelTypes
     *
     * @returns {Promise<any>}
     */
    GetMemoChannelTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<MemoChannelTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/GetMemoChannelTypes`
                )
                .subscribe((response: MemoChannelTypeApiResponse) => {
                    this.memoChannelTypeApiResponse = response;
                    this.onCardMemoReportsChanged.next(
                        this.memoChannelTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetMemoKeyTypes
     *
     * @returns {Promise<any>}
     */
    GetMemoKeyTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<MemoKeyTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/GetMemoKeyTypes`
                )
                .subscribe((response: MemoKeyTypeApiResponse) => {
                    this.memoKeyTypeApiResponse = response;
                    this.onCardMemoReportsChanged.next(
                        this.memoKeyTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetMemoTypes
     *
     * @returns {Promise<any>}
     */
    GetMemoTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<MemoTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/GetMemoTypes`
                )
                .subscribe((response: MemoTypeApiResponse) => {
                    this.memoTypeApiResponse = response;
                    this.onCardMemoReportsChanged.next(
                        this.memoTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetMemoCodes
     *
     * @returns {Promise<any>}
     */
    GetMemoCodes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<MemoCodeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/GetMemoCodes`
                )
                .subscribe((response: MemoCodeApiResponse) => {
                    this.memoCodeApiResponse = response;
                    this.onCardMemoReportsChanged.next(
                        this.memoCodeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetTenants
     *
     * @returns {Promise<any>}
     */
    GetTenants(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<TenantApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/CardMemoReport/GetTenants`
                )
                .subscribe((response: TenantApiResponse) => {
                    this.tenantApiResponse = response;
                    this.onCardMemoReportsChanged.next(this.tenantApiResponse);
                    resolve(response);
                }, reject);
        });
    }
}
