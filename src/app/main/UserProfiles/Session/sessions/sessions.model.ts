import { SessionEntity } from "app/ui/session";

export class Session {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    UserId: number;
    ChannelCode: number;
    UserType: string;
    UserName: string;
    UserFullName: string;
    SessionStatus: string;
    Server: string;
    ClientIp: string;
    ForwarderApi: string;
    HasSessionTimeOut: boolean;
    SessionActiveTimeMinutes: number;
    TenantId: number;
    CustomerType: string;
    CustomerId: number;
    UtcTimeOffset: number;
    CheckIp: boolean;
    SessionList: Array<SessionEntity>;
    UserTypeId: number;
    ShowActiveSessions: boolean;
    SelectedSessionStatus: string;
    SearchStartDate: any;
    SearchEndDate: any;
    TenantName: string;
    SearchStartTime: string;
    SearchEndTime: string;
    SessionId: number;
    SessionStatusId: number;
    Description: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param session
     */
    constructor(session?) {
        session = session || {};
        this.Id = session.Id;
        this.InsertDateTime = session.InsertDateTime;
        this.UpdateDateTime = session.UpdateDateTime;
        this.UserId = session.UserId;
        this.ChannelCode = session.ChannelCode;
        this.UserType = session.UserType;
        this.UserFullName = session.UserFullName;
        this.UserName = session.UserName;
        this.SessionStatus = session.SessionStatus;
        this.Server = session.Server;
        this.ClientIp = session.ClientIp;
        this.ForwarderApi = session.ForwarderApi;
        this.HasSessionTimeOut = session.HasSessionTimeOut;
        this.SessionActiveTimeMinutes = session.SessionActiveTimeMinutes;
        this.TenantId = session.TenantId;
        this.CustomerType = session.CustomerType;
        this.CustomerId = session.CustomerId;
        this.UtcTimeOffset = session.UtcTimeOffset;
        this.ClientIp = session.ClientIp;
        this.CheckIp = session.CheckIp;
        this.SessionList = session.SessionList;
        this.ShowActiveSessions = session.ShowActiveSessions;
        this.SearchStartDate = session.SearchStartDate;
        this.SearchEndDate = session.SearchEndDate;
        this.SearchStartTime = session.SearchStartTime;
        this.SearchEndTime = session.SearchEndTime;
        this.SelectedSessionStatus = session.SelectedSessionStatus;
        this.SessionId = session.Id;
        this.SessionStatusId = session.SessionStatusId;
        this.TenantName = session.TenantName;
        this.Description = session.Description;
        this.images = session.images || [];
    }
}
