export class FraudRuleDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    FraudRuleDefinitionList?: FraudRuleDefinitionEntity[];
}

export class FraudRuleDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    Description?: string;
    TenantId?: number;
    FraudGroupId?: number;
    FraudRuleActionTypeId?: number;
    FraudRuleCheckTimeTypeId?: number;
    FraudRuleCheckTime?: number;
    FraudRuleCheckCount?: number;
    FraudRuleCheckAmount?: number;
    TenantName?: string;
    FraudGroupName?: string;
    FraudQuery?: string;
    FraudRuleActionType?: string;
    FraudRuleActionTypeName?: string;
    FraudRuleCheckTimeType?: string;
    FraudRuleCheckTimeTypeName?: string;
    IsBuiltInDefinition?: boolean;
    IsActive?: boolean;
    HasFraudQuery?: boolean;
    LogFraudRule?: boolean;
    EndDateTime?: any;
    StartDateTime?: any;
    ErrorCode?: string;
    ErrorDescription?: string;
    NotificationType?: string;
    NotificationTypeName?: string;
    NotificationTemplateCode?: string;
    NotificationTypeId?: number;
    SendNotification?: boolean;
    FraudRuleApiRelation?: FraudRuleApiRelationEntity[];
}

export class FraudRuleApiRelationEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    Description?: string;
    FraudApiId?: number;
    FraudRuleId?: number;
    FraudApiName?: string;
    FraudRuleName?: string;
    Priority?: number;
    IsActive?: boolean;
}

export class FraudRuleCheckTimeTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: FraudRuleCheckTimeTypeEntity[];
}

export class FraudRuleCheckTimeTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class FraudRuleActionTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: FraudRuleActionTypeEntity[];
}

export class FraudRuleActionTypeEntity {
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

export class FraudGroupDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    FraudGroupDefinitionList?: FraudGroupDefinitionEntity[];
}

export class FraudGroupDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    TenantName?: string;
    IsBuiltInDefinition?: boolean;
    Description?: string;
}

export class FraudApiDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    FraudApiList?: FraudApiDefinitionEntity[];
}

export class FraudApiDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ActionName?: string;
    HasFraudRule?: boolean;
    LogApiCallCounts?: boolean;
    ApplicationType?: string;
    ApplicationTypeName?: string;
    Description?: string;
    ApplicationTypeId?: number;
    ControllerName?: string;
}
