export class ApiLimitProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApiLimitProfileList?: ApiLimitProfileListEntity[];
}
export class ApiLimitProfileListEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    ProfileName?: string;
    IsBuiltInDefinition?: boolean;
    HasValidDays?: boolean;
    HasValidHours?: boolean;
    ValidStartTime?: string;
    ValidEndTime?: string;
    HasDailyMaxExecutionCount?: boolean;
    DailyMaxExecutionCount?: number;
    HasMaxTpsCount?: boolean;
    MaxTpsCount?: number;
    ValidDayList?: number[];
}

export class ValidDaysApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ValidDaysEntity[];
}
export class ValidDaysEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
