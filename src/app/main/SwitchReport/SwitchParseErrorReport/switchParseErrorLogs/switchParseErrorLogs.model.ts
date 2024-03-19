export class SwitchParseError {
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
    TransactionType: string;
    HexMessage: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    ParameterKey: string;
    Description: string;
    InsertDate: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchParseError
     */
    constructor(switchParseError?) {
        switchParseError = switchParseError || {};
        this.Id = switchParseError.Id;
        this.ApplicationType = switchParseError.ApplicationType;
        this.ApplicationId = switchParseError.ApplicationId;
        this.SessionId = switchParseError.SessionId;
        this.ServerName = switchParseError.ServerName;
        this.RemoteIpAddress = switchParseError.RemoteIpAddress;
        this.RemotePort = switchParseError.RemotePort;
        this.LocalIpAddress = switchParseError.LocalIpAddress;
        this.LocalPort = switchParseError.LocalPort;
        this.SearchStartDate = switchParseError.SearchStartDate;
        this.SearchEndDate = switchParseError.SearchEndDate;
        this.SearchStartTime = switchParseError.SearchStartTime;
        this.SearchEndTime = switchParseError.SearchEndTime;
        this.TransactionType = switchParseError.TransactionType;
        this.HexMessage = switchParseError.HexMessage;
        this.InsertDateTime = switchParseError.InsertDateTime;
        this.UpdateDateTime = switchParseError.UpdateDateTime;
        this.ParameterKey = switchParseError.ParameterKey;
        this.Description = switchParseError.Description;
        this.InsertDate = switchParseError.InsertDate;
        this.images = switchParseError.images || [];
    }
}
