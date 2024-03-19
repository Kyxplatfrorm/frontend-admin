import { RestApiLogEntity } from "app/ui/restApiLog";

export class HsmTransaction {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    CommandCode: string;
    CommandName: string;
    IsSucceeded: boolean;
    ResponseCode: string;
    ResponseDescription: string;
    ServerType: string;
    ServiceName: string;
    ServerName: string;
    RawRequest: string;
    RawResponse: string;
    EndPointAddress: string;
    HsmIpAddress: string;
    HsmPort: number;
    TotalElapsed: number;
    ShowFailedTransactions: boolean;
    SearchStartDate: any;
    SearchEndDate: any;
    SearchStartTime: any;
    SearchEndTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param hsmTransaction
     */
    constructor(hsmTransaction?) {
        hsmTransaction = hsmTransaction || {};
        this.Id = hsmTransaction.Id;
        this.InsertDateTime = hsmTransaction.InsertDateTime;
        this.UpdateDateTime = hsmTransaction.UpdateDateTime;
        this.CommandCode = hsmTransaction.CommandCode;
        this.CommandName = hsmTransaction.CommandName;
        this.IsSucceeded = hsmTransaction.IsSucceeded;
        this.ResponseCode = hsmTransaction.ResponseCode;
        this.ResponseDescription = hsmTransaction.ResponseDescription;
        this.ServerType = hsmTransaction.ServerType;
        this.ServiceName = hsmTransaction.ServiceName;
        this.ServerName = hsmTransaction.ServerName;
        this.ServerType = hsmTransaction.ServerType;
        this.ServiceName = hsmTransaction.ServiceName;
        this.ServerName = hsmTransaction.ServerName;
        this.RawRequest = hsmTransaction.RawRequest;
        this.RawResponse = hsmTransaction.RawResponse;
        this.EndPointAddress = hsmTransaction.EndPointAddress;
        this.HsmIpAddress = hsmTransaction.HsmIpAddress;
        this.HsmPort = hsmTransaction.HsmPort;
        this.TotalElapsed = hsmTransaction.TotalElapsed;
        this.ShowFailedTransactions = hsmTransaction.ShowFailedTransactions;
        this.SearchStartDate = hsmTransaction.SearchStartDate;
        this.SearchEndDate = hsmTransaction.SearchEndDate;
        this.SearchStartTime = hsmTransaction.SearchStartTime;
        this.SearchEndTime = hsmTransaction.SearchEndTime;
        this.images = hsmTransaction.images || [];
    }
}
