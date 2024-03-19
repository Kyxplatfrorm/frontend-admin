export class SwitchApplicationApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApplicationList?: SwitchApplicationEntity[];
}

export class SwitchApplicationEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ServiceName?: string;
    Description?: string;
    ApplicationType?: string;
    ClusterId?: number;
    InstanceId?: number;
    HsmConnectionList?: HsmConnectionEnttity[];
    SessionList?: SessionListEntity[];
    RoutingList?: RoutingListEntity[];
    SessionConfigList?: SessionConfigListEntity[];
    SessionConnectionList?: SessionConnectionListEntity[];
}
export class HsmConnectionEnttity {
    Id?: number;
    ApplicationId?: number;
    HsmServiceId?: number;
    HsmServiceName?: string;
    ConnectionCount?: number;
    ConnectionTimeout?: number;
    ConnectionCheckTimeSecond?: number;
    InsertDateTime?: any;
    UpdateDateTime?: any;
}
export class SessionListEntity {
    Id?: number;
    ApplicationId?: number;
    Description?: string;
    Priority?: number;
    ConnectionType?: string;
    EndPointType?: string;
    KeyProfileId?: number;
    ConnectionTypeId?: number;
    EndPointTypeId?: number;
    PinBlockFormat?: string;
    ConnectionTimeout?: number;
    ConnectionCheckTimeSecond?: number;
}
export class RoutingListEntity {
    Id?: number;
    ApplicationId?: number;
    HasRoutingRule?: boolean;
    Priority?: number;
    RoutingRuleName?: string;
    FromSession?: string;
    ToSession?: string;
    IsActive?: boolean;
    FromSessionId?: number;
    ToSessionId?: number;
}
export class SessionConfigListEntity {
    Id?: number;
    ApplicationId?: number;
    SessionId?: number;
    SessionName?: string;
    ConfigKey?: string;
    ConfigValue?: string;
}
export class SessionConnectionListEntity {
    Id?: number;
    ApplicationId?: number;
    SessionId?: number;
    SessionName?: string;
    Priority?: number;
    Server?: string;
    Port?: number;
    PermittedIpAddress?: string;
}

export class SwitchConnectionTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchConnectionTypeEntity[];
}
export class SwitchConnectionTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class SwitchEndPointTypesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchEndPointTypesEntity[];
}
export class SwitchEndPointTypesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
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

export class SwitchApplicationTypesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchApplicationTypesEntity[];
}
export class SwitchApplicationTypesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class HsmServicesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: HsmServicesEntity[];
}
export class HsmServicesEntity {
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

export class SwitchKeyProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchKeyProfilesEntity[];
}
export class SwitchKeyProfilesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class AllApplicationSessionsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: AllApplicationSessionsEntity[];
}
export class AllApplicationSessionsEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class ApplicationSessionsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ApplicationSessionsEntity[];
}
export class ApplicationSessionsEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
