import { ParameterUserTypeEntity } from "app/ui/applicationDefinition";
import { RoleEntity } from "app/ui/roleDefinition";
import { ApiKeyEntity } from "app/ui/userDefinition";

export class User {
    Id: number;
    TenantName: string;
    UserTypeId: number;
    UserType: string;
    UserName: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    UserStatus: string;
    PermittedIpAddressList: string[];
    HasApiKey: boolean;
    WrongAttemptCount: number;
    UserProfile: string;
    UserStatusId: number;
    TenantId: number;
    CustomerTypeId: number;
    CustomerId: number;
    UtcTimeOffset: number;
    UserProfileId: number;
    MustChangePwd: boolean;
    PasswordResetDateTime: any;
    LoginMethodTypeId: number;
    ForceTwoFormFactorAuth: boolean;
    TwoFormFactorAuthTypeId: number;
    CheckIp: boolean;
    Description: string;
    UserFullName: string;
    SelectedUserStatus: string;
    InsertBeginDateTime: any;
    InsertEndDateTime: any;
    UpdateBeginDateTime: any;
    UpdateEndDateTime: any;
    ApiKeyList: Array<ApiKeyEntity>;
    ParameterUserList: Array<ParameterUserTypeEntity>;
    RoleList: Array<RoleEntity>;
    SelectedRoleList: number[];
    ApiUserId: number;
    IsActive: boolean;
    ApiKey: string;
    HasExpiryDate: boolean;
    StartDateTime: any;
    EndDateTime: any;
    ProfileCode: string;
    PhoneNumber: string;
    Email: string;
    InternationalPhoneCode: string;
    NewPassword: string;
    NewPassword2: string;
    UserId: number;
    HasIpRestriction: boolean;
    IpAddress: string;
    CompanyId: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user?) {
        user = user || {};
        this.Id = user.Id;
        this.ApiUserId = user.Id;
        this.IsActive = user.IsActive;
        this.ApiKey = user.ApiKey;
        this.CompanyId = user.CompanyId;
        this.HasIpRestriction = user.HasIpRestriction;
        this.IpAddress = user.IpAddress;
        this.HasExpiryDate = user.HasExpiryDate;
        this.PermittedIpAddressList = user.PermittedIpAddressList;
        this.LoginMethodTypeId = user.LoginMethodTypeId;
        this.ForceTwoFormFactorAuth = user.ForceTwoFormFactorAuth;
        this.TwoFormFactorAuthTypeId = user.TwoFormFactorAuthTypeId;
        this.StartDateTime = user.StartDateTime;
        this.EndDateTime = user.EndDateTime;
        this.InsertDateTime = user.InsertDateTime;
        this.UpdateDateTime = user.UpdateDateTime;
        this.TenantName = user.TenantName;
        this.UserName = user.UserName;
        this.TenantId = user.TenantId;
        this.CustomerId = user.CustomerId;
        this.UtcTimeOffset = user.UtcTimeOffset;
        this.CheckIp = user.CheckIp;
        this.Description = user.Description;
        this.UserTypeId = user.UserTypeId;
        this.UserType = user.UserType;
        this.UserStatus = user.UserStatus;
        this.HasApiKey = user.HasApiKey;
        this.WrongAttemptCount = user.WrongAttemptCount;
        this.UserProfile = user.UserProfile;
        this.UserStatusId = user.UserStatusId;
        this.CustomerTypeId = user.CustomerTypeId;
        this.UserProfileId = user.UserProfileId;
        this.MustChangePwd = user.MustChangePwd;
        this.PasswordResetDateTime = user.PasswordResetDateTime;
        this.UserFullName = user.UserFullName;
        this.SelectedUserStatus = user.SelectedUserStatus;
        this.InsertBeginDateTime = user.InsertBeginDateTime;
        this.InsertEndDateTime = user.InsertEndDateTime;
        this.UpdateBeginDateTime = user.UpdateBeginDateTime;
        this.UpdateEndDateTime = user.UpdateEndDateTime;
        this.ApiKeyList = user.ApiKeyList;
        this.ProfileCode = user.ProfileCode;
        this.Email = user.Email;
        this.PhoneNumber = user.PhoneNumber;
        this.InternationalPhoneCode = user.InternationalPhoneCode;
        this.ParameterUserList = user.ParameterUserList;
        this.NewPassword = user.NewPassword;
        this.NewPassword2 = user.NewPassword2;
        this.UserId = user.UserId;
        this.RoleList = user.RoleList;
        this.SelectedRoleList = user.SelectedRoleList;
        this.images = user.images || [];
    }
}
