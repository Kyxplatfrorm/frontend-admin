export class SchedulerJobDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SchedulerJobDefinitionList?: SchedulerJobDefinitionEntity[];
}

export class SchedulerJobDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    IsActive?: boolean;
    IsTenantBasedJob?: boolean;
    ServerCode?: string;
    Description?: string;
    StartDateTime?: any;
    EndDateTime?: any;
    StartTime?: number;
    EndTime?: number;
    RecurringType?: string;
    RecurringTypeName?: string;
    RecurringTypeId?: number;
    RecurringLevelId?: number;
    RecurringLevel?: string;
    RecurringLevelName?: string;
    RecurringEvery?: number;
    RecurringWeekDays?: string;
    LastRunDate?: any;
    LastRunStatus?: string;
    LastRunStatusId?: number;
    LastRunStatusName?: string;
    RecurringDailyTimes?: string;
    MachineName?: string;
    ApplicationId?: number;
    RunIfFails?: boolean;
    EstimatedExecutionTime?: number;
    HasMultiStep?: boolean;
    LastOrderId?: number;
    LastProcessedStepCount?: number;
    LastSubStepCount?: number;
    RecurringWeekDayList?: number[];
    SchedulerJobDetail?: SchedulerJobDetailEntity[];
}

export class SchedulerJobDetailEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    IsActive?: boolean;
    IsTenantBasedJob?: boolean;
    SchedulerJobId?: number;
    Description?: string;
    StartDateTime?: any;
    EndDateTime?: any;
    SchedulerJobName?: string;
    OrderId?: number;
    SchedulerJobType?: string;
    SchedulerJobTypeName?: string;
    SchedulerJobTypeId?: number;
    ApplicationName?: string;
    ApplicationPath?: string;
    ApplicationParameter?: string;
    FullClassName?: string;
    MethodName?: string;
    ProcedureName?: string;
    LastRunStatus?: string;
    LastRunStatusId?: number;
    LastRunStatusName?: string;
}

export class RecurringWeekDaysApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: RecurringWeekDaysEntity[];
}
export class RecurringWeekDaysEntity {
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

export class SchedulerJobDefinitionsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SchedulerJobDefinitionsEntity[];
}

export class SchedulerJobDefinitionsEntity {
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

export class SchedulerJobParameterTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SchedulerJobParameterTypeEntity[];
}

export class SchedulerJobParameterTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
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

export class SchedulerRecurringLevelApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SchedulerRecurringLevelEntity[];
}

export class SchedulerRecurringLevelEntity {
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
