export class SwitchConnection {
    Id: number;
    ApplicationType: string;
    ApplicationTypeId: number;
    ClusterId: number;
    InstanceId: number;
    ServiceName: string;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchConnection
     */
    constructor(switchConnection?) {
        switchConnection = switchConnection || {};
        this.Id = switchConnection.Id;
        this.ApplicationType = switchConnection.ApplicationType;
        this.ApplicationTypeId = switchConnection.ApplicationTypeId;
        this.InsertDateTime = switchConnection.InsertDateTime;
        this.UpdateDateTime = switchConnection.UpdateDateTime;
        this.ServiceName = switchConnection.ServiceName;
        this.ClusterId = switchConnection.ClusterId;
        this.InstanceId = switchConnection.InstanceId;
        this.images = switchConnection.images || [];
    }
}
