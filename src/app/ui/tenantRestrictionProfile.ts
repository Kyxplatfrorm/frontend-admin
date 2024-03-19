export class TenantRestrictionProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantRestrictionProfile?: TenantRestrictionProfileEntity[];
}

export class TenantRestrictionProfileEntity {
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
    TenantRestrictionProfileDetail?: TenantRestrictionProfileDetailEntity[];
}

export class TenantRestrictionProfileDetailEntity {
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
}
