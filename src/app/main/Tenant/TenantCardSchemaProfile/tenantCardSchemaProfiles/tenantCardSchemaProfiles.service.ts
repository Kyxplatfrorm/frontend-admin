import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {
    BinBrandsApiResponse,
    TenantCardSchemaApiResponse,
} from "app/ui/tenantCardSchema";
import { AuthenticationService } from "@fuse/services";
import { Console } from "console";

@Injectable({ providedIn: "root" })
export class TenantCardSchemaProfilesService {
    tenantCardSchemaApiResponse: TenantCardSchemaApiResponse;
    binBrandsApiResponse: BinBrandsApiResponse;
    onTenantCardSchemaProfileChanged: BehaviorSubject<any>;
    tenantCardSchema: any;
    routeParams: any;
    tenantId: number;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.onTenantCardSchemaProfileChanged = new BehaviorSubject({});
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
            Promise.all([this.GetTenantCardSchemaProfiles()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * GetTenantCardSchemaProfiles
     *
     * @returns {Promise<any>}
     */
    GetTenantCardSchemaProfiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams && this.routeParams.id === "new") {
                this.onTenantCardSchemaProfileChanged.next(false);
                resolve(false);
            } else {

                this.authenticationService.SetSelectedTenantId(
                    this.routeParams.id
                );

                this.http
                    .get<TenantCardSchemaApiResponse>(
                        `${environment.apiUrl}/core/coreapi/v1.0/TenantCardSchemaProfile/GetTenantCardSchemaProfiles?tenantId=` +
                            this.routeParams.id
                    )
                    .subscribe((response: TenantCardSchemaApiResponse) => {
                        this.tenantCardSchemaApiResponse = response;
                        this.onTenantCardSchemaProfileChanged.next(
                            this.tenantCardSchemaApiResponse
                        );
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * GetBinBrands
     *
     * @returns {Promise<any>}
     */
    GetBinBrands(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<BinBrandsApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCardSchemaProfile/GetBinBrands`
                )
                .subscribe((response: BinBrandsApiResponse) => {
                    this.binBrandsApiResponse = response;
                    this.onTenantCardSchemaProfileChanged.next(
                        this.binBrandsApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }

    /**
     * CreateTenantCardSchemaProfile
     *
     * @param tenantCardSchema
     * @returns {Promise<any>}
     */
    CreateTenantCardSchemaProfile(tenantCardSchema): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCardSchemaProfile/CreateTenantCardSchemaProfile`,
                    {
                        TenantId:
                            this.authenticationService.GetSelectedTenantId(),
                        CardSchemaId: tenantCardSchema.CardSchemaId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * UpdateTenantCardSchemaProfile
     *
     * @param tenantCardSchema
     * @returns {Promise<any>}
     */
    UpdateTenantCardSchemaProfile(tenantCardSchema): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCardSchemaProfile/UpdateTenantCardSchemaProfile`,
                    {
                        Id: tenantCardSchema.Id,
                        CardSchemaId: tenantCardSchema.CardSchemaId,
                    }
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * DeleteTenantCardSchemaProfile
     *
     * @param tenantCardSchema
     * @returns {Promise<any>}
     */
    DeleteTenantCardSchemaProfile(tenantCardSchema): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(
                    `${environment.apiUrl}/core/coreapi/v1.0/TenantCardSchemaProfile/DeleteTenantCardSchemaProfile?deleteTenantCardSchemaProfileId=` +
                        tenantCardSchema.Id
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
