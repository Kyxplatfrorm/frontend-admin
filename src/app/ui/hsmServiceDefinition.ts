export class HsmServiceDefinitionApiResponse {
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
    ServiceName?: string;
    UpdateDateTime?: any;
    InsertUserId?: number;
    UpdateUserId?: number;
    Description?: string;
    HsmConnectionList?: HsmConnectionListEntity[];
}
export class HsmConnectionListEntity {
    Id?: number;
    ApplicationId?: number;
    HsmDeviceId?: number;
    HsmDeviceName?: string;
    ConnectionCount?: number;
    ConnectionTimeout?: number;
    ConnectionCheckTimeSecond?: number;
    InsertDateTime?: any;
    UpdateDateTime?: any;
}

export class UserTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: UserTypeEntity[];
}

export class UserTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class ApplicationProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ApplicationProfilesEntity[];
}

export class ApplicationProfilesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class DevicesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: DevicesEntity[];
}

export class DevicesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
