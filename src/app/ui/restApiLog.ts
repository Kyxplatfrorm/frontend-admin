export class RestApiLogResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    RestApiLogList?: RestApiLogEntity[];
}

export class RestApiLogEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    UniqueReferenceId?: number;
    ApiReferenceNumber?: string;
    IsExternalCall?: boolean;
    ProcessId?: number;
    ApiStepNumber?: number;
    ApiChannel?: number;
    HttpResponseCode?: number;
    SessionId?: number;
    UserId?: number;
    UserName?: string;
    UserFullName?: string;
    ServerType?: string;
    ServiceName?: string;
    ServerName?: string;
    ApiUrl?: string;
    ApiHost?: string;
    ApiName?: string;
    ApiStatus?: string;
    ErrorCode?: string;
    ErrorDescription?: string;
    UserAgent?: string;
    ClientIp?: string;
    ForwarderIp?: string;
    Exception?: string;
    TotalElapsed?: number;
}

export class TenantApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: TenantEntity[];
}
export class TenantEntity {
    Id?: number;
    Description?: string;
}

export class ApiRunStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ApiRunStatusEntity[];
}
export class ApiRunStatusEntity {
    Id?: number;
    Description?: string;
}

export class HttpMethodApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: HttpMethodEntity[];
}
export class HttpMethodEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
