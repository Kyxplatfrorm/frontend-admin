export class NotificationReportApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    NotificationReportList?: NotificationReportEntity[];
}

export class NotificationReportEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    CustomerId?: number;
    CustomerName?: string;
    CompanyId?: number;
    SessionId?: number;
    NotificationTypeId?: number;
    TemplateId?: number;
    LanguageCodeId?: number;
    SentStatusId?: number;
    MaxRetryCount?: number;
    AttemptCount?: number;
    Priority?: number;
    NotificationType?: string;
    NotificationTypeName?: string;
    TemplateName?: string;
    LanguageCode?: string;
    LanguageCodeName?: string;
    ReceiverAddress?: string;
    Subject?: string;
    SentStatus?: string;
    SentStatusName?: string;
    IsEncrypted?: boolean;
    HasExpiryDateTime?: boolean;
    ExpiryDateTime?: any;
}

export class NotificationTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: NotificationTypeEntity[];
}

export class NotificationTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class LanguageCodeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: LanguageCodeEntity[];
}

export class LanguageCodeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class SentStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SentStatusEntity[];
}

export class SentStatusEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class NotificationTemplateApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: NotificationTemplateEntity[];
}

export class NotificationTemplateEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class CustomerApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CustomerEntity[];
}

export class CustomerEntity {
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
