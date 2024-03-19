export class SwitchTimeout {
    Id: number;
    ApplicationType: string;
    ApplicationId: number;
    SessionId: number;
    ServerName: string;
    RemoteIpAddress: string;
    RemotePort: number;
    LocalIpAddress: string;
    LocalPort: number;
    SearchStartDate: any;
    SearchEndDate: any;
    SearchStartTime: any;
    SearchEndTime: any;
    CardTokenNumber: string;
    MerchantCode: string;
    TerminalId: string;
    Mti: number;
    Rrn: string;
    AuthorizationCode: string;
    InsertDate: number;
    TransactionType: string;
    ProcessingCode: string;
    TraceNumber: string;
    TransactionAmount: number;
    TransactionCurrencyCode: string;
    AcquirerId: string;
    ResponseCode: string;
    TxnDescription: string;
    HexMessage: string;
    MessageParseDetail: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchTimeout
     */
    constructor(switchTimeout?) {
        switchTimeout = switchTimeout || {};
        this.Id = switchTimeout.Id;
        this.ApplicationType = switchTimeout.ApplicationType;
        this.ApplicationId = switchTimeout.ApplicationId;
        this.SessionId = switchTimeout.SessionId;
        this.ServerName = switchTimeout.ServerName;
        this.RemoteIpAddress = switchTimeout.RemoteIpAddress;
        this.RemotePort = switchTimeout.RemotePort;
        this.LocalIpAddress = switchTimeout.LocalIpAddress;
        this.LocalPort = switchTimeout.LocalPort;
        this.SearchStartDate = switchTimeout.SearchStartDate;
        this.SearchEndDate = switchTimeout.SearchEndDate;
        this.SearchStartTime = switchTimeout.SearchStartTime;
        this.SearchEndTime = switchTimeout.SearchEndTime;
        this.CardTokenNumber = switchTimeout.CardTokenNumber;
        this.MerchantCode = switchTimeout.MerchantCode;
        this.TerminalId = switchTimeout.TerminalId;
        this.Mti = switchTimeout.Mti;
        this.Rrn = switchTimeout.Rrn;
        this.AuthorizationCode = switchTimeout.AuthorizationCode;
        this.InsertDate = switchTimeout.InsertDate;
        this.TransactionType = switchTimeout.TransactionType;
        this.ProcessingCode = switchTimeout.ProcessingCode;
        this.TraceNumber = switchTimeout.TraceNumber;
        this.TransactionAmount = switchTimeout.TransactionAmount;
        this.TransactionCurrencyCode = switchTimeout.TransactionCurrencyCode;
        this.AcquirerId = switchTimeout.AcquirerId;
        this.ResponseCode = switchTimeout.ResponseCode;
        this.TxnDescription = switchTimeout.TxnDescription;
        this.HexMessage = switchTimeout.HexMessage;
        this.MessageParseDetail = switchTimeout.MessageParseDetail;
        this.images = switchTimeout.images || [];
    }
}
