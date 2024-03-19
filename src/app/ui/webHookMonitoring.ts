export class WebHookMonitoringApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    WebHookQueueWithoutContentList?: WebHookQueueWithoutContentEntity[];
}

export class WebHookQueueWithoutContentEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    CompanyId?: number;
    InsertDate?: number;
    WebHookProfileId?: number;
    WebHookTypeId?: number;
    RunStatusId?: number;
    HttpStatusCode?: number;
    RetryCount?: number;
    ApplicationId?: number;
    TotalElapsed?: number;
    WebHookType?: string;
    WebHookTypeName?: string;
    RecordType?: string;
    RunStatus?: string;
    RunStatusName?: string;
    HttpPostUrl?: string;
    ResultMessage?: string;
    MachineName?: string;
    ReferenceNumberType?: string;
    ReferenceNumber?: string;
    DueDateTime?: any;
    QueueDateTime?: any;
    StartDateTime?: any;
    EndDateTime?: any;
}
export class WebHookTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: WebHookTypeEntity[];
}

export class WebHookTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class WebHookRunStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: WebHookRunStatusEntity[];
}

export class WebHookRunStatusEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class TenantApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantDefinitionList?: TenantDefinitionEntity[];
}

export class TenantDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantName?: string;
}
