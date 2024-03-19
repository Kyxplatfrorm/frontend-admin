export class TenantLimitProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantLimitProfile?: TenantLimitProfileEntity[];
}
export class TenantLimitProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    CurrencyCode?: string;
    CurrencyId?: number;
    TenantLimitProfileDetailList?: TenantLimitProfileDetailEntity[];
}
export class TenantLimitProfileDetailEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ProfileId?: number;
    TransactionGroup?: string;
    TransactionGroupName?: string;
    TransactionGroupId?: number;
    HasOneTimeMaxAmount?: boolean;
    OneTimeMaxAmount?: number;
    HasDailyLimitAmount?: boolean;
    DailyLimitAmount?: number;
    HasDailyLimitCount?: boolean;
    DailyLimitCount?: number;
    HasWeeklyLimitAmount?: boolean;
    WeeklyLimitAmount?: number;
    HasWeeklyLimitCount?: boolean;
    WeeklyLimitCount?: number;
    HasMonthlyLimitAmount?: boolean;
    MonthlyLimitAmount?: number;
    HasMonthlyLimitCount?: boolean;
    MonthlyLimitCount?: number;
    HasYearlyLimitAmount?: boolean;
    YearlyLimitAmount?: number;
    HasYearlyLimitCount?: boolean;
    YearlyLimitCount?: number;
    CustomerSegment?: string;
    CustomerSegmentName?: string;
    CustomerSegmentId?: number;
}

export class LimitCardTransactionGroupApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: LimitCardTransactionGroupEntity[];
}
export class LimitCardTransactionGroupEntity {
    Id?: number;
    Description?: string;
}
export class LimitCurrencyListApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: LimitCurrencyEntity[];
}
export class LimitCurrencyEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class CustomerSegmentApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CustomerSegmentEntity[];
}
export class CustomerSegmentEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class LimitProfileDetailApiResponse {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    ProfileName?: string;
    CurrencyCode?: string;
    CurrencyId?: number;
    LimitProfileDetail?: LimitDetailEntity[];
}
export class LimitDetailEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ProfileId?: number;
    TransactionGroup?: string;
    ProfileName?: string;
    TransactionGroupName?: string;
    TransactionGroupId?: number;
    HasOneTimeMaxAmount?: boolean;
    OneTimeMaxAmount?: number;
    HasDailyLimitAmount?: boolean;
    DailyLimitAmount?: number;
    HasDailyLimitCount?: boolean;
    DailyLimitCount?: number;
    HasWeeklyLimitAmount?: boolean;
    WeeklyLimitAmount?: number;
    HasWeeklyLimitCount?: boolean;
    WeeklyLimitCount?: number;
    HasMonthlyLimitAmount?: boolean;
    MonthlyLimitAmount?: number;
    HasMonthlyLimitCount?: boolean;
    MonthlyLimitCount?: number;
    HasYearlyLimitAmount?: boolean;
    YearlyLimitAmount?: number;
    HasYearlyLimitCount?: boolean;
    YearlyLimitCount?: number;
    CustomerSegment?: string;
    CustomerSegmentName?: string;
    CustomerSegmentId?: number;
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
    TenantCode?: string;
    DefaultCurrencyCode?: string;
}
