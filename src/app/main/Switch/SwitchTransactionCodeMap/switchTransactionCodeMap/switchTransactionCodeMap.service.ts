import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "@fuse/services";
import { SwitchTransactionCodeMapApiResponse } from "app/ui/switchTransactionCodeMap";

@Injectable({ providedIn: "root" })
export class SwitchTransactionCodeMapService {
    switchTransactionCodeMapApiResponse: SwitchTransactionCodeMapApiResponse;
    onSwitchTransactionCodeMapChanged: BehaviorSubject<any>;
    routeParams: any;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.onSwitchTransactionCodeMapChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivaetdRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.GetSwitchTransactionCodeMap()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchTransactionCodeMap
     *
     * @returns {Promise<any>}
     */
    GetSwitchTransactionCodeMap(): Promise<any> {
        return new Promise((resolve, reject) => {
            const SwitchTransactionCodeMapId =
                this.routeParams.id !== undefined ? this.routeParams.id : "new";

            if (SwitchTransactionCodeMapId === "new") {
                this.onSwitchTransactionCodeMapChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get<SwitchTransactionCodeMapApiResponse>(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchTransactionCodeMap/GetSwitchTransactionCodeMaps?switchTransactionCodeMapId=${SwitchTransactionCodeMapId}`
                    )
                    .subscribe(
                        (response: SwitchTransactionCodeMapApiResponse) => {
                            this.switchTransactionCodeMapApiResponse = response;
                            this.onSwitchTransactionCodeMapChanged.next(
                                this.switchTransactionCodeMapApiResponse
                            );
                            resolve(response);
                        },
                        reject
                    );
            }
        });
    }

    /**
     * CreateSwitchTransactionCodeMap
     *
     * @param switchTransactionCodeMap
     * @returns {Promise<any>}
     */
    CreateSwitchTransactionCodeMap(switchTransactionCodeMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchTransactionCodeMap/CreateSwitchTransactionCodeMap`,
                    {
                        TransactionEntryTypeId:
                            switchTransactionCodeMap.TransactionEntryTypeId,
                        NetworkTypeId: switchTransactionCodeMap.NetworkTypeId,
                        TransactionCodeId:
                            switchTransactionCodeMap.TransactionCodeId,
                        TransactionAmount:
                            switchTransactionCodeMap.TransactionAmount,
                        Priority: switchTransactionCodeMap.Priority,
                        Mti: switchTransactionCodeMap.Mti,
                        ProcessingCode: switchTransactionCodeMap.ProcessingCode,
                        Description: switchTransactionCodeMap.Description,
                        IsActive: switchTransactionCodeMap.IsActive,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateSwitchTransactionCodeMap
     *
     * @param switchTransactionCodeMap
     * @returns {Promise<any>}
     */
    UpdateSwitchTransactionCodeMap(switchTransactionCodeMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchTransactionCodeMap/UpdateSwitchTransactionCodeMap`,
                    {
                        Id: switchTransactionCodeMap.Id,
                        TransactionEntryTypeId:
                            switchTransactionCodeMap.TransactionEntryTypeId,
                        TransactionCodeId:
                            switchTransactionCodeMap.TransactionCodeId,
                        TransactionAmount:
                            switchTransactionCodeMap.TransactionAmount,
                        Priority: switchTransactionCodeMap.Priority,
                        Mti: switchTransactionCodeMap.Mti,
                        ProcessingCode: switchTransactionCodeMap.ProcessingCode,
                        Description: switchTransactionCodeMap.Description,
                        IsActive: switchTransactionCodeMap.IsActive,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchTransactionCodeMap
     *
     * @param switchTransactionCodeMap
     * @returns {Promise<any>}
     */
    DeleteSwitchTransactionCodeMap(switchTransactionCodeMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchTransactionCodeMap/DeleteSwitchTransactionCodeMap?deleteSwitchTransactionCodeMapId=` +
                        switchTransactionCodeMap.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
