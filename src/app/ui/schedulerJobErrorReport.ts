export class SchedulerJobErrorReportApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SchedulerJobErrorReportList?: SchedulerJobErrorReportEntity[];
}

export class SchedulerJobErrorReportEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    IsTenantBasedJob?: boolean;
    InsertDate?: number;
    ServerCode?: string;
    SchedulerJobId?: number;
    SchedulerJobDetailId?: number;
    SchedulerJobQueueId?: number;
    SchedulerJobDescription?: string;
    RunStatus?: string;
    RunStatusId?: number;
    RunStatusName?: string;
    ErrorMessage?: string;
    StartDateTime?: any;
    EndDateTime?: any;
    MachineName?: string;
    TotalElapsed?: number;
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

export class RunStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: RunStatusEntity[];
}

export class RunStatusEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
