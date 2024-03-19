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
export class TenantCardAuthorizationProfileService implements Resolve<any> {
    routeParams: any;
    tenantCardAuthorization: any;
    onTenantCardAuthorizationProfileChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private http: HttpClient) {
        this.onTenantCardAuthorizationProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenantCardAuthorizationProfile()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetTenantCardAuthorizationProfile
     *
     * @returns {Promise<any>}
     */
    GetTenantCardAuthorizationProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onTenantCardAuthorizationProfileChanged.next(false);
                resolve(false);
            } else {
                this.http
                    .get(
                        `${environment.apiUrl}/core/coreapi/v1.0/TenantCardAuthorizationProfile/GetTenantCardAuthorizationProfile?tenantCardAuthorizationProfileId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.tenantCardAuthorization =
                            response.TenantCardAuthorizationProfile;
                        this.onTenantCardAuthorizationProfileChanged.next(
                            this.tenantCardAuthorization
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * UpdateTenantCardAuthorizationProfile
     *
     * @param tenantCardAuthorization
     * @returns {Promise<any>}
     */
    UpdateTenantCardAuthorizationProfile(
        tenantCardAuthorization
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCardAuthorizationProfile/UpdateTenantCardAuthorizationProfile`,
                    {
                        Id: tenantCardAuthorization.Id,
                        TenantId: tenantCardAuthorization.TenantId,
                        HasExternalAuthorization:
                            tenantCardAuthorization.HasExternalAuthorization,
                        AuthorizationUrl:
                            tenantCardAuthorization.AuthorizationUrl,
                        EncryptedApiKey:
                            tenantCardAuthorization.EncryptedApiKey,
                        EncryptedSecretKey:
                            tenantCardAuthorization.EncryptedSecretKey,
                        SendDailySettlementFile:
                            tenantCardAuthorization.SendDailySettlementFile,
                        SftpServer: tenantCardAuthorization.SftpServer,
                        SftpPort: tenantCardAuthorization.SftpPort,
                        SftpUserName: tenantCardAuthorization.SftpUserName,
                        SftpEncryptedPassword:
                            tenantCardAuthorization.SftpEncryptedPassword,
                        SftpPath: tenantCardAuthorization.SftpPath,
                        ExportDailySettlementFileToLocalFolder:
                            tenantCardAuthorization.ExportDailySettlementFileToLocalFolder,
                        SettlementFilePath:
                            tenantCardAuthorization.SettlementFilePath,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
