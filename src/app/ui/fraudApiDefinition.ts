export class FraudApiDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    FraudApiDefinitionList?: FraudApiDefinitionEntity[];
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
