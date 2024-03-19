export class TenantCardAuthorizationProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantCardAuthorizationProfile?: TenantCardAuthorizationProfileEntity[];
}

export class TenantCardAuthorizationProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    HasExternalAuthorization?: boolean;
    SendDailySettlementFile?: boolean;
    ExportDailySettlementFileToLocalFolder?: boolean;
    AuthorizationUrl?: string;
    EncryptedApiKey?: string;
    EncryptedSecretKey?: string;
    SftpServer?: string;
    SftpUserName?: string;
    SftpEncryptedPassword?: string;
    SftpPath?: string;
    SettlementFilePath?: string;
    SftpPort?: number;
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
