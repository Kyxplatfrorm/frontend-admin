export class SchedulerInstantJobProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SchedulerInstantJobProfileList?: SchedulerInstantJobProfileEntity[];
}

export class SchedulerInstantJobProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    ProfileCode?: string;
    IsTenantBasedJob?: boolean;
    ServerCode?: string;
    Description?: string;
    SchedulerJobId?: number;
    SchedulerJobType?: string;
    SchedulerJobTypeName?: string;
    ApplicationPath?: string;
    ApplicationName?: string;
    ApplicationParameter?: string;
    FullClassName?: string;
    MethodName?: string;
    ProcedureName?: string;
    SchedulerJobTypeId?: number;
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

export class SchedulerJobTypesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SchedulerJobTypesEntity[];
}

export class SchedulerJobTypesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
