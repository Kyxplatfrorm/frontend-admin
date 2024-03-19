import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    SwitchConnectionApiResponse,
    SwitchConnectionLogApiResponse,
} from "app/ui/switchConnection";

@Injectable({ providedIn: "root" })
export class SwitchConnectionService {
    switchConnectionApiResponse: SwitchConnectionApiResponse;
    onSwitchConnectionChanged: BehaviorSubject<any>;
    switchConnection: any;
    routeParams: any;

    constructor(private http: HttpClient) {
        this.onSwitchConnectionChanged = new BehaviorSubject({});
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
            Promise.all([this.GetSwitchConnectionsByApplicationId()]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    FillSwitchConnectionTable(switchConnection): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.switchConnectionApiResponse == undefined) {
                this.switchConnectionApiResponse =
                    new SwitchConnectionApiResponse();
                this.switchConnectionApiResponse.IsSucceeded = true;
                this.switchConnectionApiResponse.ConnectionList = [];
            }
            this.onSwitchConnectionChanged.next(
                this.switchConnectionApiResponse
            );
            resolve(this.switchConnectionApiResponse);
        });
    }

    /**
     * GetSwitchConnectionsByApplicationId
     *
     * @returns {Promise<any>}
     */
    GetSwitchConnectionsByApplicationId(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onSwitchConnectionChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get<SwitchConnectionApiResponse>(
                        `${environment.apiUrl}/motion/adminapi/v1.0/SwitchConnection/GetSwitchConnectionsByApplicationId?switchConnectionApplicationId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: SwitchConnectionApiResponse) => {
                        this.switchConnectionApiResponse = response;
                        this.onSwitchConnectionChanged.next(
                            this.switchConnectionApiResponse
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }
}
