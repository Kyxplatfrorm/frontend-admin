export class CardTransactionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    MessageParseDetail?: string;
    CardTransactionList?: CardTransactionEntity[];
}

export class CardTransactionEntity {
    Id?: number;
    CardType?: string;
    CardBrand?: string;
    InsertDateTime?: any;
    Mti?: number;
    ProcessingCode?: string;
    CardTokenNumber?: string;
    TransactionCode?: string;
    TransactionEffect?: string;
    ProvisionTransactionType?: string;
    CommissionAmount?: number;
    ApplicationNetwork?: string;
    ServerName?: string;
    SettlementStatus?: string;
    TransactionEntryType?: string;
    EmvTransaction?: CardEmvTransactionEntity[];
    SwitchMessages?: SwitchMessagesEntity[];
}

export class CardEmvTransactionEntity {
    Id?: number;
    CardId?: number;
    ReferenceNumber?: string;
    InsertDateTime?: any;
    F55Length?: number;
    F55Tag5F34?: string;
    F55Tag5F2A?: string;
    F55Tag82?: string;
    F55Tag84?: string;
    F55Tag95?: string;
    F55Tag9A?: string;
    F55Tag9C?: string;
    F55Tag9F02?: string;
    F55Tag9F03?: string;
    F55Tag9F10?: string;
    F55Tag9F1A?: string;
    F55Tag9F26?: string;
    F55Tag9F27?: string;
    F55Tag9F33?: string;
    F55Tag9F34?: string;
    F55Tag9F36?: string;
    F55Tag9F37?: string;
    F55Tag91?: string;
    F55Tag71?: string;
    F55Tag72?: string;
    CardTokenNumber?: string;
}

export class SwitchMessagesEntity {
    Id?: number;
    TraceNumber?: string;
    ReferenceNumber?: string;
    InsertDateTime?: any;
    Mti?: number;
    ProcessingCode?: string;
    CardTokenNumber?: string;
    Rrn?: string;
    ApplicationType?: string;
    TransactionType?: string;
    AcquirerId?: string;
    MerchantCode?: string;
    ServerName?: string;
    RemoteIpAddress?: string;
    TerminalId?: string;
    LocalIpAddress?: string;
    TransactionAmount?: number;
    TransactionCurrencyCode?: string;
    TxnDescription?: string;
    AuthorizationCode?: string;
    ResponseCode?: string;
    ApplicationId?: number;
    RemotePort?: number;
    SessionId?: number;
    LocalPort?: number;
    RoutedRemotePort?: number;
    RoutedLocalPort?: number;
    SettlementAmount?: number;
    RoutedRemoteIpAddress?: string;
    RoutedLocalIpAddress?: string;
    HexMessage?: string;
    SettlementCurrencyCode?: string;
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
