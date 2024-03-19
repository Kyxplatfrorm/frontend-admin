export class SystemRestrictionProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SystemRestrictionProfile?: SystemRestrictionProfileEntity[];
}

export class SystemRestrictionProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    HasInternationalUsage?: boolean;
    HasECommerceUsage?: boolean;
    HasMotoUsage?: boolean;
    HasAtmUsage?: boolean;
    MerchantRestrictionCheckType?: string;
    MccRestrictionCheckType?: string;
    TransactionRestrictionCheckType?: string;
    CountryRestrictionCheckType?: string;
    MerchantNameRestrictionCheckType?: string;
    AcquirerRestrictionCheckType?: string;
    MinimumTransactionAmount?: number;
    MaximumTransactionAmount?: number;
    MerchantRestrictionCheckTypeId?: number;
    MccRestrictionCheckTypeId?: number;
    TransactionRestrictionCheckTypeId?: number;
    CountryRestrictionCheckTypeId?: number;
    MerchantNameRestrictionCheckTypeId?: number;
    AcquirerRestrictionCheckTypeId?: number;
    TenantRestrictionCheckTypeId?: number;
    TenantRestrictionCheckType?: string;
    SystemRestrictionProfileDetailList?: SystemRestrictionProfileDetailEntity[];
}

export class SystemRestrictionProfileDetailEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: number;
    ProfileId?: number;
    RestrictionType?: string;
    RestrictionCode?: string;
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

export class RestrictionCheckTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: RestrictionCheckTypeEntity[];
}
export class RestrictionCheckTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class RestrictionTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: RestrictionTypeEntity[];
}
export class RestrictionTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}
