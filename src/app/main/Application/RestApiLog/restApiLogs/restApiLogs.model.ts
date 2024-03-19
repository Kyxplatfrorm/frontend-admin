import { RestApiLogEntity } from "app/ui/restApiLog";

export class RestApiLog {
    Id: number;
    UniqueReferenceId: number;
    IsExternalCall: boolean;
    ProcessId: number;
    ApiStepNumber: number;
    ApiChannel: number;
    UserTypeId: number;
    HttpResponseCode: number;
    UserId: number;
    SessionId: number;
    InsertDateTime: any;
    UserName: string;
    UserFullName: string;
    HttpMethodId: number;
    HttpMethod: string;
    ControllerName: string;
    TenantId: number;
    ServerType: string;
    ServiceName: string;
    ServerName: string;
    ApiUrl: string;
    ApiHost: string;
    ApiName: string;
    ApiRunStatusId: number;
    ApiFullName: string;
    ErrorCode: string;
    ErrorDescription: string;
    UserAgent: string;
    ClientIp: string;
    ForwarderIp: string;
    Request: string;
    Response: string;
    DebugLog: string;
    Exception: string;
    TotalElapsed: number;
    TotalExternalElapsed: number;
    ApiReferenceNumber: string;
    SearchStartDate: any;
    SearchEndDate: any;
    SearchStartTime: number;
    SearchEndTime: number;
    ApiStatus: string;
    RestApiLogList: Array<RestApiLogEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param restApiLog
     */
    constructor(restApiLog?) {
        restApiLog = restApiLog || {};
        this.Id = restApiLog.Id;
        this.InsertDateTime = restApiLog.InsertDateTime;
        this.UserTypeId = restApiLog.UserTypeId;
        this.ApiFullName = restApiLog.ApiFullName;
        this.HttpMethodId = restApiLog.HttpMethodId;
        this.HttpMethod = restApiLog.HttpMethod;
        this.ControllerName = restApiLog.ControllerName;
        this.TenantId = restApiLog.TenantId;
        this.ApiStatus = restApiLog.ApiStatus;
        this.UniqueReferenceId = restApiLog.UniqueReferenceId;
        this.IsExternalCall = restApiLog.IsExternalCall;
        this.ProcessId = restApiLog.ProcessId;
        this.ApiStepNumber = restApiLog.ApiStepNumber;
        this.ApiChannel = restApiLog.ApiChannel;
        this.HttpResponseCode = restApiLog.HttpResponseCode;
        this.UserId = restApiLog.UserId;
        this.SessionId = restApiLog.SessionId;
        this.UserName = restApiLog.UserName;
        this.UserFullName = restApiLog.UserFullName;
        this.ServerType = restApiLog.ServerType;
        this.ServiceName = restApiLog.ServiceName;
        this.ServerName = restApiLog.ServerName;
        this.ApiUrl = restApiLog.ApiUrl;
        this.ApiHost = restApiLog.ApiHost;
        this.ApiName = restApiLog.ApiName;
        this.ApiRunStatusId = restApiLog.ApiRunStatusId;
        this.ErrorCode = restApiLog.ErrorCode;
        this.ErrorDescription = restApiLog.ErrorDescription;
        this.UserAgent = restApiLog.UserAgent;
        this.ClientIp = restApiLog.ClientIp;
        this.ForwarderIp = restApiLog.ForwarderIp;
        this.Request = restApiLog.Request;
        this.Response = restApiLog.Response;
        this.DebugLog = restApiLog.DebugLog;
        this.Exception = restApiLog.Exception;
        this.TotalElapsed = restApiLog.TotalElapsed;
        this.TotalExternalElapsed = restApiLog.TotalExternalElapsed;
        this.ApiReferenceNumber = restApiLog.ApiReferenceNumber;
        this.SearchStartDate = restApiLog.SearchStartDate;
        this.SearchEndDate = restApiLog.SearchEndDate;
        this.SearchEndTime = restApiLog.SearchEndTime;
        this.SearchEndTime = restApiLog.SearchEndTime;
        this.RestApiLogList = restApiLog.RestApiLogList;
        this.images = restApiLog.images || [];
    }
}
