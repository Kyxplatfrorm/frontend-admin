export class CardMemoReportApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CardMemoReportList?: CardMemoReportEntity[];
}

export class CardMemoReportEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    MemoDate?: number;
    CustomerId?: number;
    ApplicationTypeId?: number;
    ApplicationType?: string;
    ApplicationTypeName?: string;
    MemoChannelType?: string;
    MemoChannelTypeName?: string;
    MemoChannelTypeId?: number;
    MemoKeyType?: string;
    MemoKeyTypeName?: string;
    MemoKeyTypeId?: number;
    MemoKey?: string;
    MemoType?: string;
    MemoTypeName?: string;
    MemoCode?: string;
    MemoCodeName?: string;
    OldValue?: string;
    NewValue?: string;
    Description?: string;
    InsertUserName?: string;
    MemoTypeId?: number;
    MemoCodeId?: number;
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
    Description?: string;
    ParameterKey?: string;
}

export class MemoChannelTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: MemoChannelTypeEntity[];
}

export class MemoChannelTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class MemoKeyTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: MemoKeyTypeEntity[];
}

export class MemoKeyTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class MemoTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: MemoTypeEntity[];
}

export class MemoTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class MemoCodeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: MemoCodeEntity[];
}

export class MemoCodeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
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

