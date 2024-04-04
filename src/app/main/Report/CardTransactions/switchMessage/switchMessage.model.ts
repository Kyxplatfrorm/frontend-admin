export class SwitchMessage {
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
    CustomerNumber: string;
    IdentityNumber: string;
    CellPhoneNumber: string;
    Email: string;
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
    ReferenceNumber: string;
    RoutedRemoteIpAddress: string;
    RoutedRemotePort: number;
    RoutedLocalIpAddress: string;
    RoutedLocalPort: number;
    SettlementAmount: number;
    SettlementCurrencyCode: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchMessage
     */
    constructor(switchMessage?) {
        switchMessage = switchMessage || {};
        this.Id = switchMessage.Id;
        this.CustomerNumber = switchMessage.CustomerNumber;
        this.IdentityNumber = switchMessage.IdentityNumber;
        this.CellPhoneNumber = switchMessage.CellPhoneNumber;
        this.Email = switchMessage.Email;
        this.ApplicationType = switchMessage.ApplicationType;
        this.ApplicationId = switchMessage.ApplicationId;
        this.SessionId = switchMessage.SessionId;
        this.ServerName = switchMessage.ServerName;
        this.RemoteIpAddress = switchMessage.RemoteIpAddress;
        this.RemotePort = switchMessage.RemotePort;
        this.LocalIpAddress = switchMessage.LocalIpAddress;
        this.LocalPort = switchMessage.LocalPort;
        this.SearchStartDate = switchMessage.SearchStartDate;
        this.SearchEndDate = switchMessage.SearchEndDate;
        this.SearchStartTime = switchMessage.SearchStartTime;
        this.SearchEndTime = switchMessage.SearchEndTime;
        this.CardTokenNumber = switchMessage.CardTokenNumber;
        this.MerchantCode = switchMessage.MerchantCode;
        this.TerminalId = switchMessage.TerminalId;
        this.Mti = switchMessage.Mti;
        this.Rrn = switchMessage.Rrn;
        this.AuthorizationCode = switchMessage.AuthorizationCode;
        this.InsertDate = switchMessage.InsertDate;
        this.TransactionType = switchMessage.TransactionType;
        this.ProcessingCode = switchMessage.ProcessingCode;
        this.TraceNumber = switchMessage.TraceNumber;
        this.TransactionAmount = switchMessage.TransactionAmount;
        this.TransactionCurrencyCode =
            switchMessage.TransactionCurrencyCode;
        this.AcquirerId = switchMessage.AcquirerId;
        this.ResponseCode = switchMessage.ResponseCode;
        this.TxnDescription = switchMessage.TxnDescription;
        this.HexMessage = switchMessage.HexMessage;
        this.MessageParseDetail = switchMessage.MessageParseDetail;
        this.ReferenceNumber = switchMessage.ReferenceNumber;
        this.RoutedRemoteIpAddress = switchMessage.RoutedRemoteIpAddress;
        this.RoutedRemotePort = switchMessage.RoutedRemotePort;
        this.RoutedLocalIpAddress = switchMessage.RoutedLocalIpAddress;
        this.RoutedLocalPort = switchMessage.RoutedLocalPort;
        this.SettlementAmount = switchMessage.SettlementAmount;
        this.SettlementCurrencyCode = switchMessage.SettlementCurrencyCode;
        this.images = switchMessage.images || [];
    }
}
