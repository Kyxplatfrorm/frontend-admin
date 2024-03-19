import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { GenerateTrackDataApiResponse } from "app/ui/hsmUtility";

@Injectable({ providedIn: "root" })
export class GenerateTrackDataService {
    generateTrackDataApiResponse: GenerateTrackDataApiResponse;
    onGenerateTrackDataChanged: BehaviorSubject<any>;
    generateTrackData: any;
    track1: string;
    track2: string;
    track2Chip: string;
    cvv: string;
    ıCvv: string;
    cvv2: string;
    hsmErrorCode: string;
    hsmErrorDescription: string;

    constructor(private http: HttpClient) {
        this.onGenerateTrackDataChanged = new BehaviorSubject({});
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
     * GenerateTrackData
     *
     * @param generateTrackData
     * @returns {Promise<any>}
     */
    GenerateTrackData(generateTrackData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    `${environment.apiUrl}/motion/adminapi/v1.0/HsmUtility/GenerateTrackData`,

                    {
                        CvkUnderLmk: generateTrackData.CvkUnderLmk,
                        CardNumber: generateTrackData.CardNumber,
                        ExpiryDateYYMM: generateTrackData.ExpiryDateYYMM,
                        ServiceCode: generateTrackData.ServiceCode,
                        EmbossName: generateTrackData.EmbossName,
                        PvvKeyIndex: generateTrackData.PvvKeyIndex,
                        Pvv: generateTrackData.Pvv,
                        CvvOffset: generateTrackData.CvvOffset,
                    }
                )
                .subscribe((response: any) => {
                    this.track1 = response.Track1;
                    this.track2 = response.Track2;
                    this.track2Chip = response.Track2Chip;
                    this.cvv = response.Cvv;
                    this.ıCvv = response.ICvv;
                    this.cvv2 = response.Cvv2;
                    this.hsmErrorCode = response.HsmErrorCode;
                    this.hsmErrorDescription = response.HsmErrorDescription;
                    this.generateTrackData = resolve(response);
                }, reject);
        });
    }
}
