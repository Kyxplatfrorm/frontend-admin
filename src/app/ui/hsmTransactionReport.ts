export class HsmTransactionReportApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmTransactionList?: HsmTransactionReportEntity[];
}
export class HsmTransactionReportEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: number;
    CommandCode?: string;
    CommandName?: string;
    IsSucceeded?: boolean;
    ResponseCode?: string;
    ResponseDescription?: string;
    ServiceName?: string;
    ServerName?: string;
    EndPointAddress?: string;
    HsmIpAddress?: string;
    TotalElapsed?: number;
}
