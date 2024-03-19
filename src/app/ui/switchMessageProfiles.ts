export class SwitchCardNetworkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SwitchCardNetworkList?: SwitchCardNetworkEntity[];
}

export class SwitchCardNetworkEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    NetworkType?: string;
    Description?: string;
}

export class SwitchMessageProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SwitchMessageProfileList?: SwitchMessageProfileEntity[];
}
export class SwitchMessageProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    NetworkType?: string;
    NetworkTypeId?: number;
    NetworkTypeName?: string;
    NetworkMessageType?: string;
    NetworkMessageTypeId?: number;
    NetworkMessageTypeName?: string;
    RequestMti?: number;
    ResponseMti?: number;
    RequestMessageProfile?: string;
    ResponseMessageProfile?: string;
}

export class SwitchNetworkMessageTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchNetworkMessageTypeEntity[];
}
export class SwitchNetworkMessageTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
