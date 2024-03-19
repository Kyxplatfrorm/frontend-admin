export class ApiUser {
    Id: number;
    TenantName: string;
    ApiKey: string;
    Email: string;
    UserName: string;
    UserFullName: string;
    UserTypeId: number;
    TenantId: number;
    SelectedUserStatus: string;
    InsertBeginDateTime: any;
    InsertEndDateTime: any;
    UpdateBeginDateTime: any;
    UpdateEndDateTime: any;
    WrongAttemptCount: number;
    UserProfile: string;
    IpAddress: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    UserStatus: string;
    CompanyPosId: number;
    CompanyId: number;
    UtcTimeOffset: number;
    CustomerId: number;
    CustomerTypeName: string;
    CustomerTypeId: number;
    CustomerType: string;
    UserStatusName: string;
    UserStatusId: number;
    UserType: string;
    HasApiPermissionProfile: boolean;
    ApiPermissionProfileId: number;
    SecretKey: string;
    HasExpiryDate: boolean;
    StartDateTime: any;
    EndDateTime: any;
    HasIpRestriction: boolean;
    CompanyName: string;
    TradeName: string;
    PhoneNumber: string;
    Description: string;
    CustomerName: string;
    CustomerEmail: string;
    PermittedIpAddressList: string[];
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param apiUser
     */
    constructor(apiUser?) {
        apiUser = apiUser || {};
        this.Id = apiUser.Id;
        this.TenantName = apiUser.TenantName;
        this.UserTypeId = apiUser.UserTypeId;
        this.TenantId = apiUser.TenantId;
        this.CompanyName = apiUser.CompanyName;
        this.TradeName = apiUser.TradeName;
        this.PhoneNumber = apiUser.PhoneNumber;
        this.Description = apiUser.Description;
        this.CustomerName = apiUser.CustomerName;
        this.CustomerEmail = apiUser.CustomerEmail;
        this.ApiKey = apiUser.ApiKey;
        this.Email = apiUser.Email;
        this.UserName = apiUser.UserName;
        this.UserFullName = apiUser.UserFullName;
        this.SelectedUserStatus = apiUser.SelectedUserStatus;
        this.InsertBeginDateTime = apiUser.InsertBeginDateTime;
        this.InsertEndDateTime = apiUser.InsertEndDateTime;
        this.UpdateBeginDateTime = apiUser.UpdateBeginDateTime;
        this.UpdateEndDateTime = apiUser.UpdateEndDateTime;
        this.WrongAttemptCount = apiUser.WrongAttemptCount;
        this.UserProfile = apiUser.UserProfile;
        this.IpAddress = apiUser.IpAddress;
        this.UserStatusId = apiUser.UserStatusId;
        this.CustomerTypeId = apiUser.CustomerTypeId;
        this.StartDateTime = apiUser.StartDateTime;
        this.EndDateTime = apiUser.EndDateTime;
        this.InsertDateTime = apiUser.InsertDateTime;
        this.UpdateDateTime = apiUser.UpdateDateTime;
        this.UserStatus = apiUser.UserStatus;
        this.CustomerType = apiUser.CustomerType;
        this.CompanyPosId = apiUser.CompanyPosId;
        this.CompanyId = apiUser.CompanyId;
        this.UtcTimeOffset = apiUser.UtcTimeOffset;
        this.CustomerId = apiUser.CustomerId;
        this.PermittedIpAddressList = apiUser.PermittedIpAddressList;
        this.HasIpRestriction = apiUser.HasIpRestriction;
        this.CustomerTypeName = apiUser.CustomerTypeName;
        this.UserStatusName = apiUser.UserStatusName;
        this.ApiPermissionProfileId = apiUser.ApiPermissionProfileId;
        this.UserType = apiUser.UserType;
        this.HasApiPermissionProfile = apiUser.HasApiPermissionProfile;
        this.SecretKey = apiUser.SecretKey;
        this.HasExpiryDate = apiUser.HasExpiryDate;
        this.images = apiUser.images || [];
    }
}
