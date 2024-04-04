export class SwitchTimeoutLogApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    MessageParseDetail?: string;
    SwitchTimeoutLogList?: SwitchTimeoutLogEntity[];
}

export class SwitchTimeoutLogEntity {
    Id?: number;
    ApplicationName?: string;
    SessionName?: string;
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
}

export class SwitchApplicationSessionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchApplicationSessionEntity[];
}

export class SwitchApplicationSessionEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class SwitchApplicationsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchApplicationsEntity[];
}

export class SwitchApplicationsEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
