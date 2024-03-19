import {
    ApplicationListEntity,
    ParameterApplicationTypeEntity,
    ParameterUserTypeEntity,
} from "app/ui/applicationDefinition";

export class ApplicationDefinition {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    ServiceName: string;
    ApplicationTypeId: number;
    UserTypeId: number;
    ServerAddress: any;
    ApplicationProfileId: number;
    ProfileName: string;
    ClusterId: number;
    InstanceId: number;
    ThreadCount: number;
    HasRestApi: boolean;
    RestApiPort: number;
    Description: string;
    ParameterUserList: Array<ParameterUserTypeEntity>;
    ParameterApplicationList: Array<ParameterApplicationTypeEntity>;
    ApplicationList: Array<ApplicationListEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param applicationdefinition
     */
    constructor(applicationdefinition?) {
        applicationdefinition = applicationdefinition || {};
        this.Id = applicationdefinition.Id;
        this.ServiceName = applicationdefinition.ServiceName;
        this.ApplicationTypeId = applicationdefinition.ApplicationTypeId;
        this.UserTypeId = applicationdefinition.UserTypeId;
        this.ServerAddress = applicationdefinition.ServerAddress;
        this.ApplicationProfileId = applicationdefinition.ApplicationProfileId;
        this.ClusterId = applicationdefinition.ClusterId;
        this.InstanceId = applicationdefinition.InstanceId;
        this.ThreadCount = applicationdefinition.ThreadCount;
        this.HasRestApi = applicationdefinition.HasRestApi;
        this.RestApiPort = applicationdefinition.RestApiPort;
        this.InsertDateTime = applicationdefinition.InsertDateTime;
        this.UpdateDateTime = applicationdefinition.UpdateDateTime;
        this.ApplicationList = applicationdefinition.ApplicationList;
        this.Description = applicationdefinition.Description;
        this.ParameterUserList = applicationdefinition.ParameterUserList;
        this.ParameterApplicationList =
            applicationdefinition.ParameterApplicationList;
        this.ProfileName = applicationdefinition.ProfileName;
        this.images = applicationdefinition.images || [];
    }
}
