export class ApplicationLogApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApplicationLogList?: ApplicationLogEntity[];
}

export class ApplicationLogEntity {
    Id?: number;
    IsRunning?: boolean;
    ApplicationId?: number;
    ServerName?: string;
    ApplicationType?: string;
    StartDateTime?: any;
    EndDateTime?: any;
    InsertDateTime?: any;
    UpdateUserId?: any;
    ServiceName?: string;
    LogList?: LogEntity[];
}
export class LogEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ServerName?: string;
    ApplicationId?: number;
    ProcessId?: number;
    ApplicationType?: string;
    ServiceName?: string;
    ProcessName?: string;
    StartDateTime?: any;
    EndDateTime?: any;
}
