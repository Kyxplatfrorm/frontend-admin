import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({ providedIn: "root" })
export class SettingsService {
    private _apiUrl: string;

    constructor(private http: HttpClient) {}

    public get ApiUrl(): string {
        return this._apiUrl;
    }

    public set ApiUrl(value: string) {
        this._apiUrl = value;
    }

    public loadConfig(): Promise<void> {
        return this.http
            .get<any>("/assets/config.json")
            .toPromise()
            .then((data) => {
                this.ApiUrl = data.ApiUrl;
                environment.apiUrl = data.ApiUrl;
            });
    }
}
