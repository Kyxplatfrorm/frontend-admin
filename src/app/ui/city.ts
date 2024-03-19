export class CountyEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    CountryCode?: number;
    StateCode?: number;
    CityCode?: number;
    CountyName?: string;
}
export class CityApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
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
    CountyList?: CountyEntity[];
}

export class StateApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    StateList?: StateEntity[];
}
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
