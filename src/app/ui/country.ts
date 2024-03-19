export class StateEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    CountryCode?: number;
    StateCode?: number;
    StateAlphaCode?: string;
    StateName?: string;
}
export class CountryApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CountryList?: CountryEntity[];
}
export class CountryEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    CountryCode?: number;
    CountryName?: string;
    DefaultCurrencyCode?: string;
    CountryIsoCode2?: string;
    CountryIsoCode3?: string;
    CountryPhoneCode?: number;
    ExternalCountryCode?: number;
    MaxPhoneLength?: number;
    MinPhoneLength?: number;
    PhoneMask?: string;
    IconUrl?: string;
    IsGlobalRegistrationEnabled?: boolean;
    IsLocalRegistrationEnabled?: boolean;
    HasState?: boolean;
    StateList?: StateEntity[];
    CityList?: CityEntity[];
}
export class CityEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    CountryCode?: number;
    StateCode?: number;
    HasState?: boolean;
    CityCode?: number;
    CityName?: string;
}
