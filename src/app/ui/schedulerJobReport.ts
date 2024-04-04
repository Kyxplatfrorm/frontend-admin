export class SchedulerJobReportApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SchedulerJobQueueList?: SchedulerJobQueueEntity[];
}

export class SchedulerJobQueueEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    Description?: string;
    ServerCode?: string;
    SchedulerJobName?: string;
    SchedulerJobDetailName?: string;
    RecurringType?: string;
    RecurringTypeName?: string;
    RunStatus?: string;
    RunStatusName?: string;
    SchedulerJobType?: string;
    SchedulerJobTypeName?: string;
    ApplicationName?: string;
    ApplicationPath?: string;
    ApplicationParameter?: string;
    FullClassName?: string;
    MethodName?: string;
    ProcedureName?: string;
    ResultMessage?: string;
    MachineName?: string;
    IsTenantBasedJob?: boolean;
    IsInstantJob?: boolean;
    InsertDate?: number;
    SchedulerJobId?: number;
    SchedulerJobDetailId?: number;
    RecurringTypeId?: number;
    OrderId?: number;
    RunStatusId?: number;
    SchedulerJobTypeId?: number;
    ExitCode?: number;
    Pid?: number;
    ExecutionTimeout?: number;
    RetryCount?: number;
    DueDate?: number;
    ApplicationId?: number;
    TotalElapsed?: number;
    QueueDateTime?: any;
    StartDateTime?: any;
    EndDateTime?: any;
    DueDateTime?: any;
}

export class SchedulerJobStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SchedulerJobStatusEntity[];
}

export class SchedulerJobStatusEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class SchedulerJobTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SchedulerJobTypeEntity[];
}

export class SchedulerJobTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class SchedulerRecurringTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SchedulerRecurringTypeEntity[];
}

export class SchedulerRecurringTypeEntity {
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
