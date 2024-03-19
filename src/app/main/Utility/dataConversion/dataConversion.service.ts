import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
    DataConversionApiResponse,
    DataConversionTypeApiResponse,
} from "app/ui/utility";

@Injectable({ providedIn: "root" })
export class DataConversionService {
    dataConversionApiResponse: DataConversionApiResponse;
    dataConversionTypeApiResponse: DataConversionTypeApiResponse;
    onDataConversionChanged: BehaviorSubject<any>;
    dataConversion: any;
    result: string;

    constructor(private http: HttpClient) {
        this.onDataConversionChanged = new BehaviorSubject({});
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
     * DataConversion
     *
     * @param dataConversion
     * @returns {Promise<any>}
     */
    DataConversion(dataConversion): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/DataConversion`,
                    {
                        DataConversionTypeId:
                            dataConversion.DataConversionTypeId,
                        Data: dataConversion.Data,
                    }
                )
                .subscribe((response: any) => {
                    this.result = response.Result;
                    this.dataConversion = resolve(response);
                }, reject);
        });
    }

    /**
     * GetDataConversionTypes
     *
     * @returns {Promise<any>}
     */
    GetDataConversionTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<DataConversionTypeApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Utility/GetDataConversionTypes`
                )
                .subscribe((response: DataConversionTypeApiResponse) => {
                    this.dataConversionTypeApiResponse = response;
                    this.onDataConversionChanged.next(
                        this.dataConversionTypeApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
