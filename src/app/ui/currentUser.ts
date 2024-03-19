export class CurrentUserApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CurrentUser?: CurrentUserEntity[];
}
export class CurrentUserEntity {
    Id?: number;
    UserName?: string;
    UserFullName?: string;
    HasApiKey?: boolean;
    Email?: string;
    InternationalPhoneCode?: string;
    PhoneNumber?: string;
    TenantName?: string;
    ApiKeyList?: ApiKeyEntity[];
}
export class ApiKeyEntity {
    Id?: number;
    ApiUserId?: number;
    IsActive?: boolean;
    ApiKey?: string;
    HasExpiryDate?: boolean;
    StartDateTime?: any;
    EndDateTime?: any;
}
