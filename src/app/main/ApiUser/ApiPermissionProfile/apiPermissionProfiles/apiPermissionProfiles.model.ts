import { ApiPermissionProfileDetailListEntity } from "app/ui/apiPermissionProfile";

export class ApiPermissionProfile {
    Id: number;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    ProfileName: string;
    IsBuiltInDefinition: boolean;
    ApplicationType: string;
    ApplicationTypeId: number;
    ProfileId: number;
    ApplicationTypeName: string;
    PermissionCheckType: string;
    PermissionCheckTypeId: number;
    PermissionCheckTypeName: string;
    ApiDefinitionName: string;
    HasApiLimitProfile: boolean;
    ApiLimitProfileName: string;
    IsActive: boolean;
    ApiLimitProfileId: number;
    ApiDefinitionId: number;
    UserTypeId: number;
    UserType: string;
    ApiPermissionProfileDetailList: Array<ApiPermissionProfileDetailListEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param apiPermissionProfile
     */
    constructor(apiPermissionProfile?) {
        apiPermissionProfile = apiPermissionProfile || {};
        this.Id = apiPermissionProfile.Id;
        this.UserTypeId = apiPermissionProfile.UserTypeId;
        this.UserType = apiPermissionProfile.UserType;
        this.ProfileName = apiPermissionProfile.ProfileName;
        this.TenantId = apiPermissionProfile.TenantId;
        this.InsertDateTime = apiPermissionProfile.InsertDateTime;
        this.UpdateDateTime = apiPermissionProfile.UpdateDateTime;
        this.ApiDefinitionId = apiPermissionProfile.ApiDefinitionId;
        this.ApiLimitProfileId = apiPermissionProfile.ApiLimitProfileId;
        this.IsBuiltInDefinition = apiPermissionProfile.IsBuiltInDefinition;
        this.ApplicationType = apiPermissionProfile.ApplicationType;
        this.Description = apiPermissionProfile.Description;
        this.ApplicationTypeId = apiPermissionProfile.ApplicationTypeId;
        this.ProfileId = apiPermissionProfile.ProfileId;
        this.ApplicationTypeName = apiPermissionProfile.ApplicationTypeName;
        this.PermissionCheckType = apiPermissionProfile.PermissionCheckType;
        this.PermissionCheckTypeId = apiPermissionProfile.PermissionCheckTypeId;
        this.PermissionCheckTypeName =
            apiPermissionProfile.PermissionCheckTypeName;
        this.ApiDefinitionName = apiPermissionProfile.ApiDefinitionName;
        this.HasApiLimitProfile = apiPermissionProfile.HasApiLimitProfile;
        this.ApiLimitProfileName = apiPermissionProfile.ApiLimitProfileName;
        this.IsActive = apiPermissionProfile.IsActive;
        this.ApiPermissionProfileDetailList =
            apiPermissionProfile.ApiPermissionProfileDetailList;
        this.images = apiPermissionProfile.images || [];
    }
}
