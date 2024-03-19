export class UrlDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApplicationUrlDefinitionList?: ApplicationUrlDefinitionEntity[];
}

export class ApplicationUrlDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    IsDefaultDefinition?: boolean;
    ApplicationType?: string;
    ApplicationTypeName?: string;
    Description?: string;
    ApplicationTypeId?: number;
    Url?: string;
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

export class ApplicationTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ApplicationTypeEntity[];
}

export class ApplicationTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
