export class SwitchConnectionsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApplicationList?: SwitchConnectionsEntity[];
}

export class SwitchConnectionsEntity {
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
    ApplicationTypeId?: number;
}

export class SwitchConnectionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ConnectionList?: ConnectionEntity[];
}

export class ConnectionEntity {
    Id?: number;
    ApplicationName?: string;
    SessionName?: string;
    ApplicationId?: number;
    SessionId?: number;
    ConnectionType?: string;
    IsConnected?: boolean;
    RemoteIpAddress?: string;
    RemotePort?: number;
    LocalIpAddress?: string;
    LocalPort?: number;
    ConnectionStartDateTime?: any;
    ConnectionEndDateTime?: any;
}

export class SwitchConnectionLogApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ConnectionList?: ConnectionLogEntity[];
}

export class ConnectionLogEntity {
    Id?: number;
    ApplicationName?: string;
    SessionName?: string;
    ApplicationId?: number;
    SessionId?: number;
    ConnectionType?: string;
    IsConnected?: boolean;
    RemoteIpAddress?: string;
    RemotePort?: number;
    LocalIpAddress?: string;
    LocalPort?: number;
    ConnectionStartDateTime?: any;
    ConnectionEndDateTime?: any;
}
