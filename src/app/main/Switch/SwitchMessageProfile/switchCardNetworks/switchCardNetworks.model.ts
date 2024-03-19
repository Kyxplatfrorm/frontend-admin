export class SwitchMessageProfile {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    NetworkType: string;
    NetworkMessageType: string;
    NetworkMessageTypeId: number;
    NetworkMessageTypeName: string;
    RequestMti: number;
    ResponseMti: number;
    RequestMessageProfile: string;
    ResponseMessageProfile: string;
    ParameterKey: string;
    Description: string;
    NetworkTypeId: number;
    NetworkTypeName: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchMessageProfile
     */
    constructor(switchMessageProfile?) {
        switchMessageProfile = switchMessageProfile || {};
        this.Id = switchMessageProfile.Id;
        this.NetworkTypeId = switchMessageProfile.NetworkTypeId;
        this.NetworkTypeName = switchMessageProfile.NetworkTypeName;
        this.NetworkType = switchMessageProfile.NetworkType;
        this.NetworkMessageType = switchMessageProfile.NetworkMessageType;
        this.NetworkMessageTypeId = switchMessageProfile.NetworkMessageTypeId;
        this.NetworkMessageTypeName =
            switchMessageProfile.NetworkMessageTypeName;
        this.RequestMti = switchMessageProfile.RequestMti;
        this.ParameterKey = switchMessageProfile.ParameterKey;
        this.Description = switchMessageProfile.Description;
        this.ResponseMti = switchMessageProfile.ResponseMti;
        this.RequestMessageProfile = switchMessageProfile.RequestMessageProfile;
        this.ResponseMessageProfile =
            switchMessageProfile.ResponseMessageProfile;
        this.InsertDateTime = switchMessageProfile.InsertDateTime;
        this.UpdateDateTime = switchMessageProfile.UpdateDateTime;
        this.images = switchMessageProfile.images || [];
    }
}
