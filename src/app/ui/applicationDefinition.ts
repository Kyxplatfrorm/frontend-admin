export class ApplicationDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApplicationList?: ApplicationListEntity[];
}

export class ApplicationListEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ServiceName?: string;
    Description?: string;
}
export class ApplicationTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ParameterApplicationTypeEntity[];
}

export class ParameterApplicationTypeEntity {
    Id?: number;
    Description?: string;
}

export class UserTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ParameterUserTypeEntity[];
}

export class ParameterUserTypeEntity {
    Id?: number;
    Description?: string;
}
