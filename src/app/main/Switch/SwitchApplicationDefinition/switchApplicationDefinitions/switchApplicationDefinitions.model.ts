import {
    HsmConnectionEnttity,
    RoutingListEntity,
    SessionConfigListEntity,
    SessionConnectionListEntity,
    SessionListEntity,
} from "app/ui/switchApplicationDefinition";

export class SwitchApplication {
    Id: number;
    ApplicationType: string;
    ClusterId: number;
    InstanceId: number;
    ServiceName: string;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    ParameterKey: string;
    UserTypeId: number;
    ServerAddress: string;
    ApplicationProfileId: number;
    ThreadCount: number;
    HasRestApi: boolean;
    RestApiPort: number;
    ApplicationId: number;
    HsmServiceId: number;
    HsmServiceName: string;
    ConnectionCount: number;
    ConnectionTimeout: number;
    ConnectionCheckTimeSecond: number;
    Priority: number;
    ConnectionType: string;
    EndPointType: string;
    HasRoutingRule: boolean;
    RoutingRuleName: string;
    FromSession: string;
    ToSession: string;
    IsActive: boolean;
    FromSessionId: number;
    ToSessionId: number;
    HsmConnectionList: Array<HsmConnectionEnttity>;
    SessionList: Array<SessionListEntity>;
    RoutingList: Array<RoutingListEntity>;
    SessionConfigList: Array<SessionConfigListEntity>;
    SessionConnectionList: Array<SessionConnectionListEntity>;
    ApplicationTypeId: number;
    SessionId: number;
    SessionName: string;
    ConfigKey: string;
    ConfigValue: string;
    KeyProfileId: number;
    ConnectionTypeId: number;
    EndPointTypeId: number;
    PinBlockFormat: string;
    RoutingLuaRule: string;
    HsmServiceApplicationId: number;
    Server: string;
    Port: number;
    PermittedIpAddress: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchApplication
     */
    constructor(switchApplication?) {
        switchApplication = switchApplication || {};
        this.Id = switchApplication.Id;
        this.ApplicationType = switchApplication.ApplicationType;
        this.ClusterId = switchApplication.ClusterId;
        this.InstanceId = switchApplication.InstanceId;
        this.ServiceName = switchApplication.ServiceName;
        this.Description = switchApplication.Description;
        this.InsertDateTime = switchApplication.InsertDateTime;
        this.UpdateDateTime = switchApplication.UpdateDateTime;
        this.ParameterKey = switchApplication.ParameterKey;
        this.UserTypeId = switchApplication.UserTypeId;
        this.ServerAddress = switchApplication.ServerAddress;
        this.ApplicationProfileId = switchApplication.ApplicationProfileId;
        this.ThreadCount = switchApplication.ThreadCount;
        this.HasRestApi = switchApplication.HasRestApi;
        this.RestApiPort = switchApplication.RestApiPort;
        this.ApplicationId = switchApplication.ApplicationId;
        this.HsmServiceId = switchApplication.HsmServiceId;
        this.HsmServiceName = switchApplication.HsmServiceName;
        this.ConnectionCount = switchApplication.ConnectionCount;
        this.ConnectionTimeout = switchApplication.ConnectionTimeout;
        this.ConnectionCheckTimeSecond =
            switchApplication.ConnectionCheckTimeSecond;
        this.Priority = switchApplication.Priority;
        this.ConnectionType = switchApplication.ConnectionType;
        this.EndPointType = switchApplication.EndPointType;
        this.HasRoutingRule = switchApplication.HasRoutingRule;
        this.RoutingRuleName = switchApplication.RoutingRuleName;
        this.FromSession = switchApplication.FromSession;
        this.ToSession = switchApplication.ToSession;
        this.IsActive = switchApplication.IsActive;
        this.FromSessionId = switchApplication.FromSessionId;
        this.ToSessionId = switchApplication.ToSessionId;
        this.HsmConnectionList = switchApplication.HsmConnectionList;
        this.SessionList = switchApplication.SessionList;
        this.RoutingList = switchApplication.RoutingList;
        this.ApplicationTypeId = switchApplication.ApplicationTypeId;
        this.SessionId = switchApplication.SessionId;
        this.SessionName = switchApplication.SessionName;
        this.ConfigKey = switchApplication.ConfigKey;
        this.ConfigValue = switchApplication.ConfigValue;
        this.KeyProfileId = switchApplication.KeyProfileId;
        this.ConnectionTypeId = switchApplication.ConnectionTypeId;
        this.EndPointTypeId = switchApplication.EndPointTypeId;
        this.PinBlockFormat = switchApplication.PinBlockFormat;
        this.RoutingLuaRule = switchApplication.RoutingLuaRule;
        this.HsmServiceApplicationId =
            switchApplication.HsmServiceApplicationId;
        this.SessionConfigList = switchApplication.SessionConfigList;
        this.SessionConnectionList = switchApplication.SessionConnectionList;
        this.Server = switchApplication.Server;
        this.Port = switchApplication.Port;
        this.PermittedIpAddress = switchApplication.PermittedIpAddress;
        this.images = switchApplication.images || [];
    }
}
