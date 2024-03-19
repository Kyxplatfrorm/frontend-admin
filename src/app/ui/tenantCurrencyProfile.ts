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

export class TenantCurrencyProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantCurrencyProfileList?: TenantCurrencyProfileEntity[];
}

export class TenantCurrencyProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    CurrencyCode?: string;
    CurrencyCodeNumeric?: string;
    TenantId?: number;
    IsActive?: boolean;
    CurrencyName?: string;
    IsSettlementCurrency?: boolean;
    IsCryptoCurrency?: boolean;
}
