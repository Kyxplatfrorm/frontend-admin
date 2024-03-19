export class SwitchParseErrorLogApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SwitchLogList?: SwitchLogListEntity[];
}

export class SwitchLogListEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: number;
    InsertDate?: number;
    ApplicationType?: string;
    TransactionType?: string;
    ApplicationId?: number;
    SessionId?: number;
    ServerName?: string;
    RemoteIpAddress?: string;
    RemotePort?: number;
    LocalIpAddress?: string;
    LocalPort?: number;
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

export class SwitchTimeoutLogApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    MessageParseDetail?: string;
    SwitchLogList?: SwitchTimeoutLogEntity[];
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

export class SwitchMessageLogApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    MessageParseDetail?: string;
    SwitchLogList?: SwitchMessageLogEntity[];
}

export class SwitchMessageLogEntity {
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
