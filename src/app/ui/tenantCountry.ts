export class TenantCountryApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantCountryProfileList?: TenantCountryProfileEntity[];
}
export class TenantCountryProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    CountryId?: number;
    CountryName?: string;
    IsRegistrationEnabled?: boolean;
    IsAddressEnabled?: boolean;
    TenantName?: string;
    TenantId?: number;
}
