export class NotificationTemplateApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    NotificationTemplateList?: NotificationTemplateEntity[];
}

export class NotificationTemplateEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    IsDefaultTemplate?: boolean;
    IsCompanyTemplate?: boolean;
    CompanyId?: number;
    CompanyName?: string;
    TemplateCode?: string;
    TemplateType?: string;
    LanguageCodeId?: number;
    TemplateTypeId?: number;
    TemplateTypeName?: string;
    Content?: string;
    LanguageCode?: string;
    LanguageCodeName?: string;
    Subject?: string;
    IsEncrypted?: boolean;
    HasExpiryDateTime?: boolean;
    ExpirySecondCount?: number;
}

export class TemplateTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: TemplateTypeEntity[];
}

export class TemplateTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
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
