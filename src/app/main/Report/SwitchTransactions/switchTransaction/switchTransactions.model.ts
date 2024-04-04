export class SwitchTransaction {
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
     * @param switchTransaction
     */
    constructor(switchTransaction?) {
        switchTransaction = switchTransaction || {};
        this.Id = switchTransaction.Id;
        this.CustomerNumber = switchTransaction.CustomerNumber;
        this.IdentityNumber = switchTransaction.IdentityNumber;
        this.CellPhoneNumber = switchTransaction.CellPhoneNumber;
        this.Email = switchTransaction.Email;
        this.ApplicationType = switchTransaction.ApplicationType;
        this.ApplicationId = switchTransaction.ApplicationId;
        this.SessionId = switchTransaction.SessionId;
        this.ServerName = switchTransaction.ServerName;
        this.RemoteIpAddress = switchTransaction.RemoteIpAddress;
        this.RemotePort = switchTransaction.RemotePort;
        this.LocalIpAddress = switchTransaction.LocalIpAddress;
        this.LocalPort = switchTransaction.LocalPort;
        this.SearchStartDate = switchTransaction.SearchStartDate;
        this.SearchEndDate = switchTransaction.SearchEndDate;
        this.SearchStartTime = switchTransaction.SearchStartTime;
        this.SearchEndTime = switchTransaction.SearchEndTime;
        this.CardTokenNumber = switchTransaction.CardTokenNumber;
        this.MerchantCode = switchTransaction.MerchantCode;
        this.TerminalId = switchTransaction.TerminalId;
        this.Mti = switchTransaction.Mti;
        this.Rrn = switchTransaction.Rrn;
        this.AuthorizationCode = switchTransaction.AuthorizationCode;
        this.InsertDate = switchTransaction.InsertDate;
        this.TransactionType = switchTransaction.TransactionType;
        this.ProcessingCode = switchTransaction.ProcessingCode;
        this.TraceNumber = switchTransaction.TraceNumber;
        this.TransactionAmount = switchTransaction.TransactionAmount;
        this.TransactionCurrencyCode =
            switchTransaction.TransactionCurrencyCode;
        this.AcquirerId = switchTransaction.AcquirerId;
        this.ResponseCode = switchTransaction.ResponseCode;
        this.TxnDescription = switchTransaction.TxnDescription;
        this.HexMessage = switchTransaction.HexMessage;
        this.MessageParseDetail = switchTransaction.MessageParseDetail;
        this.ReferenceNumber = switchTransaction.ReferenceNumber;
        this.RoutedRemoteIpAddress = switchTransaction.RoutedRemoteIpAddress;
        this.RoutedRemotePort = switchTransaction.RoutedRemotePort;
        this.RoutedLocalIpAddress = switchTransaction.RoutedLocalIpAddress;
        this.RoutedLocalPort = switchTransaction.RoutedLocalPort;
        this.SettlementAmount = switchTransaction.SettlementAmount;
        this.SettlementCurrencyCode = switchTransaction.SettlementCurrencyCode;
        this.images = switchTransaction.images || [];
    }
}
