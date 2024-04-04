export class CurrencyApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CurrencyEntity[];
}
export class CurrencyEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class LimitResetPeriodApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: LimitResetPeriodEntity[];
}
export class LimitResetPeriodEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CountryApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CountryEntity[];
}
export class CountryEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CardStatusTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CardStatusTypeEntity[];
}
export class CardStatusTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class OtpSendTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: OtpSendTypeEntity[];
}
export class OtpSendTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class ProductsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ProductsEntity[];
}
export class ProductsEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CardStatusesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CardStatusesEntity[];
}
export class CardStatusesEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CardApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CardList?: CardListEntity[];
}
export class CardListEntity {
    Id?: number;
    CustomerId?: number;
    CardBrand?: string;
    CardTokenNumber?: string;
    CardHolderName?: string;
    ProductName?: string;
    CardStatus?: string;
    CardStatusId?: number;
    IsActivated?: boolean;
    Email?: string;
    FullCellPhoneNumber?: string;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    Card?: CardEntity[];
}
export class CardEntity {
    Id?: number;
    CustomerId?: number;
    CardStatusId?: number;
    IsActivated?: boolean;
    ActivationDateTime?: any;
    HasInternationalUsage?: boolean;
    HasECommerceUsage?: boolean;
    HasMotoUsage?: boolean;
    ProductId?: number;
    EmbossName?: string;
    LimitResetPeriodId?: number;
    LimitCurrencyId?: number;
    LimitAmount?: number;
    LimitUsageAmount?: number;
    LastLimitUsageDateTime?: any;
    UsageBeginDateTime?: any;
    UsageEndDateTime?: any;
    OtpSendTypeId?: number;
    InternationalPhoneCode?: string;
    CellPhoneNumber?: string;
    Email?: string;
    Cvv2RetryCount?: number;
    Cvv2RetryDateTime?: any;
    LastTransactionMerchant?: string;
    LastTransactionAmount?: number;
    LastTransactionCurrencyCode?: string;
    CardStatusChangeDate?: any;
    LastTransactionResponseCode?: string;
    LastTransactionErrorCode?: string;
    Balance?: string;
}

export class CreateCardApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: string;
    ErrorDescription?: string;
    ProcessDateTime?: any;
    CardId?: number;
    CardTokenNumber?: string;
    CardHolderName?: string;
    ProductBrand?: string;
}

export class CardCvvInformationApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: string;
    ErrorDescription?: string;
    ProcessDateTime?: any;
    CardId?: number;
    CardTokenNumber?: string;
    ClearCardNumber?: string;
    ExpiryDateMMYY?: string;
    Cvv2?: string;
    CardHolderName?: string;
    ExpiryMonth?: string;
    ExpiryYear?: string;
    ProductBrand?: string;
}

export class CardBrandApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CardBrandEntity[];
}

export class CardBrandEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class CardTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CardTypeEntity[];
}

export class CardTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class TransactionEffectApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: TransactionEffectEntity[];
}

export class TransactionEffectEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class SwitchSessionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchSessionEntity[];
}

export class SwitchSessionEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class SwitchApplicationApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchApplicationEntity[];
}

export class SwitchApplicationEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class TransactionCodeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: TransactionCodeEntity[];
}

export class TransactionCodeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
