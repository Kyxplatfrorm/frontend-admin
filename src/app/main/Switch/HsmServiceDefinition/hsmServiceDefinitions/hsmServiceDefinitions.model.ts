import { HsmConnectionListEntity } from "app/ui/hsmServiceDefinition";

export class HsmService {
    Id: number;
    ParameterKey: string;
    Description: string;
    ServiceName: string;
    UserTypeId: number;
    ServerAddress: string;
    ServerPort: number;
    ApplicationProfileId: number;
    ClusterId: number;
    InstanceId: number;
    ThreadCount: number;
    HasRestApi: boolean;
    RestApiPort: number;
    ConnectionTimeout: number;
    ConnectionCheckTimeSecond: number;
    ApplicationId: number;
    HsmDeviceId: number;
    HsmDeviceName: string;
    ConnectionCount: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    HsmConnectionList: Array<HsmConnectionListEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param hsmService
     */
    constructor(hsmService?) {
        hsmService = hsmService || {};
        this.Id = hsmService.Id;
        this.Description = hsmService.Description;
        this.ParameterKey = hsmService.ParameterKey;
        this.InsertDateTime = hsmService.InsertDateTime;
        this.UpdateDateTime = hsmService.UpdateDateTime;
        this.ServiceName = hsmService.ServiceName;
        this.HsmConnectionList = hsmService.HsmConnectionList;
        this.UserTypeId = hsmService.UserTypeId;
        this.ServerAddress = hsmService.ServerAddress;
        this.ServerPort = hsmService.ServerPort;
        this.ApplicationProfileId = hsmService.ApplicationProfileId;
        this.ClusterId = hsmService.ClusterId;
        this.InstanceId = hsmService.InstanceId;
        this.ThreadCount = hsmService.ThreadCount;
        this.HasRestApi = hsmService.HasRestApi;
        this.ConnectionTimeout = hsmService.ConnectionTimeout;
        this.ConnectionCheckTimeSecond = hsmService.ConnectionCheckTimeSecond;
        this.ApplicationId = hsmService.ApplicationId;
        this.HsmDeviceId = hsmService.HsmDeviceId;
        this.HsmDeviceName = hsmService.HsmDeviceName;
        this.ConnectionCount = hsmService.ConnectionCount;
        this.RestApiPort = hsmService.RestApiPort;
        this.images = hsmService.images || [];
    }
}
