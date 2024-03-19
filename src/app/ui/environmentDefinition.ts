export class EnvironmentDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    EnvironmentDefinition?: EnvironmentDefinitionEntity[];
}

export class EnvironmentDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    EnvironmentType?: string;
    EnvironmentTypeName?: string;
    EnvironmentTypeId?: number;
    IsProduction?: boolean;
    Description?: string;
}

export class EnvironmentTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: EnvironmentTypeEntity[];
}

export class EnvironmentTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
