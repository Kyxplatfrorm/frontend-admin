import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    LmkTypeApiResponse,
    SwitchKeyProfileApiResponse,
    SwitchKeyTypeApiResponse,
} from "app/ui/switchKeyProfile";

@Injectable({ providedIn: "root" })
export class SwitchKeyProfilesService {
    switchKeyProfileApiResponse: SwitchKeyProfileApiResponse;
    switchKeyTypeApiResponse: SwitchKeyTypeApiResponse;
    lmkTypeApiResponse: LmkTypeApiResponse;
    onSwitchProfilesChanged: BehaviorSubject<any>;
    switchKey: any;

    constructor(private http: HttpClient) {
        this.onSwitchProfilesChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchKeyProfiles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetSwitchKeyProfiles
     *
     * @returns {Promise<any>}
     */
    GetSwitchKeyProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchKeyProfileApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/GetSwitchKeyProfiles`
                )
                .subscribe((response: SwitchKeyProfileApiResponse) => {
                    this.switchKeyProfileApiResponse = response;
                    this.onSwitchProfilesChanged.next(
                        this.switchKeyProfileApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetSwitchKeyTypes
     *
     * @returns {Promise<any>}
     */
    GetSwitchKeyTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<SwitchKeyTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/GetSwitchKeyTypes`
                )
                .subscribe((response: SwitchKeyTypeApiResponse) => {
                    this.switchKeyTypeApiResponse = response;
                    this.onSwitchProfilesChanged.next(
                        this.switchKeyTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetKeyLmkTypes
     *
     * @returns {Promise<any>}
     */
    GetKeyLmkTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<LmkTypeApiResponse>(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/GetKeyLmkTypes`
                )
                .subscribe((response: LmkTypeApiResponse) => {
                    this.lmkTypeApiResponse = response;
                    this.onSwitchProfilesChanged.next(this.lmkTypeApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteSwitchKeyProfile
     *
     * @param switchKey
     * @returns {Promise<any>}
     */
    DeleteSwitchKeyProfile(switchKey): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/motion/adminapi/v1.0/SwitchKeyProfile/DeleteSwitchKeyProfile?deleteSwitchKeyProfileId=` +
                        switchKey.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
