export class FraudActionReportApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    FraudActionList?: FraudActionEntity[];
}

export class FraudActionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    Description?: string;
    TenantId?: number;
    TenantName?: string;
    FraudRuleActionTypeId?: number;
    InsertDate?: number;
    ApplicationType?: string;
    ApplicationTypeName?: string;
    ApplicationTypeId?: number;
    FraudApiId?: number;
    FraudRuleId?: number;
    FraudRuleName?: string;
    FraudApiName?: string;
    SessionId?: number;
    UserId?: number;
    UserName?: string;
    CustomerId?: number;
    CompanyId?: number;
    CompanyPosId?: number;
    CardToken?: string;
    FraudRuleActionType?: string;
    FraudRuleActionTypeName?: string;
    FraudRuleActionStatus?: string;
    FraudRuleActionStatusName?: string;
    FraudRuleActionStatusId?: number;
    FraudRuleActionDateTime?: any;
    FraudRuleActionUser?: string;
    ClientIp?: string;
    TransactionAmount?: number;
    TransactionCode?: string;
    ReferenceNumber?: string;
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

export class FraudRuleActionStatuesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: FraudRuleActionStatuesEntity[];
}

export class FraudRuleActionStatuesEntity {
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
