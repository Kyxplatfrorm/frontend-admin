import { ApiKeyEntity } from "app/ui/userDefinition";

export class MyProfile {
    Id: number;
    UserName: string;
    UserFullName: string;
    HasApiKey: boolean;
    Email: string;
    InternationalPhoneCode: string;
    TenantName: string;
    PhoneNumber: string;
    ApiUserId: number;
    IsActive: boolean;
    ApiKey: string;
    HasExpiryDate: boolean;
    StartDateTime: any;
    EndDateTime: any;
    OldPassword: string;
    NewPassword: string;
    NewPassword2: string;
    UtcTimeOffset: string;
    ApiKeyList: ApiKeyEntity[];
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param myProfile
     */
    constructor(myProfile?) {
        myProfile = myProfile || {};
        this.Id = myProfile.Id;
        this.UserName = myProfile.UserName;
        this.TenantName = myProfile.TenantName;
        this.UserFullName = myProfile.UserFullName;
        this.HasApiKey = myProfile.HasApiKey;
        this.Email = myProfile.Email;
        this.InternationalPhoneCode = myProfile.InternationalPhoneCode;
        this.PhoneNumber = myProfile.PhoneNumber;
        this.ApiUserId = myProfile.Id;
        this.IsActive = myProfile.IsActive;
        this.ApiKey = myProfile.ApiKey;
        this.HasExpiryDate = myProfile.HasExpiryDate;
        this.StartDateTime = myProfile.StartDateTime;
        this.EndDateTime = myProfile.EndDateTime;
        this.OldPassword = myProfile.OldPassword;
        this.NewPassword = myProfile.NewPassword;
        this.NewPassword2 = myProfile.NewPassword2;
        this.UtcTimeOffset = myProfile.UtcTimeOffset;
        this.ApiKeyList = myProfile.ApiKeyList;
        this.images = myProfile.images || [];
    }
}
