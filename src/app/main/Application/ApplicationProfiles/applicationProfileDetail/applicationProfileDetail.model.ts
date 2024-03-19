export class ApplicationProfile {
    Id: number;
    DisableOperationLogging: boolean;
    HasCommandTimeout: boolean;
    DisableMonitoring: boolean;
    DisableRestLog: boolean;
    EnableSpaHosting: boolean;
    EnableSwaggerLogin: boolean;
    LogHttpGetApiCalls: boolean;
    EnableSwagger: boolean;
    MaskJsonRequest: boolean;
    LoadExternalWebApi: boolean;
    ChangeHttpStatusCode: boolean;
    ProfileName: string;
    SqlLogTimeoutThreshold: number;
    TimeZoneInMinute: number;
    CommandTimeout: number;
    SpaHostingPath: string;
    SwaggerBasePath: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param applicationprofile
     */
    constructor(applicationprofile?) {
        applicationprofile = applicationprofile || {};
        this.Id = applicationprofile.Id;
        this.LogHttpGetApiCalls = applicationprofile.LogHttpGetApiCalls;
        this.DisableOperationLogging =
            applicationprofile.DisableOperationLogging;
        this.HasCommandTimeout = applicationprofile.HasCommandTimeout;
        this.DisableMonitoring = applicationprofile.DisableMonitoring;
        this.DisableRestLog = applicationprofile.DisableRestLog;
        this.EnableSpaHosting = applicationprofile.EnableSpaHosting;
        this.EnableSwaggerLogin = applicationprofile.EnableSwaggerLogin;
        this.EnableSwagger = applicationprofile.EnableSwagger;
        this.LoadExternalWebApi = applicationprofile.LoadExternalWebApi;
        this.ChangeHttpStatusCode = applicationprofile.ChangeHttpStatusCode;
        this.ProfileName = applicationprofile.ProfileName;
        this.SqlLogTimeoutThreshold = applicationprofile.SqlLogTimeoutThreshold;
        this.TimeZoneInMinute = applicationprofile.TimeZoneInMinute;
        this.CommandTimeout = applicationprofile.CommandTimeout;
        this.SpaHostingPath = applicationprofile.SpaHostingPath;
        this.SwaggerBasePath = applicationprofile.SwaggerBasePath;
        this.InsertDateTime = applicationprofile.InsertDateTime;
        this.UpdateDateTime = applicationprofile.UpdateDateTime;
        this.MaskJsonRequest = applicationprofile.MaskJsonRequest;
        this.images = applicationprofile.images || [];
    }
}
